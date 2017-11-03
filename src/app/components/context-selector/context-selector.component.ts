import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KubectlService } from '../../providers/kubectl.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'context-selector',
  templateUrl: './context-selector.component.html'
})
export class ContextSelectorComponent implements OnInit {
  contextOptions: Array<object> = [];
  filteredContexts: Observable<object[]>;
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

      this.filteredContexts = this.selectContextControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val.NAME) : this.contextOptions.slice());
    });
  }

  filter(val: string): object[] {
    return this.contextOptions.filter(option => {
      return option.NAME.toLowerCase().indexOf(val.toLowerCase()) === 0;
    })
  }

}
