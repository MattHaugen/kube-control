import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContextContainerComponent } from './components/context-container/context-container.component';
import { PodStatusTableComponent } from './components/pod-status-table/pod-status-table.component';
import { ServiceManagerComponent } from './components/service-manager/service-manager.component';
import { DeploymentManagerComponent } from './components/deployment-manager/deployment-manager.component';
import { ReplicasetManagerComponent } from './components/replicaset-manager/replicaset-manager.component';
import { IngressManagerComponent } from './components/ingress-manager/ingress-manager.component';
import { ContextTableSelectorComponent } from './components/context-table-selector/context-table-selector.component';
import { TerminalOutputModalComponent } from "./components/terminal-output-modal/terminal-output-modal.component";

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { KubectlService } from './providers/kubectl.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';

import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContextContainerComponent,
    PodStatusTableComponent,
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
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    SuiModule
  ],
  providers: [ElectronService, KubectlService],
  bootstrap: [AppComponent],
  entryComponents: [
    TerminalOutputModalComponent
  ]
})
export class AppModule { }
