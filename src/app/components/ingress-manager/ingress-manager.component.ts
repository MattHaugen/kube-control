import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ingress-manager',
  templateUrl: './ingress-manager.component.html'
})
export class IngressManagerComponent implements OnInit {
  @Input() context: string;
  @Input() refreshListener:Subject<any>;
  data: Array<object> = [];
  headerLabels = ['Name', 'Hosts', 'Address', 'Ports', 'Age'];
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
    this.kubectlService.getResource(this.context, 'ingress').then(resourceDetails => {
      this.data = resourceDetails;
      this.loading = false;
    });
  }
}
