import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';
import Menadzer from '../models/menadzer';

@Component({
  selector: 'app-promenalozinkemenadzer',
  templateUrl: './promenalozinkemenadzer.component.html',
  styleUrls: ['./promenalozinkemenadzer.component.css']
})
export class PromenalozinkemenadzerComponent implements OnInit{
  constructor(private userService:UserService, private router:Router){}
  ngOnInit(): void {
    this.userService.dohvatiMenadzera(localStorage.getItem("ulogovanmenadzer")).subscribe((m:Menadzer)=>{
      this.mojalozinka = m.lozinka;
    })
  }


  error:string="";
  stara:string="";
  nova1:string = "";
  nova2:string = "";
  mojalozinka:string="";
  
  mala_slova:string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  velika_slova:string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]
  specialchars:string[] = [
      '!', '@', '#', '$', '%', '^', '&', '*',
      '-', '_', '=', '+', ';', ':', ',', '.', '<', '>', '?', '/'
  ]
  brojevi:string[] = [
      '1','2','3','4','5','6','7','8','9','0'
  ]
  promena(){
    
    if(this.nova1 == "" || this.nova2 == "" || this.stara == ""){
      this.error = "Niste popunili sva polja."
      return;
    }
    if(this.nova1 != this.nova2){
      this.error = "Nova lozinka se ne poklapa sa ponovljenim ispisom.";
      return;
    }
    if(this.mojalozinka != this.stara){
      this.error = "Niste dobro uneli staru lozinku.";
      return;
    }
    let index = 0;
    let last = this.nova1.length - 1;
    while(index != last){
      if(this.nova1[index] == this.nova1[index+1]){
        this.error = "Postoje dva susedna identicna karaktera, to nije dozvoljeno.";
        return;
      }
      index = index + 1;
    }
    let slova="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    slova.split("");
    if(!slova.includes(this.nova1[0])){
      this.error = "Lozinka mora zapocinjati slovom.";
      return;
    }
    let cnt = 0;
    this.brojevi.forEach(b=>{
      if(this.nova1.includes(b)){
        cnt++
      }
    })
    if(cnt < 1){
      this.error = "Lozinka mora sadrzati makar 1 broj.";
      return;
    }
    cnt = 0;
    this.mala_slova.forEach(m=>{
      if(this.nova1.includes(m)){
        cnt++;
      }
    })
    if(cnt < 1){
      this.error = "Lozinka mora sadrzati makar 1 malo slovo.";
      return;
    }
    cnt = 0;
    this.velika_slova.forEach(v=>{
      if(this.nova1.includes(v)){
        cnt++;
      }
    })
    if(cnt < 1){
      this.error = "Lozinka mora sadrzati makar 1 veliko slovo.";
      return;
    }
    cnt = 0;
    ////////////////NE RADI/////////////////////////
    this.specialchars.forEach(element => {
      if(this.nova1.includes(element)){
        cnt = 1;
      }
    })
    if(cnt < 1){
      this.error = "Lozinka mora sadrzati makar 1 specijalni karakter";
      return;
    }
    if(this.nova1.length < 8 || this.nova1.length > 14){
      this.error = "Lozinka mora biti duzine izmedju 8 i 14 karaktera";
      return;
    }

    this.userService.promeniLozinkuMenadzeru(localStorage.getItem("ulogovanmenadzer"), this.nova1).subscribe();
    this.router.navigate(['loginmenadzera']);

  }
}
