import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';
import { SuiModalService } from 'ng2-semantic-ui';
import { TerminalOutputModal } from '../terminal-output-modal/terminal-output-modal.component';

@Component({
  selector: 'service-manager',
  templateUrl: './service-manager.component.html'
})
export class ServiceManagerComponent implements OnInit {
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Cluster-IP', 'External-IP', 'Port(s)', 'Age', ''];
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
    this.kubectlService.getResource('services')
    .then(resourceDetails => {
      this.data = resourceDetails;
      this.loading = false;
    })
    .catch(err => {
      this.data = [];
      this.notification = err;
      this.notificationClass = 'negative';
      this.loading = false;
    });
  }

  showDescribe(serviceName: string): void {
    this.kubectlService.getDescribe('svc/' + serviceName).then(logs => {
      this.modalService
      .open(new TerminalOutputModal(logs, serviceName));
    });
  }

  closeNotification(): void {
    this.notification = null;
  }
}
