import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';
import { SuiModalService } from 'ng2-semantic-ui';
import { TerminalOutputModal } from '../terminal-output-modal/terminal-output-modal.component';

@Component({
  selector: 'pod-manager',
  templateUrl: './pod-manager.component.html'
})
export class PodManagerComponent implements OnInit {
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Ready', 'Status', 'Restarts', 'Age', ''];
  loading: boolean = true;
  notification: string = null;
  notificationClass: string = 'negative';

  constructor(
    private kubectlService: KubectlService,
    private modalService: SuiModalService
  ) {}

  ngOnInit() {
    this.refreshListener.subscribe(event => {
      this.refreshData();
    });
  }

  ngOnDestroy() {
    this.refreshListener.unsubscribe();
  }

  refreshData() {
    this.loading = true;
    this.notification = null;
    this.kubectlService.getResource('pods')
    .then(podDetails => {
      this.data = podDetails;
      this.loading = false;
    })
    .catch(err => {
      this.data = [];
      this.notification = err;
      this.notificationClass = 'negative';
      this.loading = false;
    });
  }

  showLogs(podName: string): void {
    this.kubectlService.getLogs('po/' + podName).then(logs => {
      this.modalService
      .open(new TerminalOutputModal(logs, podName, "Displaying last 40 lines"));
    });
  }

  showDescribe(podName: string): void {
    this.kubectlService.getDescribe('po/' + podName).then(logs => {
      this.modalService
      .open(new TerminalOutputModal(logs, podName));
    });
  }

  closeNotification(): void {
    this.notification = null;
  }
}
