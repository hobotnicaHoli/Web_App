import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Menadzer from '../models/menadzer';

@Component({
  selector: 'app-loginmenadzera',
  templateUrl: './loginmenadzera.component.html',
  styleUrls: ['./loginmenadzera.component.css']
})
export class LoginmenadzeraComponent implements OnInit{
  constructor(private userService:UserService, private router:Router){}
  ngOnInit(): void {
    
  }

  usernamem:string = "";
  passwordm:string = "";
  error:string = "";


  login(){
    if(this.usernamem == "" || this.passwordm == ""){
      this.error = "Niste uneli sve podatke."
      return
    }
    this.error = ""
    this.userService.loginMenadzera(this.usernamem, this.passwordm).subscribe((m:Menadzer)=>{
      if(!m){
        this.error = "Niste uneli dobre podatke."
        return
      }
      localStorage.setItem("ulogovanmenadzer", m.korisnicko_ime);
      sessionStorage.setItem("tip", 'menadzer');
      this.router.navigate(['menadzer'])
    })
  }
}
