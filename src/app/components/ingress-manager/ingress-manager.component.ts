import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';
import { SuiModalService } from 'ng2-semantic-ui';
import { TerminalOutputModal } from '../terminal-output-modal/terminal-output-modal.component';

@Component({
  selector: 'ingress-manager',
  templateUrl: './ingress-manager.component.html'
})
export class IngressManagerComponent implements OnInit {
  @Input() context: string;
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Hosts', 'Address', 'Ports', 'Age', ''];
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
    this.kubectlService.getResource(this.context, 'ingress')
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

  showDescribe(ingressName: string): void {
    this.kubectlService.getDescribe('ing/' + ingressName).then(logs => {
      this.modalService
      .open(new TerminalOutputModal(logs, ingressName));
    });
  }

  closeNotification(): void {
    this.notification = null;
  }
}
