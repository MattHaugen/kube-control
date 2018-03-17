import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';
import * as promisify from 'util.promisify';
import * as TableParser from 'table-parser';
import { KubeContext } from '../data-structures/kube-context';

let exec;
let spawn;

@Injectable()
export class KubectlService {

   childProcess: typeof childProcess;

   currentContext = '';

   constructor() {
     // Conditional imports
     if (this.isElectron()) {
       this.childProcess = window.require('child_process');
       exec = promisify(this.childProcess.exec);
       spawn = this.childProcess.spawn;
     }
   }

   isElectron = () => {
     return window && window.process && window.process.type;
   }

   getVersion(): Promise<string> {
     return exec('kubectl version --short=true --client=true')
     .then(function (result) {
        return result.trim();
     })
     .catch(function (err) {
        return Promise.reject(err);
     });
   }

   getRawConfig(): Promise<string> {
     return exec('kubectl config view')
     .then(function (result) {
        return result.trim();
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }

   getCurrentContext(): Promise<string> {
      return exec('kubectl config current-context')
      .then(function (result) {
         return result.trim();
      })
      .catch(function (err) {
         console.error('ERROR: ', err);
      });
   }

   setCurrentContext(contextName: string): Promise<string> {
      if (this.currentContext === contextName) {
         return Promise.resolve(contextName);
      }

      this.currentContext = contextName;
      return exec('kubectl config use-context ' + contextName)
      .then(function (result) {
         return result.trim();
      })
      .catch(function (err) {
         console.error('ERROR: ', err);
      });
   }

   cleanseTerminalOutput(terminalOutput: object[]): object[] {
     return terminalOutput.map(row => {
       const cleansedObject = {};
       for (const key in row) {
          if (row.hasOwnProperty(key)) {
             cleansedObject[key] = row[key][0];
          }
       }
       return cleansedObject;
     });
   }

   getResource(resourceLabel: string): Promise<Array<object>> {
     const classScope = this;
     return exec('kubectl get ' + resourceLabel)
     .then(function (result) {
        const stdout = TableParser.parse(result);
        return classScope.cleanseTerminalOutput(stdout);
     })
     .catch(function (err) {
        return Promise.reject(err);
     });
   }

   getContexts(specificContext?: string): Promise<Array<object>> {
      const baseCommand = 'kubectl config get-contexts';
      const command = specificContext ? baseCommand.concat(' ' + specificContext) : baseCommand;
      return exec(command)
      .then(function (result) {
         const data = TableParser.parse(result);
         return data.map(contextDetails => {
            const parsedData = {};
            Object.keys(contextDetails).forEach((key) => {
               parsedData[key.toLowerCase()] = contextDetails[key][0];
            });
            return parsedData;
         });
      })
      .catch(function (err) {
         console.error('ERROR: ', err);
      });
   }

   getLogs(resource: string): Promise<string> {
     return new Promise((resolve) => {
       const spawnProcess = spawn('kubectl', ['logs', `${resource}`, '--tail=100']);
       let result = '';
       spawnProcess.stdout.on('data', (data) => {
         result += data.toString();
       });
       spawnProcess.on('close', function(code) {
         resolve(result);
       });
     });
   }

   getDescribe(resource: string): Promise<string> {
     const command = `kubectl describe ${resource}`;
     return exec(command)
     .then(function (result) {
        return result;
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }
}
