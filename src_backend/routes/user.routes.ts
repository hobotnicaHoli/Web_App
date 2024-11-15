import express from 'express'
import UserController from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route('/dohvatiLekare').post(
    (req, res)=>new UserController().dohvatiLekare(req, res)
)

userRouter.route('/dohvatiPacijente').post(
    (req, res)=>new UserController().dohvatiPacijente(req, res)
)

userRouter.route('/dohvatiKorisnika').post(
    (req, res)=>new UserController().dohvatiKorisnika(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res)=>new UserController().promeniLozinku(req, res)
)


userRouter.route('/dohvatiZahteve').post(
    (req, res)=>new UserController().dohvatiZahteve(req, res)
)



userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/pretraga').post(
    (req, res)=>new UserController().pretraga(req, res)
)

userRouter.route('/registrovanje').post(
    (req, res)=>new UserController().registrovanje(req, res)
)

userRouter.route('/azurirajPodatke').post(
    (req, res)=>new UserController().azurirajPodatke(req, res)
)

userRouter.route('/azurirajLekara').post(
    (req, res)=>new UserController().azurirajLekara(req, res)
)

userRouter.route('/dohvatiSvePreglede').post(
    (req, res)=>new UserController().dohvatiSvePreglede(req, res)
)

userRouter.route('/dodajPregledLekaru').post(
    (req, res)=>new UserController().dodajPregledLekaru(req, res)
)

userRouter.route('/otkaziPregledLekaru').post(
    (req, res)=>new UserController().otkaziPregledLekaru(req, res)
)

userRouter.route('/dodajZahtevMenadzeru').post(
    (req, res)=>new UserController().dodajZahtevMenadzeru(req, res)
)

userRouter.route('/otkazivanjeZakazanogPregleda').post(
    (req, res)=>new UserController().otkazivanjeZakazanogPregleda(req, res)
)

userRouter.route('/brisanjeKorisnika').post(
    (req, res)=>new UserController().brisanjeKorisnika(req, res)
)


userRouter.route('/dodajLekara').post(
    (req, res)=>new UserController().dodajLekara(req, res)
)


  userRouter.route('/promeniStatusZahtevu').post(
    (req, res)=>new UserController().promeniStatusZahtevu(req, res)
)

userRouter.route('/dodajKorisnika').post(
    (req, res)=>new UserController().dodajKorisnika(req, res)
)

userRouter.route('/dohvatiZahtevezap').post(
    (req, res)=>new UserController().dohvatiZahtevezap(req, res)
)

userRouter.route('/izbrisiZahtev').post(
    (req, res)=>new UserController().izbrisiZahtev(req, res)
)

userRouter.route('/dodajPregled').post(
    (req, res)=>new UserController().dodajPregled(req, res)
)

userRouter.route('/loginMenadzera').post(
    (req, res)=>new UserController().loginMenadzera(req, res)
)

userRouter.route('/dohvatiMenadzere').post(
    (req, res)=>new UserController().dohvatiMenadzere(req, res)
)

userRouter.route('/dohvatiSpecijalizacije').post(
    (req, res)=>new UserController().dohvatiSpecijalizacije(req, res)
)

userRouter.route('/dodajSpec').post(
    (req, res)=>new UserController().dodajSpec(req, res)
)

userRouter.route('/brisanjePregleda').post(
    (req, res)=>new UserController().brisanjePregleda(req, res)
)

userRouter.route('/dohvPregled').post(
    (req, res)=>new UserController().dohvPregled(req, res)
)

userRouter.route('/azurirajPregled').post(
    (req, res)=>new UserController().azurirajPregled(req, res)
)

userRouter.route('/promeniLozinkuMenadzeru').post(
    (req, res)=>new UserController().promeniLozinkuMenadzeru(req, res)
)

userRouter.route('/dohvatiMenadzera').post(
    (req, res)=>new UserController().dohvatiMenadzera(req, res)
)

userRouter.route('/zakaziPregled').post(
    (req, res)=>new UserController().zakaziPregled(req, res)
)

//this.userService.izvestajTrue(this.pacijent.korisnicko_ime, z.naziv, z.datum, z.vreme).subscribe()
userRouter.route('/izvestajTrue').post(
    (req, res)=>new UserController().izvestajTrue(req, res)
)

//this.userService.unosenjeIzvestaja(this.pacijent, this.datum, this.vreme, this.lekar, this.specijalizacija, this.razlog, this.dijagnoza, this.terapija, datumn).subscribe()
userRouter.route('/unosenjeIzvestaja').post(
    (req, res)=>new UserController().unosenjeIzvestaja(req, res)
)

  //this.userService.azurirajPregledLekaru(l.korisnicko_ime, u.naziv, u.cena, u.trajanje).subscribe()
  userRouter.route('/azurirajPregledLekaru').post(
    (req, res)=>new UserController().azurirajPregledLekaru(req, res)
)

export default userRouter