import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContextContainerComponent } from './components/context-container/context-container.component';
import { PodStatusTableComponent } from './components/pod-status-table/pod-status-table.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { KubectlService } from './providers/kubectl.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContextContainerComponent,
    PodStatusTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [ElectronService, KubectlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
