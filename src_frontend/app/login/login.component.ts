import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private userService:UserService, private router:Router){}
  ngOnInit(): void {
    
  }

  username:string = "";
  password:string = "";
  tip:string = "";
  error:string = "";


  login(){
    if(this.username == "" || this.password == "" || this.tip == ""){
      this.error = "Niste uneli sve podatke."
      return
    }
    this.userService.login(this.username, this.password, this.tip).subscribe((k:Korisnik)=>{
      if(!k){
        this.error = "Niste uneli dobre podatke."
        return
      }
      if(k.tip == 'lekar'){
        localStorage.setItem("ulogovan", k.korisnicko_ime)
        sessionStorage.setItem("tip", 'lekar')
        this.router.navigate(['lekar'])
        
      }
      else{
        localStorage.setItem("ulogovan", k.korisnicko_ime)
        sessionStorage.setItem("tip", 'pacijent')
        this.router.navigate(['pacijent'])
      }
    })
  }

  registracija(){
    this.router.navigate(['registracija'])
  }

}
