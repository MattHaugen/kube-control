import { Injectable } from '@angular/core';
import { exec } from 'child-process-promise';
import * as terminalTableParser from 'terminal-table-parser';
import * as TableParser from 'table-parser';
import { KubeContext } from '../data-structures/kube-context';

@Injectable()
export class KubectlService {
   currentContext: string = '';

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
       let cleansedObject = {};
       for (const key in row) {
         cleansedObject[key] = row[key][0]
       }
       return cleansedObject;
     });
   }

   getResource(contextName: string, resourceLabel: string): Promise<Array<object>> {
      var classScope = this;
      return this.setCurrentContext(contextName).then(result => {
         return exec('kubectl get ' + resourceLabel)
         .then(function (result) {
            var stdout = TableParser.parse(result.stdout);
            return classScope.cleanseTerminalOutput(stdout);
         })
         .catch(function (err) {
            console.error('ERROR: ', err);
         });
      });
   }

   getContexts(specificContext?: string): Promise<Array<object>> {
      let baseCommand = 'kubectl config get-contexts';
      let command = specificContext ? baseCommand.concat(' ' + specificContext) : baseCommand;
      return exec(command)
      .then(function (result) {
         var data = TableParser.parse(result.stdout);
         return data.map(contextDetails => {
            var parsedData = {};
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
     let command = `kubectl logs ${resource} --tail=40`;
     return exec(command)
     .then(function (result) {
        return result.stdout;
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }

   getDescribe(resource: string): Promise<string> {
     let command = `kubectl describe ${resource}`;
     return exec(command)
     .then(function (result) {
        return result.stdout;
     })
     .catch(function (err) {
        console.error('ERROR: ', err);
     });
   }
}
