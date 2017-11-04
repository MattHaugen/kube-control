export class KubeContext {
  name: string = '';
  cluster: string = '';
  namespace: string = '';
  pods: Array<object> = [];
}
