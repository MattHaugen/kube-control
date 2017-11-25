import { Injectable } from '@angular/core';
import { exec } from 'child-process-promise';
import * as terminalTableParser from 'terminal-table-parser';
import * as TableParser from 'table-parser';
import { KubeContext } from '../data-structures/kube-context';

@Injectable()
export class KubectlService {
   currentContext = '';

   getVersion(): Promise<string> {
     return exec('kubectl version --short=true --client=true')
     .then(function (result) {
        return result.stdout.trim();
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }

   getRawConfig(): Promise<string> {
     return exec('kubectl config view')
     .then(function (result) {
        return result.stdout.trim();
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }

   getCurrentContext(): Promise<string> {
      return exec('kubectl config current-context')
      .then(function (result) {
         return result.stdout.trim();
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
         return result.stdout.trim();
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

   getResource(contextName: string, resourceLabel: string): Promise<Array<object>> {
      const classScope = this;
      return this.setCurrentContext(contextName).then(setResult => {
         return exec('kubectl get ' + resourceLabel)
         .then(function (result) {
            const stdout = TableParser.parse(result.stdout);
            return classScope.cleanseTerminalOutput(stdout);
         })
         .catch(function (err) {
            return Promise.reject(err);
         });
      });
   }

   getContexts(specificContext?: string): Promise<Array<object>> {
      const baseCommand = 'kubectl config get-contexts';
      const command = specificContext ? baseCommand.concat(' ' + specificContext) : baseCommand;
      return exec(command)
      .then(function (result) {
         const data = TableParser.parse(result.stdout);
         return data.map(contextDetails => {
            const parsedData = {};
            Object.keys(contextDetails).forEach((key) => {
               parsedData[key.toLowerCase()] = contextDetails[key][0]
            })
            return parsedData;
         });
      })
      .catch(function (err) {
         console.error('ERROR: ', err);
      });
   }

   getLogs(resource: string): Promise<string> {
     const command = `kubectl logs ${resource} --tail=40`;
     return exec(command)
     .then(function (result) {
        return result.stdout;
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }

   getDescribe(resource: string): Promise<string> {
     const command = `kubectl describe ${resource}`;
     return exec(command)
     .then(function (result) {
        return result.stdout;
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }
}
