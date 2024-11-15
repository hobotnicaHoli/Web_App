import Pregled from "./pregled";
import Zakazanipregled from "./zakazanipregled";
import Izvestaj from "./izvestaj";

export default class Korisnik{
    korisnicko_ime:string;
    lozinka:string;
    ime:string;
    prezime:string;
    adresa:string;
    kontakt:string;
    email:string;
    tip:string;
    broj_licence:number;
    specijalizacija:string;
    ogranak:string;
    profilna_slika:string;
    usluge:Array<Pregled>;
    pregledi:Array<Zakazanipregled>;
    izvestaji:Array<Izvestaj>
}