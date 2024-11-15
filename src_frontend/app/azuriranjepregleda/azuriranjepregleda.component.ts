import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import PregledMenadzera from '../models/pregledmenadzera';
import Korisnik from '../models/korisnik';
import Pregled from '../models/pregled';

@Component({
  selector: 'app-azuriranjepregleda',
  templateUrl: './azuriranjepregleda.component.html',
  styleUrls: ['./azuriranjepregleda.component.css']
})
export class AzuriranjepregledaComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'menadzer'){
      this.router.navigate([''])
    }
    this.userService.dohvPregled(localStorage.getItem("apregled")).subscribe((p:PregledMenadzera)=>{
      this.pregled = p;
      this.nazivpomocni = p.naziv;
    })
    this.userService.dohvatiLekare().subscribe((l:Korisnik[])=>{
      this.lekari = l;
    })
  }

  lekari:Array<Korisnik>
  usluge:Array<Pregled>
  nazivpomocni:string;
  pregled:PregledMenadzera;
  naziv:string = "";
  cena:number = 0;
  trajanje:number = 0;

azuriranje(){
  if(this.naziv == ""){
    this.naziv = this.pregled.naziv
  }
  if(this.cena == 0){
    this.cena = this.pregled.cena
  }
  if(this.trajanje == 0){
    this.trajanje = this.pregled.trajanje
  }
  /*this.lekari.forEach(l=>{
    this.usluge = l.usluge
    this.usluge.forEach(u=>{
      if(u.naziv == this.nazivpomocni){
        this.userService.azurirajPregledLekaru(l.korisnicko_ime,this.nazivpomocni, u.naziv, u.cena, u.trajanje).subscribe()
        return;
      }
    }) 
  })*/
  this.userService.azurirajPregled(this.nazivpomocni ,this.naziv, this.cena, this.trajanje, this.pregled.specijalizacija).subscribe()
  this.router.navigate(['dodavanjelekara'])
}


}
