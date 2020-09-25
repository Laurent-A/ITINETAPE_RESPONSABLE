import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItineraireService } from '../itineraire/itineraire.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Responsable } from '../itineraire/itineraire.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.css']
})
export class EtapeComponent implements OnInit {
  data = this.itineraireService.getData(); 
  etapes : any;
  etapeActuelle : any;
  description : String;
  nom : String;
  qrCodeEtape : String;
  totalfavori = 0;
  ordreEtape : Number;
  itineraire = this.data;
  itineraireActuelle = this.itineraireService.getItineraire();
  etapeForm = new FormGroup({
    description: new FormControl(''),
    nom: new FormControl(''),
    totalfavori: new FormControl(''),
    ordreEtape: new FormControl(''),
  });
  affichageForm = true;
  idEtape: Number;
  afficherQrCode = false;
  


  constructor(
    private httpClient: HttpClient,
    private itineraireService: ItineraireService,
    private router:Router) { 
      this.getEtape();
    }

  ngOnInit() {
     this.getEtape();
     
  }

    getEtape() {
      let idItineraire = this.data;
      this.httpClient
        .get<any[]>('http://localhost:9090/itinetape/etape/itineraire/' + idItineraire)
        .subscribe(
          (response) => {
            this.etapes = response;
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }


  onSubmit(){
    this.description = this.etapeForm.controls.description.value;
    this.nom = this.etapeForm.controls.nom.value;
    this.ordreEtape = parseInt(this.etapeForm.controls.ordreEtape.value);
    
  
    this.httpClient.post<any>('http://localhost:9090/itinetape/etape', { 
      description: this.description, 
      nom: this.nom, 
      totalfavori: this.totalfavori,
      itineraire: this.itineraireActuelle,
      ordreEtape: this.ordreEtape 
    })
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.getEtape();
        this.etapeForm.reset();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  recupererEtape(id){
    for(let i=0;i<this.etapes.length;i++){
      if(this.etapes[i].id=id){
        this.etapeActuelle=this.etapes[i]
      }
    }
  }

  supprimerEtape(id){
    this.httpClient.delete<any>('http://localhost:9090/itinetape/etape/'+id)
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.getEtape();
        this.affichageForm = true;
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  afficherModifier(id){
    this.recupererEtape(id)
    this.affichageForm = false;
    this.idEtape = id;
  }


  modifier(id){
    this.recupererEtape(id)
    this.description = this.etapeForm.controls.description.value;
    this.nom = this.etapeForm.controls.nom.value;
    this.ordreEtape = parseInt(this.etapeForm.controls.ordreEtape.value);
    
    this.httpClient.put<any>('http://localhost:9090/itinetape/etape/'+this.idEtape, { 
      description: this.description, 
      nom: this.nom, 
      qrCode:this.etapeActuelle.qrCode,
      itineraire: this.itineraireActuelle,
      ordreEtape: this.ordreEtape,
      totalfavori: this.etapeActuelle.totalfavori
    })
    .subscribe(() => {
        console.log('Enregistrement terminé !');
        this.getEtape();
        this.etapeForm.reset();
        this.affichageForm = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  annuler(){
    this.etapeForm.reset();
    this.affichageForm = true;
  }


  generatePdf(id){
    this.recupererEtape(id)
    const documentDefinition = { 
      content: [
      // basic usage
      { text: this.etapeActuelle.nom },
      { qr:'http://192.168.1.58:9090/itinetape/etape/'+id },
      { text: this.etapeActuelle.description },
    ] 
  };
    pdfMake.createPdf(documentDefinition).open();
   }

}

export interface Itineraire{
  id: Number;
  nom: String;
  niveau: String
  responsable: Responsable;
}

