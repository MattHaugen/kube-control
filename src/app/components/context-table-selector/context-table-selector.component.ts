import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KubectlService } from '../../providers/kubectl.service';

@Component({
  selector: 'context-table-selector',
  templateUrl: './context-table-selector.component.html',
  styleUrls: ['./context-table-selector.component.scss']
})
export class ContextTableSelectorComponent implements OnInit {
  @Output() onSelection = new EventEmitter<string>();
  @Input() alreadySelected: { context: string }[];
  availableContexts: Array<object> = [];
  filteredContexts: Array<object> = [];
  filterInput: string = null;

  constructor(
    private kubectlService: KubectlService
  ) {}

  ngOnInit() {
    this.kubectlService.getContexts().then(contextDetails => {
      // Filter out any contexts that already have a tab
      const activeContexts = this.alreadySelected.map(obj => { return obj.context; });
      contextDetails = contextDetails.filter(
        (availableContext: { name: string }) => { return !activeContexts.includes(availableContext.name )}
      )

      this.availableContexts = Object.assign([], contextDetails);
      this.filteredContexts = Object.assign([], contextDetails);
    });
  }

  selectContect(contextName: string) {
    this.onSelection.emit(contextName);
  }

  onFilterInput(inputText: string) {
    if (inputText) {
      this.filteredContexts = this.availableContexts.filter((contextDetails: { name: string }) => {
        return contextDetails.name.includes(inputText);
      });
    } else {
      this.filteredContexts = this.availableContexts;
    }
  }

}
