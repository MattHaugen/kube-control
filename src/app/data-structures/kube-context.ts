export class KubeContext {
  name = '';
  cluster = '';
  namespace = '';
  pods: Array<object> = [];
  services: Array<object> = [];
}
