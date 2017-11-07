import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'replicaset-manager',
  templateUrl: './replicaset-manager.component.html'
})
export class ReplicasetManagerComponent implements OnInit {
  @Input() context: string;
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Desired', 'Current', 'Ready', 'Age'];
  loading: boolean = true;

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {
    this.refreshData();
    this.refreshListener.subscribe(event => {
      this.refreshData();
    });
  }

  ngOnDestroy() {
    this.refreshListener.unsubscribe();
  }

  refreshData() {
    this.loading = true;
    this.kubectlService.getResource(this.context, 'replicasets').then(resourceDetails => {
      this.data = resourceDetails;
      this.loading = false;
    });
  }
}
