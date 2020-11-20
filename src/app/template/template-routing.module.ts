import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';

const routes: Routes = [
  { path:'' , pathMatch:'full' , redirectTo:'example'},
  { path:'example' , component : ExampleComponent},
  { path:'**' , pathMatch:'full' , redirectTo:'example'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
