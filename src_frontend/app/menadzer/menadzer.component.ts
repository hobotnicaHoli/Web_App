import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'menadzer'){
      this.router.navigate([''])
    }
    this.userService.dohvatiLekare().subscribe((l:Korisnik[])=>{
      this.lekari = l;
    })
    this.userService.dohvatiPacijente().subscribe((p:Korisnik[])=>{
      this.pacijenti = p;
    })
  }

  pacijenti:Array<Korisnik>
  lekari:Array<Korisnik>

  brisanje(korisnik:Korisnik){
    this.userService.brisanjeKorisnika(korisnik.korisnicko_ime).subscribe();
    window.location.reload();
  }

  azurirajpacijenta(korisnik:Korisnik){
    localStorage.setItem("apacijent", korisnik.korisnicko_ime);
    this.router.navigate(['menadzer.azuriranjepacijenta']);
  }
  azurirajlekara(korisnik:Korisnik){
    localStorage.setItem("alekar", korisnik.korisnicko_ime);
    this.router.navigate(['menadzer.azuriranje']);
  }

  odjava(){
    localStorage.removeItem("ulogovanmenadzer")
    sessionStorage.removeItem("tip");
    this.router.navigate(['loginmenadzera'])
  }
}

