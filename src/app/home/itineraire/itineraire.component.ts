import { Component, OnInit } from '@angular/core';
import { ItineraireService } from './itineraire.service';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import { format } from 'url';
import { Router } from '@angular/router';


@Component({
  selector: 'app-itineraire',
  templateUrl: './itineraire.component.html',
  styleUrls: ['./itineraire.component.css']
})

export class ItineraireComponent implements OnInit {

  itineraires: any;
  itineraireUnique: any;
  loaded: boolean;
  postLevel: string;
  postName: string;
  itineraireForm = new FormGroup({
    niveau: new FormControl(''),
    nom: new FormControl('')
  });
  responsable: Responsable;
  affichageForm = true;

  constructor(
    private itineraireService: ItineraireService,
    private httpClient: HttpClient,
    private router:Router
    
    ) {
  }

  ngOnInit() {
    this.getItineraire();
    
  }

    getItineraire() {
      this.httpClient
        .get<any[]>('http://localhost:9090/itinetape/itineraire')
        .subscribe(
          (response) => {
            this.itineraires = response;
            
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }

  
  getItineraireUnique(id) {
    this.httpClient
      .get<any[]>('http://localhost:9090/itinetape/itineraire/'+id)
      .subscribe(
        (response) => {
          this.itineraires = response;
          
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
}

  resetItineraire() {
      this.itineraires = null;
      this.loaded = true;
    }

  onSubmit(){
    this.postLevel = this.itineraireForm.controls.niveau.value;
    this.postName = this.itineraireForm.controls.nom.value;
    this.responsable = this.itineraires[0].responsable;
    this.httpClient.post<any>('http://localhost:9090/itinetape/itineraire', { 
      niveau: this.postLevel, 
      nom: this.postName, 
      responsable:this.responsable
    })
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.getItineraire();
        this.itineraireForm.reset();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  supprimerItineraire(id){    
    this.httpClient.delete<any>('http://localhost:9090/itinetape/itineraire/'+id)
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.getItineraire();
        this.affichageForm = true;
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  saveData(id){
    this.itineraireService.setData(id);
    this.itineraireService.setItineraire(this.itineraires.find(itineraireId => itineraireId.id = id));
    this.router.navigateByUrl('/etape');
  }

  afficherModifier(id){
    let idItineraireActuel = this.itineraires.find(itineraireId => itineraireId.id = id).id
    this.itineraireUnique = idItineraireActuel
    this.affichageForm = false;
  }

  modifier(){
    this.postLevel = this.itineraireForm.controls.niveau.value;
    this.postName = this.itineraireForm.controls.nom.value;
    this.responsable = this.itineraires[0].responsable;
    this.httpClient.put<any>('http://localhost:9090/itinetape/itineraire/'+this.itineraireUnique, { 
      niveau: this.postLevel, 
      nom: this.postName, 
      responsable:this.responsable
    })
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.getItineraire();
        this.itineraireForm.reset();
        this.affichageForm = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  annuler(){
    this.itineraireForm.reset();
    this.affichageForm = true;
  }

}

export interface Responsable{
  id: Number;
  login: String;
  mdp: String
}
