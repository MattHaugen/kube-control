import { Component, OnInit } from '@angular/core';
import { KubectlService } from '../../providers/kubectl.service';
import { UserSettingsService } from '../../providers/user-settings.service';
import { ContextConstants } from '../../constants/context-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   tabs: { context: string }[] = [];
   activeTab = 0;
   currentContext = '';
   availableContexts: object[] = [];
   refreshOptions: Array<object> = ContextConstants.REFRESH_CADENCE_OPTIONS;
   selectedRefreshCadence = null;

   constructor(
     private kubectlService: KubectlService,
     private userSettingsService: UserSettingsService
   ) {}

   ngOnInit() {
     this.kubectlService.getCurrentContext().then(contextName => {
       this.tabs.push({ context: contextName });
       this.currentContext = contextName;
     });
     this.kubectlService.getContexts().then(allContexts => {
       this.availableContexts = allContexts;
     });

     this.userSettingsService.getUserSetting('refreshCadence').then(refreshCadenceValue => {
       this.selectedRefreshCadence = refreshCadenceValue;
     });
   }

   setCurrentContext(contextName: string, tabIndex: number) {
     this.currentContext = contextName;
     this.activeTab = tabIndex;
   }

   addContext() {
      this.activeTab = null;
   }

   addTab(contextName: string) {
     this.tabs.push({ context: contextName});
     this.activeTab = this.tabs.length - 1;
   }

   removeTab(tabIndex: number) {
     this.tabs.splice(tabIndex, 1);
     this.activeTab -= 1;
   }

   changeRefreshRate(value) {
     // UI elements turn the values into strings, make sure we save as Numbers or null
     let parsedValue = Number.parseInt(value);
     if (!parsedValue) {
       parsedValue = null;
     }

     this.userSettingsService.setUserSetting('refreshCadence', parsedValue);
   }

}
