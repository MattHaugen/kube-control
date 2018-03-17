import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { KubectlService } from './providers/kubectl.service';
import { UserSettingsService } from './providers/user-settings.service';

import { WebviewDirective } from './directives/webview.directive';

import { SuiModule } from 'ng2-semantic-ui';

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
import { TerminalOutputModalComponent } from './components/terminal-output-modal/terminal-output-modal.component';
import { UpgradeNotifierComponent } from './components/upgrade-notifier/upgrade-notifier.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TerminalOutputModalComponent,
    UpgradeNotifierComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SuiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, KubectlService, UserSettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
