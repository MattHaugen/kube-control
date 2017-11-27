import { Component, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { KubectlService } from '../../providers/kubectl.service';
import { KubeContext } from '../../data-structures/kube-context';

@Component({
  selector: 'context-container',
  templateUrl: './context-container.component.html',
  styleUrls: ['./context-container.component.scss']
})
export class ContextContainerComponent implements OnChanges {
  @Input() context: string;
  lastUpdated: Date = new Date();
  kubeContext: KubeContext = new KubeContext();
  refresherSubject: Subject<any> = new Subject();

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnChanges(changes: any) {
     this.kubeContext.name = this.context;
     this.kubectlService.getContexts(this.context).then((contextDetails: { namespace: string, cluster: string }[]) => {
        const specificContextDetails = contextDetails[0];
        this.kubeContext.namespace = specificContextDetails.namespace;
        this.kubeContext.cluster = specificContextDetails.cluster;
     });

     if (!changes.context.firstChange) {
        this.refreshData();
     }
  }

  refreshData() {
    this.lastUpdated = new Date();
    this.refresherSubject.next(this.lastUpdated);
  }

}
