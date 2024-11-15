import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';

@Component({
  selector: 'app-lekar.razno',
  templateUrl: './lekar.razno.component.html',
  styleUrls: ['./lekar.razno.component.css']
})
export class LekarRaznoComponent implements OnInit{
  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'lekar'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("ulogovan")).subscribe((k:Korisnik)=>{
      this.specijalizacija = k.specijalizacija;
    })
  }

  naziv:string = "";
  cena:number;
  trajanje:number;
  specijalizacija:string = "";

  slanjezahteva(){
    this.userService.dodajZahtevMenadzeru(this.specijalizacija, this.naziv, this.cena, this.trajanje).subscribe();
    window.location.reload();
  }

  odjava(){
    localStorage.removeItem("ulogovan");
    sessionStorage.removeItem("tip");
    this.router.navigate(['login'])
  }

}
