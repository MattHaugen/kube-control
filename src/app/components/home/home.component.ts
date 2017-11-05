import { Component, OnInit } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   tabs:{ context:string }[] = [];
   activeTab:number = 0;
   currentContext:string = '';

   constructor(
     private kubectlService: KubectlService
   ) {}

   ngOnInit() {
     this.kubectlService.getCurrentContext().then(contextName => {
       this.tabs.push({ context: contextName });
       this.currentContext = contextName;
     });
   }

   setCurrentContext(contextName, tabIndex) {
     this.currentContext = contextName;
     this.activeTab = tabIndex;
   }

   addContext() {
      this.activeTab = null;
   }

}
