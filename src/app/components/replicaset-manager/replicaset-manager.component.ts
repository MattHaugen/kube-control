import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';
import { SuiModalService } from 'ng2-semantic-ui';
import { TerminalOutputModal } from '../terminal-output-modal/terminal-output-modal.component';

@Component({
  selector: 'replicaset-manager',
  templateUrl: './replicaset-manager.component.html'
})
export class ReplicasetManagerComponent implements OnInit {
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Desired', 'Current', 'Ready', 'Age', ''];
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
    this.kubectlService.getResource('replicasets')
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

  showDescribe(replicasetName: string): void {
    this.kubectlService.getDescribe('rs/' + replicasetName).then(logs => {
      this.modalService
      .open(new TerminalOutputModal(logs, replicasetName));
    });
  }

  closeNotification(): void {
    this.notification = null;
  }
}
