import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { KubeContext } from '../../data-structures/kube-context';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'context-container',
  templateUrl: './context-container.component.html',
  styleUrls: ['./context-container.component.scss']
})
export class ContextContainerComponent implements OnInit, OnChanges {
  @Input() context: string;
  lastUpdated: Date = new Date();
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
    this.lastUpdated = new Date();
    this.refresherSubject.next(this.lastUpdated);
  }

}
