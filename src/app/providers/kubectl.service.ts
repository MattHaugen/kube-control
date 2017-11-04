import { Injectable } from '@angular/core';
import { exec } from 'child-process-promise';
import * as terminalTableParser from 'terminal-table-parser';
import * as TableParser from 'table-parser';
import { KubeContext } from '../data-structures/kube-context';

@Injectable()
export class KubectlService {
   contexts: object = {};

   initializeContext(contextName: string): void {
      if (!this.contexts[contextName]) {
         this.contexts[contextName] = new KubeContext();
      }
      this.contexts[contextName].name = contextName;
      return;
   }

   linkToContextDataStore(contextName: string): KubeContext {
      this.initializeContext(contextName);
      return this.contexts[contextName];
   }

   refreshContextData(contextName: string, contextDataPoints: Array<string>): Promise<Array<Promise<any>>> {
      const refreshMapping = {
         pods: 'getPods',
         context: 'getSpecificContext'
      };
      let refreshPromises = [];

      contextDataPoints.forEach(dataPointId => {
         if (this[refreshMapping[dataPointId]]) {
            refreshPromises.push(this[refreshMapping[dataPointId]](contextName));
         }
      });

      return Promise.all(refreshPromises);
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

   getAll(): Promise<object> {
      return exec('kubectl get all')
      .then(function (result) {
         var stdout = terminalTableParser(result.stdout);
         var stderr = terminalTableParser(result.stderr);
         return stdout;
      })
      .catch(function (err) {
         console.error('ERROR: ', err);
      });
   }

   getPods(contextName: string): Promise<Array<object>> {
      this.initializeContext(contextName);
      const classScope = this;

      return exec('kubectl get pods')
      .then(function (result) {
         var stdout = terminalTableParser(result.stdout);
         var stderr = terminalTableParser(result.stderr);
         classScope.contexts[contextName].pods = stdout;
         return stdout;
      })
      .catch(function (err) {
         console.error('ERROR: ', err);
      });
   }

   getSpecificContext(contextName?: string): Promise<object> {
      this.initializeContext(contextName);
      const classScope = this;

      return this.getContexts(contextName).then((contextDetails: { namespace:string, cluster:string }[]) => {
        let specificContextDetails = contextDetails[0];
        classScope.contexts[contextName].namespace = specificContextDetails.namespace;
        classScope.contexts[contextName].cluster = specificContextDetails.cluster;
        return specificContextDetails;
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
