import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { UserService } from '../user.service';
import ZahtevZaRegistraciju from '../models/zahtevizaregistraciju';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit{

  constructor(private userService:UserService, private router:Router){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'pacijent'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("ulogovan")).subscribe((k:Korisnik)=>{
      this.korisnik = k;

    })
  }


  korisnik:Korisnik;
  ime:string = "";
  prezime:string = "";
  kontakt:string = "";
  adresa:string = ""
  email:string = ""
  izmena:boolean = false;
  slika:string = "";
  mojaslika:string = "";
  base64Output : string = "";




  azurirajPodatke(){
    if(this.ime == ""){
      this.ime = this.korisnik.ime
    }
    if(this.prezime == ""){
      this.prezime = this.korisnik.prezime
    }
    if(this.kontakt == ""){
      this.kontakt = this.korisnik.kontakt
    }
    if(this.adresa == ""){
      this.adresa = this.korisnik.adresa
    }
    if(this.email == ""){
      this.email = this.korisnik.email
    }
    if(this.slika == ""){
      this.slika = this.korisnik.profilna_slika
    }
    this.userService.azurirajPodatke(this.korisnik.korisnicko_ime,this.ime,this.prezime,this.kontakt,this.adresa,this.email, this.slika).subscribe()
    window.location.reload();
  }

  promena(){
    this.izmena = true;
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

  odjava(){
    localStorage.removeItem("ulogovan");
    sessionStorage.removeItem("tip");
    this.router.navigate(['login'])
  }

}
