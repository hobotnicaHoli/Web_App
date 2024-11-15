import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Korisnik from '../models/korisnik';

@Component({
  selector: 'app-menadzer.azuriranjepacijenta',
  templateUrl: './menadzer.azuriranjepacijenta.component.html',
  styleUrls: ['./menadzer.azuriranjepacijenta.component.css']
})
export class MenadzerAzuriranjepacijentaComponent implements OnInit{

  constructor(private userService:UserService, private router:Router){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'menadzer'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("apacijent")).subscribe((k:Korisnik)=>{
      this.korisnik = k;

    })
  }


  korisnik:Korisnik;
  ime:string = "";
  prezime:string = "";
  kontakt:string = "";
  adresa:string = ""
  email:string = ""
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
    this.router.navigate(['menadzer']);
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
}
