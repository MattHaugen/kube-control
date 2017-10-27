import { Component, Input } from '@angular/core';

@Component({
  selector: 'pod-status-table',
  templateUrl: './pod-status-table.component.html'
})
export class PodStatusTableComponent {
  @Input() data: Array<object>;
  headerLabels = ['Name', 'Ready', 'Status', 'Restarts', 'Age'];
}
