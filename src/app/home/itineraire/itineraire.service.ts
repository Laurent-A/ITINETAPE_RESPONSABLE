import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Responsable } from './itineraire.component';
import { Itineraire } from '../etape/etape.component';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ItineraireService {
  private data;
  private itineraire : Itineraire;

  constructor(
    private router:Router,
    private httpClient: HttpClient
    ) { }

  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

  setItineraire(itineraire){
    this.itineraire = itineraire;
  }

  getItineraire(){
    let temp = this.itineraire;
    return temp;
  }

  clearResponsable(){
    this.itineraire = undefined;
  }
}
