import { HomeComponent } from './components/home/home.component';
import { InitializeComponent } from './components/initialize/initialize.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: InitializeComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
