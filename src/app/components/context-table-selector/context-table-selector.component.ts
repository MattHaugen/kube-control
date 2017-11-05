import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KubectlService } from '../../providers/kubectl.service';

@Component({
  selector: 'context-table-selector',
  templateUrl: './context-table-selector.component.html'
})
export class ContextTableSelectorComponent implements OnInit {
  @Output() onSelection = new EventEmitter<string>();
  availableContexts: Array<object> = [];

  constructor(
    private kubectlService: KubectlService
  ) {}

  ngOnInit() {
    this.kubectlService.getContexts().then(contextDetails => {
      this.availableContexts = contextDetails;
    });
  }

  selectContect(contextName: string) {
    this.onSelection.emit(contextName);
  }

}
