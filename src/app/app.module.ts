import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InitializeComponent } from './components/initialize/initialize.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';

import { ContextContainerComponent } from './components/context-container/context-container.component';
import { PodManagerComponent } from './components/pod-manager/pod-manager.component';
import { ServiceManagerComponent } from './components/service-manager/service-manager.component';
import { DeploymentManagerComponent } from './components/deployment-manager/deployment-manager.component';
import { ReplicasetManagerComponent } from './components/replicaset-manager/replicaset-manager.component';
import { IngressManagerComponent } from './components/ingress-manager/ingress-manager.component';
import { ContextTableSelectorComponent } from './components/context-table-selector/context-table-selector.component';
import { TerminalOutputModalComponent } from "./components/terminal-output-modal/terminal-output-modal.component";

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { KubectlService } from './providers/kubectl.service';
import { UserSettingsService } from './providers/user-settings.service';

import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    InitializeComponent,
    ContextContainerComponent,
    PodManagerComponent,
    ServiceManagerComponent,
    DeploymentManagerComponent,
    ReplicasetManagerComponent,
    IngressManagerComponent,
    ContextTableSelectorComponent,
    TerminalOutputModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SuiModule
  ],
  providers: [ElectronService, KubectlService, UserSettingsService],
  bootstrap: [AppComponent],
  entryComponents: [
    TerminalOutputModalComponent
  ]
})
export class AppModule { }
