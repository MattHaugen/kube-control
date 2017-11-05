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

   getResource(contextName: string, resourceLabel: string): Promise<Array<object>> {
      return this.setCurrentContext(contextName).then(result => {
         return exec('kubectl get ' + resourceLabel)
         .then(function (result) {
            var stdout = terminalTableParser(result.stdout);
            var stderr = terminalTableParser(result.stderr);
            return stdout;
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
}
