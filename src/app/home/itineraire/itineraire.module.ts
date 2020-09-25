
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItineraireComponent } from './itineraire.component';
import { ItineraireRoutingModule } from './itineraire-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItineraireService } from './itineraire.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ItineraireRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ItineraireComponent
  ],
  declarations: [
    ItineraireComponent
  ],
  providers: [ItineraireService
  ],
})
export class ItineraireModule { }