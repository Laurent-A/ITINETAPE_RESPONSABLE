import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItineraireComponent } from './itineraire.component';

const routes: Routes = [
  { path: '', component: ItineraireComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItineraireRoutingModule { }