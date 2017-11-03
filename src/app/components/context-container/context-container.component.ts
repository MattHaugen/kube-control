import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { KubeContext } from '../../data-structures/kube-context';

@Component({
  selector: 'context-container',
  templateUrl: './context-container.component.html'
})
export class ContextContainerComponent implements OnInit, OnChanges {
  @Input() context: string;
  kubeContext: KubeContext = { name: '', pods: [] };

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {
  }

  ngOnChanges() {
    this.kubeContext.name = this.context;
    this.kubectlService.getPods().then(podDetails => { this.kubeContext.pods = podDetails; });
  }

}
