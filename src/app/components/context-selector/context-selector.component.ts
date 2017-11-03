import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KubectlService } from '../../providers/kubectl.service';

@Component({
  selector: 'context-selector',
  templateUrl: './context-selector.component.html'
})
export class ContextSelectorComponent implements OnInit {
  contextOptions: Array<object> = [];
  selectedContext: string = "iq-dev-ttc";

  selectContextControl: FormControl = new FormControl();

  constructor(
    private kubectlService: KubectlService,
  ) {}

  ngOnInit() {
    this.kubectlService.getCurrentContext().then(contextName => {
      this.selectedContext = contextName;
    });
    this.kubectlService.getContexts().then(contextDetails => {
      this.contextOptions = contextDetails;
    });
  }

}
