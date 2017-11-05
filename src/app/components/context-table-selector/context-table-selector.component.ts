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
  filteredContexts: Array<object> = [];
  filterInput: string = null;

  constructor(
    private kubectlService: KubectlService
  ) {}

  ngOnInit() {
    this.kubectlService.getContexts().then(contextDetails => {
      this.availableContexts = Object.assign([], contextDetails);
      this.filteredContexts = Object.assign([], contextDetails);
    });
  }

  selectContect(contextName: string) {
    this.onSelection.emit(contextName);
  }

  onFilterInput(inputText: string) {
    if (inputText) {
      this.filteredContexts = this.availableContexts.filter((contextDetails: { name:string }) => {
        return contextDetails.name.includes(inputText);
      });
    } else {
      this.filteredContexts = this.availableContexts;
    }
  }

}
