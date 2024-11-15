import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-menadzer.azuriranje',
  templateUrl: './menadzer.azuriranje.component.html',
  styleUrls: ['./menadzer.azuriranje.component.css']
})
export class MenadzerAzuriranjeComponent implements OnInit {
  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'menadzer'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("alekar")).subscribe((l:Korisnik)=>{
      this.lekar = l;
    })
  }

  lekar:Korisnik;
  slika:string = "";
  mojaslika:string = "";
  base64Output : string = "";
  ime:string = "";
  prezime: string = "";
  adresa: string = "";
  kontakt:string = "";
  broj_licence:number = 0;
  specijalizacija:string = "";

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

  azurirajPodatke(){
    if(this.ime == ""){
      this.ime = this.lekar.ime
    }
    if(this.prezime == ""){
      this.prezime = this.lekar.prezime
    }
    if(this.adresa == ""){
      this.adresa = this.lekar.adresa
    }
    if(this.kontakt == ""){
      this.kontakt = this.lekar.kontakt
    }
    if(this.broj_licence == 0){
      this.broj_licence = this.lekar.broj_licence
    }
    if(this.specijalizacija == ""){
      this.specijalizacija = this.lekar.specijalizacija
    }
    if(this.slika == ""){
      this.slika = this.lekar.profilna_slika
    }
    this.userService.azurirajLekara(this.lekar.korisnicko_ime,this.ime, this.prezime, this.adresa, this.kontakt, this.broj_licence, this.specijalizacija, this.slika).subscribe()
    this.router.navigate(['menadzer']);
  }

}
