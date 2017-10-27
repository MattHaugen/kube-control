import { Component, OnInit } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { KubeContext } from '../../data-structures/kube-context';

@Component({
  selector: 'context-container',
  templateUrl: './context-container.component.html'
})
export class ContextContainerComponent implements OnInit {
  kubeContext: KubeContext = { name: '' };

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {
    this.kubectlService.getCurrentContext().then(contextName => { this.kubeContext.name = contextName; });
  }

}
