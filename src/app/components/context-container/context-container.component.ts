import { Component, OnInit, Input } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { KubeContext } from '../../data-structures/kube-context';

@Component({
  selector: 'context-container',
  templateUrl: './context-container.component.html'
})
export class ContextContainerComponent implements OnInit {
  @Input() context: string;
  kubeContext: KubeContext = new KubeContext();

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {
     this.kubeContext.name = this.context;
     this.kubectlService.getContexts(this.context).then((contextDetails: { namespace:string, cluster:string }[]) => {
        let specificContextDetails = contextDetails[0];
        this.kubeContext.namespace = specificContextDetails.namespace;
        this.kubeContext.cluster = specificContextDetails.cluster;
     });
     this.kubectlService.getResource(this.context, 'pods').then(podDetails => { this.kubeContext.pods = podDetails });
     this.kubectlService.getResource(this.context, 'services').then(serviceDetails => { this.kubeContext.services = serviceDetails });
  }

}
