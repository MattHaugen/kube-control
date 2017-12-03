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
  @Input() isActive = false;
  refreshTimerReference;
  lastUpdated: Date = null;
  kubeContext: KubeContext = new KubeContext();
  refresherSubject: Subject<any> = new Subject();

  constructor(
    private kubectlService: KubectlService
  ) {}

  ngOnChanges(changes: any) {
    // Refresh data any time the context changes
    if (changes.context) {
      this.kubeContext.name = this.context;
      this.kubectlService.getContexts(this.context).then((contextDetails: { namespace: string, cluster: string }[]) => {
        const specificContextDetails = contextDetails[0];
        this.kubeContext.namespace = specificContextDetails.namespace;
        this.kubeContext.cluster = specificContextDetails.cluster;
      });

      this.kubectlService.setCurrentContext(this.context).then(setResult => {
        this.refreshData();
        this.resetRefreshTimer();
      });
    }

    if (changes.isActive) {
      if (changes.isActive.previousValue === false && changes.isActive.currentValue === true) {
        this.kubectlService.setCurrentContext(this.context).then(setResult => {
          this.resetRefreshTimer();
        });
      } else if (changes.isActive.previousValue === true && changes.isActive.currentValue === false) {
        clearTimeout(this.refreshTimerReference);
      }
    }

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
