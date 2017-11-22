import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';
import { SuiModalService } from 'ng2-semantic-ui';
import { TerminalOutputModal } from '../terminal-output-modal/terminal-output-modal.component';

@Component({
  selector: 'deployment-manager',
  templateUrl: './deployment-manager.component.html'
})
export class DeploymentManagerComponent implements OnInit {
  @Input() context: string;
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Desired', 'Current', 'Up-To-Date', 'Available', 'Age', ''];
  loading: boolean = true;
  notification: string = null;
  notificationClass: string = 'negative';

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
    this.kubectlService.getResource(this.context, 'deployments')
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

  showDescribe(deploymentName: string): void {
    this.kubectlService.getDescribe('deploy/' + deploymentName).then(logs => {
      this.modalService
      .open(new TerminalOutputModal(logs, deploymentName));
    });
  }

  closeNotification(): void {
    this.notification = null;
  }
}
