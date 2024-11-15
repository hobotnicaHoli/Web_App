import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';
import { Observable, ReplaySubject } from 'rxjs';
import Specijalizacija from '../models/specijalizacija';
import Pregled from '../models/pregled';
import PregledMenadzera from '../models/pregledmenadzera';

@Component({
  selector: 'app-dodavanjelekara',
  templateUrl: './dodavanjelekara.component.html',
  styleUrls: ['./dodavanjelekara.component.css']
})
export class DodavanjelekaraComponent implements OnInit{
  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'menadzer'){
      this.router.navigate([''])
    }
    this.userService.dohvatiSpecijalizacije().subscribe((s:Specijalizacija[])=>{
        this.specijalizacije = s;
        this.specijalizacije.forEach(s=>{
          this.userService.dohvatiSvePreglede(s.naziv).subscribe((p:PregledMenadzera[])=>{
            p.forEach(pr=>{
              this.pregledi.push(pr)
            })
          })
        })
    })
    this.userService.dohvatiLekare().subscribe((l:Korisnik[])=>{
      this.lekari = l;
    })
  }

  specijalizacije:Array<Specijalizacija>
  slika:string = "";
  lekari:Array<Korisnik>
  mojaslika:string = "";
  base64Output : string = "";
  ime:string = "";
  prezime: string = "";
  adresa: string = "";
  kontakt:string = "";
  broj_licence:number = 0;
  specijalizacija:string = "";
  ogranak:string = "";
  email:string = "";
  korisnicko_ime:string = "";
  lozinka:string = "";
  nazivspec:string = "";
  greska1:string = "";
  greska2:string = "";
  pregledi:PregledMenadzera[]= []
  naziv:string = "";
  cena:number;
  trajanje:number;
  usluge:Array<Pregled>
  
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

  dodajlekara(){
    if(this.korisnicko_ime == "" || this.lozinka == "" || this.ime == "" || this.prezime == "" || this.adresa == "" || this.email == "" || this.specijalizacija == "" || this.ogranak == "" || this.broj_licence == 0){
      this.greska1 = "Niste uneli sve podatke."
      return;
    }
    let index = 0;
    let last = this.lozinka.length - 1;
    while(index != last){
      if(this.lozinka[index] == this.lozinka[index+1]){
        this.greska1 = "Lozinka sadrzi dva susedna identicna karaktera, to nije dozvoljeno.";
        return;
      }
      index = index + 1;
    }
    let slova="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    slova.split("");
    if(!slova.includes(this.lozinka[0])){
      this.greska1 = "Lozinka mora zapocinjati slovom.";
      return;
    }
    let cnt = 0;
    this.brojevi.forEach(b=>{
      if(this.lozinka.includes(b)){
        cnt++
      }
    })
    if(cnt < 1){
      this.greska1 = "Lozinka mora sadrzati makar 1 broj.";
      return;
    }
    cnt = 0;
    this.mala_slova.forEach(m=>{
      if(this.lozinka.includes(m)){
        cnt++;
      }
    })
    if(cnt < 1){
      this.greska1 = "Lozinka mora sadrzati makar 1 malo slovo.";
      return;
    }
    cnt = 0;
    this.velika_slova.forEach(v=>{
      if(this.lozinka.includes(v)){
        cnt++;
      }
    })
    if(cnt < 1){
      this.greska1 = "Lozinka mora sadrzati makar 1 veliko slovo.";
      return;
    }
    cnt = 0;
    this.specialchars.forEach(element => {
      if(this.lozinka.includes(element)){
        cnt = 1;
      }
    })
    if(cnt < 1){
      this.greska1 = "Lozinka mora sadrzati makar 1 specijalni karakter";
      return;
    }
    if(this.lozinka.length < 8 || this.lozinka.length > 14){
      this.greska1 = "Lozinka mora biti duzine izmedju 8 i 14 karaktera";
      return;
    }
    this.greska1 = ""
    if(this.slika == ""){
      this.slika = "data:image/jpeg;base64,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"
    }
    this.userService.dodajLekara(this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.adresa, this.kontakt, this.email, this.broj_licence, this.specijalizacija, this.ogranak, this.slika).subscribe();
    window.location.reload();
  }

  dodajspec(){
    if(this.nazivspec == ""){
      this.greska2 = "Niste uneli sve podatke."
      return;
    }
    this.greska2 = ""
    this.userService.dodajSpec(this.nazivspec).subscribe();
    window.location.reload();
  }

  odjava(){
    localStorage.removeItem("ulogovanmenadzer");
    sessionStorage.removeItem("tip");
    this.router.navigate(['loginmenadzera'])
  }

  azurirajpregled(p:PregledMenadzera){
    localStorage.setItem("apregled", p.naziv);
    this.router.navigate(['azuriranjepregleda'])
  }

  obrisipregled(p:PregledMenadzera){
    this.lekari.forEach(l=>{
      this.usluge = l.usluge
      this.usluge.forEach(u=>{
        if(u.naziv == p.naziv){
          //u.obrisan = "da"
          //this.userService.otkaziPregledLekaru(l.korisnicko_ime, p.naziv, p.trajanje, p.cena).subscribe()
          return;
        }
      })
    })

    this.userService.brisanjePregleda(p.naziv).subscribe()
    window.location.reload()
  }

  dodaj(s:Specijalizacija){
    this.userService.dodajPregled(this.naziv, this.cena, this.trajanje, s.naziv).subscribe()
    window.location.reload();
  }

}
