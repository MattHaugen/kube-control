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
  @Input() refreshCadence: string;
  refreshTimerReference;
  lastUpdated: Date = null;
  kubeContext: KubeContext = new KubeContext();
  refresherSubject: Subject<any> = new Subject();

  constructor(
    private kubectlService: KubectlService
  ) {}

  ngOnChanges(changes: any) {
    this.kubeContext.name = this.context;
    this.kubectlService.getContexts(this.context).then((contextDetails: { namespace: string, cluster: string }[]) => {
      const specificContextDetails = contextDetails[0];
      this.kubeContext.namespace = specificContextDetails.namespace;
      this.kubeContext.cluster = specificContextDetails.cluster;
    });

    // Refresh data any time the context changes from initial set
    if (changes.context && !changes.context.firstChange) {
      this.refreshData();
    }

    this.resetRefreshTimer();
  }

  refreshData() {
    this.lastUpdated = new Date();
    this.refresherSubject.next(this.lastUpdated);

    this.resetRefreshTimer();
  }

  resetRefreshTimer() {
    const classReference = this;
    clearTimeout(this.refreshTimerReference);

    const parsedNumber = Number.parseInt(this.refreshCadence);
    if (parsedNumber) {
      this.refreshTimerReference = setTimeout(function() {
        classReference.refreshData();
      }, this.refreshCadence);
    }
  }

}
