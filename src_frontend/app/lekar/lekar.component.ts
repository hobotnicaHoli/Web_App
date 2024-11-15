
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';
import Pregled from '../models/pregled';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){}

  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'lekar'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("ulogovan")).subscribe((k:Korisnik)=>{
      this.korisnik = k;
      this.userService.dohvatiSvePreglede(this.korisnik.specijalizacija).subscribe((p:Pregled[])=>{
        this.pregledi = p;
        this.pregledi.forEach(p=>{
          this.korisnik.usluge.forEach(u=>{
            if(u.naziv == p.naziv){
              p.status = "Ima"
            }
          })
        })
      })
    })
  }

  korisnik:Korisnik;
  izmena:boolean = false;
  slika:string = "";
  mojaslika:string = "";
  base64Output : string = "";
  ime:string = "";
  prezime: string = "";
  adresa: string = "";
  kontakt:string = "";
  broj_licence:number = 0;
  specijalizacija:string = "";
  pregledi:Array<Pregled>

  azurirajPodatke(){
    if(this.ime == ""){
      this.ime = this.korisnik.ime
    }
    if(this.prezime == ""){
      this.prezime = this.korisnik.prezime
    }
    if(this.adresa == ""){
      this.adresa = this.korisnik.adresa
    }
    if(this.kontakt == ""){
      this.kontakt = this.korisnik.kontakt
    }
    if(this.specijalizacija == ""){
      this.specijalizacija = this.korisnik.specijalizacija
    }
    if(this.slika == ""){
      this.slika = this.korisnik.profilna_slika
    }
    if(this.broj_licence == 0){
      this.broj_licence = this.korisnik.broj_licence
    }
    this.userService.azurirajLekara(this.korisnik.korisnicko_ime,this.ime, this.prezime, this.adresa, this.kontakt, this.broj_licence, this.specijalizacija, this.slika).subscribe()
    window.location.reload();
  }

  onFileSelected(event) {
    this.mojaslika = event.target.files[0].name;
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      this.slika = "data:image/jpeg;base64," + this.base64Output;

    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  dodavanjepregleda(pregled:Pregled){
    this.userService.dodajPregledLekaru(this.korisnik.korisnicko_ime, pregled.naziv, pregled.trajanje, pregled.cena).subscribe();
    window.location.reload();
  }

  otkazivanjepregleda(pregled:Pregled){
    this.userService.otkaziPregledLekaru(this.korisnik.korisnicko_ime, pregled.naziv, pregled.trajanje, pregled.cena).subscribe();
    window.location.reload();
  }

  odjava(){
    localStorage.removeItem("ulogovan");
    sessionStorage.removeItem("tip");
    this.router.navigate(['login'])
  }
}
