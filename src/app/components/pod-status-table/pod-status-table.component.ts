import { Component, Input, OnInit } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'pod-status-table',
  templateUrl: './pod-status-table.component.html'
})
export class PodStatusTableComponent implements OnInit {
  @Input() context: string;
  @Input() subjectListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Ready', 'Status', 'Restarts', 'Age'];
  loading: boolean = true;

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {
    this.refreshData();
    this.subjectListener.subscribe(event => {
      this.refreshData();
    });
  }

  refreshData() {
    this.loading = true;
    this.kubectlService.getResource(this.context, 'pods').then(podDetails => {
      this.data = podDetails;
      this.loading = false;
    });
  }
}
