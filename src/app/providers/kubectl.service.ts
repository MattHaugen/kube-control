import { Injectable } from '@angular/core';
import { exec } from 'child-process-promise';
import * as terminalTableParser from 'terminal-table-parser';

@Injectable()
export class KubectlService {
  getCurrentContext(): Promise<string> {
    return exec('kubectl config current-context')
    .then(function (result) {
       return result.stdout;
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
}
