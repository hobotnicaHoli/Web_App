import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Korisnik from '../models/korisnik';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
})
export class PocetnaComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){

  }
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != null){
      this.ulogovan = true;
      this.stranica = sessionStorage.getItem("tip")
    }
    else{
      this.ulogovan = false;
    }
    
    this.userService.dohvatiLekare().subscribe((l:Korisnik[])=>{
      this.lekari = l;
    })
  }

  stranica:string;
  ulogovan:boolean = false;
  ime:string = "";
  prezime:string = "";
  specijalizacija:string = "";
  lekari:Korisnik[]
  pocemu:string = "";
  kako:string = "";
  ogranak:string = "";

  prebacivanjeNaLogin(){
    this.router.navigate(['login'])
  }


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
  }

  pretraga(){
    this.userService.pretraga(this.ime, this.prezime, this.specijalizacija, this.ogranak).subscribe((l:Korisnik[])=>{
      this.lekari = l;

    })
  }

  loginmenadzera(){
    this.router.navigate(['loginmenadzera'])
  }
}
