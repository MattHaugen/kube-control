import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { KubeContext } from '../../data-structures/kube-context';

@Component({
  selector: 'context-container',
  templateUrl: './context-container.component.html'
})
export class ContextContainerComponent implements OnInit, OnChanges {
  @Input() context: string;
  kubeContext: KubeContext = {
    name: '',
    cluster: '',
    namespace: '',
    pods: []
  };

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {
  }

  ngOnChanges() {
    this.kubeContext.name = this.context;
    this.kubectlService.getContexts(this.context).then((contextDetails: { NAMESPACE:string, CLUSTER:string }[]) => {
      let specificContextDetails = contextDetails[0];
      this.kubeContext.namespace = specificContextDetails.NAMESPACE;
      this.kubeContext.cluster = specificContextDetails.CLUSTER;
    });
    this.kubectlService.getPods().then(podDetails => { this.kubeContext.pods = podDetails; });
  }

}
