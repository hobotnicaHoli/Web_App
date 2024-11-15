import { Component, OnInit } from '@angular/core';
import ZahtevZaRegistraciju from '../models/zahtevizaregistraciju';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Zahtevzapregled from '../models/zahtevzapregled';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.css']
})
export class ZahteviComponent implements OnInit{
  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'menadzer'){
      this.router.navigate([''])
    }
    this.userService.dohvatiZahteve().subscribe((z:ZahtevZaRegistraciju[])=>{
      z.forEach(zah=>{
        if(zah.status == "naCekanju"){
          this.zahtevizareg.push(zah);
        }
      })
    })
    this.userService.dohvatiZahtevezap().subscribe((z:Zahtevzapregled[])=>{
      this.zahtevizap = z;
    })
  }

  zahtevizareg:ZahtevZaRegistraciju[] = []
  zahtevizap:Array<Zahtevzapregled>
  prihvati(zahtev:ZahtevZaRegistraciju){
    let status = "prihvacen"
    this.userService.promeniStatusZahtevu(zahtev.korisnicko_ime, status).subscribe()
    this.userService.dodajKorisnika(zahtev.korisnicko_ime, zahtev.lozinka, zahtev.ime, zahtev.prezime, zahtev.adresa, zahtev.kontakt, zahtev.email, zahtev.profilna_slika).subscribe()
    window.location.reload();
  }

  odbij(zahtev:ZahtevZaRegistraciju){
    let status = "odbijen"
    this.userService.promeniStatusZahtevu(zahtev.korisnicko_ime, status).subscribe()
    window.location.reload();
  }

  prihvatanje(zahtev:Zahtevzapregled){
    this.userService.dodajPregled(zahtev.naziv, zahtev.cena, zahtev.trajanje, zahtev.specijalizacija).subscribe();
    this.userService.izbrisiZahtev(zahtev.naziv).subscribe();
    window.location.reload();
  }
  odbijanje(zahtev:Zahtevzapregled){
    this.userService.izbrisiZahtev(zahtev.naziv).subscribe();
    window.location.reload();
  }

  odjava(){
    localStorage.removeItem("ulogovanmenadzer");
    sessionStorage.removeItem("tip");
    this.router.navigate(['loginmenadzera'])
  }

}
