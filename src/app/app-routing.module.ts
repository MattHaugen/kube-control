import { HomeComponent } from './components/home/home.component';
import { InitializeComponent } from './components/initialize/initialize.component';
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
