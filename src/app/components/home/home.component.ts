import { Component, OnInit } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   tabs: { context:string }[] = [];
   activeTab: number = 0;
   currentContext: string = '';
   availableContexts: object[] = [];

   constructor(
     private kubectlService: KubectlService
   ) {}

   ngOnInit() {
     this.kubectlService.getCurrentContext().then(contextName => {
       this.tabs.push({ context: contextName });
       this.currentContext = contextName;
     });
     this.kubectlService.getContexts().then(allContexts => {
       this.availableContexts = allContexts;
     });
   }

   setCurrentContext(contextName: string, tabIndex: number) {
     this.currentContext = contextName;
     this.activeTab = tabIndex;
   }

   setTabContext(contextName: string, tabIndex: number) {
     this.tabs[tabIndex].context = contextName;
   }

   addContext() {
      this.activeTab = null;
   }

}
