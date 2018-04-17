import * as childProcess from 'child_process';
import * as promisify from 'util.promisify';
import * as TableParser from 'table-parser';

const exec = promisify(childProcess.exec);
const { spawn } = childProcess;

export default class KubectlService {
   currentContext = '';

   static getVersion(): Promise<string> {
      return exec('kubectl version --short=true --client=true')
      .then(result => result.trim())
      .catch(err => Promise.reject(err));
   }

   static getRawConfig(): Promise<string> {
      return exec('kubectl config view')
      .then(result => result.trim())
      .catch(err => {
         console.error('ERROR: ', err);
      });
   }

   static getCurrentContext(): Promise<string> {
      return exec('kubectl config current-context')
      .then(result => result.trim())
      .catch(err => {
         console.error('ERROR: ', err);
      });
   }

   setCurrentContext(contextName: string): Promise<string> {
      if (this.currentContext === contextName) {
         return Promise.resolve(contextName);
      }

      this.currentContext = contextName;
      return exec(`kubectl config use-context ${contextName}`)
      .then(result => result.trim())
      .catch(err => {
         console.error('ERROR: ', err);
      });
   }

   static cleanseTerminalOutput(terminalOutput: object[]): object[] {
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
     return exec(`kubectl get ${resourceLabel}`)
     .then(result => {
        const stdout = TableParser.parse(result);
        return classScope.cleanseTerminalOutput(stdout);
     })
     .catch(err => Promise.reject(err));
   }

   static getContexts(specificContext?: string): Promise<Array<object>> {
      const baseCommand = 'kubectl config get-contexts';
      const command = specificContext ? baseCommand.concat(` ${specificContext}`) : baseCommand;
      return exec(command)
      .then(result => {
         const data = TableParser.parse(result);
         return data.map(contextDetails => {
            const parsedData = {};
            Object.keys(contextDetails).forEach((key) => {
               parsedData[key.toLowerCase()] = contextDetails[key][0]
            })
            return parsedData;
         });
      })
      .catch(err => {
         console.error('ERROR: ', err);
      });
   }

   static getLogs(resource: string): Promise<string> {
     return new Promise((resolve) => {
       const spawnProcess = spawn('kubectl', ['logs', `${resource}`, '--tail=100']);
       let result = '';
       spawnProcess.stdout.on('data', (data) => {
         result += data.toString();
       });
       spawnProcess.on('close', () => {
         resolve(result);
       });
     });
   }

   static getDescribe(resource: string): Promise<string> {
     const command = `kubectl describe ${resource}`;
     return exec(command)
     .then(result => result)
     .catch(err => {
        console.error('ERROR: ', err);
     });
   }
}
