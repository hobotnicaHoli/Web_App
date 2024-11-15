import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';

@Component({
  selector: 'app-pacijent.lekari',
  templateUrl: './pacijent.lekari.component.html',
  styleUrls: ['./pacijent.lekari.component.css']
})
export class PacijentLekariComponent implements OnInit {

  constructor(private router:Router, private userService:UserService){

  }
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'pacijent'){
      this.router.navigate([''])
    }
    this.userService.dohvatiLekare().subscribe((l:Korisnik[])=>{
      this.lekari = l;
    })
  }

  ime:string = "";
  prezime:string = "";
  specijalizacija:string = "";
  ogranak:string = "";
  lekari:Korisnik[]
  pocemu:string = "";
  kako:string = "";

  sortiranje(){
    if(this.pocemu == "ime"){
      if(this.kako == "rastuce"){
        this.lekari.sort((a, b)=>
        a.ime > b.ime ? 1 : -1)
      }
      else{
        this.lekari.sort((a, b)=>
        a.ime > b.ime ? -1 : 1)
      }
    }
    else if (this.pocemu == "prezime"){
      if(this.kako == "rastuce"){
        this.lekari.sort((a, b)=>
        a.prezime > b.prezime ? 1 : -1)
      }
      else{
        this.lekari.sort((a, b)=>
        a.prezime > b.prezime ? -1 : 1)
      }
    }
    else if(this.pocemu == "specijalizacija"){
      if(this.kako == "rastuce"){
        this.lekari.sort((a, b)=>
        a.specijalizacija > b.specijalizacija ? 1 : -1)
      }
      else{
        this.lekari.sort((a, b)=>
        a.specijalizacija > b.specijalizacija ? -1 : 1)
      }
    }
    else if(this.pocemu == "ogranak"){
      if(this.kako == "rastuce"){
        this.lekari.sort((a, b)=>
        a.ogranak > b.ogranak ? 1 : -1)
      }
      else{
        this.lekari.sort((a, b)=>
        a.ogranak > b.ogranak ? -1 : 1)
      }
    }
  }

  pretraga(){
    this.userService.pretraga(this.ime, this.prezime, this.specijalizacija, this.ogranak).subscribe((l:Korisnik[])=>{
      this.lekari = l;

    })
  }

  stranica(l:Korisnik){
    localStorage.setItem("lekar", l.korisnicko_ime)
    this.router.navigate(['stranicalekara']);
  }

  odjava(){
    localStorage.removeItem("ulogovan");
    sessionStorage.removeItem("tip");
    this.router.navigate(['login'])
  }

}
