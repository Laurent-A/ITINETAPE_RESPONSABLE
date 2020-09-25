import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItineraireComponent } from './home/itineraire/itineraire.component';
import { EtapeComponent } from './home/etape/etape.component';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'itineraire', component: ItineraireComponent },
  { path: 'etape', component: EtapeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
