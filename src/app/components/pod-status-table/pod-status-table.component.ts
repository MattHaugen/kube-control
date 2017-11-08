import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';
import { SuiModalService } from 'ng2-semantic-ui';
import { TerminalOutputModal } from '../terminal-output-modal/terminal-output-modal.component';

@Component({
  selector: 'pod-status-table',
  templateUrl: './pod-status-table.component.html'
})
export class PodStatusTableComponent implements OnInit {
  @Input() context: string;
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Ready', 'Status', 'Restarts', 'Age', ''];
  loading: boolean = true;

  constructor(
    private kubectlService: KubectlService,
    private modalService: SuiModalService
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
    this.kubectlService.getResource(this.context, 'pods').then(podDetails => {
      this.data = podDetails;
      this.loading = false;
    });
  }

  showLogs(podName: string): void {
    this.kubectlService.getLogs('po/' + podName).then(logs => {
      this.modalService
      .open(new TerminalOutputModal(logs, podName));
    });
  }
}
