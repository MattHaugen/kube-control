import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { KubeContext } from '../../data-structures/kube-context';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'context-container',
  templateUrl: './context-container.component.html'
})
export class ContextContainerComponent implements OnInit, OnChanges {
  @Input() context: string;
  kubeContext: KubeContext = new KubeContext();
  refresherSubject:Subject<any> = new Subject();

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.kubeContext.name = this.context;
    this.kubectlService.getContexts(this.context).then((contextDetails: { namespace:string, cluster:string }[]) => {
       let specificContextDetails = contextDetails[0];
       this.kubeContext.namespace = specificContextDetails.namespace;
       this.kubeContext.cluster = specificContextDetails.cluster;
    });
  }

  refreshData() {
    this.refresherSubject.next(new Date());
  }

}
