import { Injectable } from '@angular/core';
import { exec } from 'child-process-promise';
import * as terminalTableParser from 'terminal-table-parser';
import * as TableParser from 'table-parser';

@Injectable()
export class KubectlService {
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

  getPods(): Promise<Array<object>> {
    return exec('kubectl get pods')
    .then(function (result) {
       var stdout = terminalTableParser(result.stdout);
       var stderr = terminalTableParser(result.stderr);
       return stdout;
    })
    .catch(function (err) {
       console.error('ERROR: ', err);
    });
  }

  getContexts(specificContext?: string): Promise<Array<object>> {
    let baseCommand = 'kubectl config get-contexts';
    let command = specificContext ? baseCommand.concat(' ' + specificContext) : baseCommand;
    return exec(command)
    .then(function (result) {
       var data = TableParser.parse(result.stdout);
       return data.map(contextDetails => {
         return {
           NAME: contextDetails.NAME[0],
           CLUSTER: contextDetails.CLUSTER[0],
           NAMESPACE: contextDetails.NAMESPACE[0],
         };
       });
    })
    .catch(function (err) {
       console.error('ERROR: ', err);
    });
  }
}
