import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { KeysComponent } from './keys/keys.component';
import { AgentGardenerComponent } from './agent-gardener/agent-gardener.component';

const routes: Routes = [
  { path: '', component: AgentGardenerComponent },
  { path: 'keys', component: KeysComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
