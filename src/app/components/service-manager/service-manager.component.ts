import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'service-manager',
  templateUrl: './service-manager.component.html'
})
export class ServiceManagerComponent implements OnInit {
  @Input() context: string;
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Cluster-IP', 'External-IP', 'Port(s)', 'Age'];
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
    this.kubectlService.getResource(this.context, 'services').then(resourceDetails => {
      this.data = resourceDetails;
      this.loading = false;
    });
  }
}
