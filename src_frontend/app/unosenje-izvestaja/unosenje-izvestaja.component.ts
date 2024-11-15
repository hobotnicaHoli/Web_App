import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';

@Component({
  selector: 'app-unosenje-izvestaja',
  templateUrl: './unosenje-izvestaja.component.html',
  styleUrls: ['./unosenje-izvestaja.component.css']
})
export class UnosenjeIzvestajaComponent implements OnInit{
  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'lekar'){
      this.router.navigate([''])
    }
    this.datum = localStorage.getItem("datumizvestaj")
    this.vreme = localStorage.getItem("vremeizvestaj")
    this.pacijent = localStorage.getItem("pacijentizvestaj")
    this.userService.dohvatiKorisnika(localStorage.getItem("ulogovan")).subscribe((k:Korisnik)=>{
      this.lekar = k.ime
      this.specijalizacija = k.specijalizacija
    })
  }

  pacijent:string = "";
  datum:string = "";
  vreme:string = "";
  lekar:string = "";
  specijalizacija:string = "";
  razlog:string = "";
  dijagnoza:string = "";
  terapija:string = "";
  datum_narednog:Date;
  poruka:string = ""

  unosenje(){
    if(this.razlog == "" || this.dijagnoza == "" || this.terapija == ""){
      this.poruka = "Niste uneli sve podatke."
      return;
    }
    this.poruka  = ""
    let datumn = this.datum_narednog.toString()
    this.userService.unosenjeIzvestaja(this.pacijent, this.datum, this.vreme, this.lekar, this.specijalizacija, this.razlog, this.dijagnoza, this.terapija, datumn).subscribe()
    this.router.navigate(['kartoni']);
  }

}
