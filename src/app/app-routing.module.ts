import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo: 'forms'},
  { path: 'template' , loadChildren: ()=> import('./template/template.module').then( (x)=> x.TemplateModule ) },
  { path: 'reactive' , loadChildren: ()=> import('./reactive/reactive.module').then( (x)=> x.ReactiveModule ) },
  { path: '**' , pathMatch: 'full' , redirectTo:'forms'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
