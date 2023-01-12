const { application } = require("express");
const express = require("express");
const db = require("better-sqlite3")("database.db", {verbose: console.log});
const hbs = require("hbs");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "www")));
app.use(express.urlencoded({extended: true}))

// app.set("view engine", hbs);
// app.set("views", path.join(__dirname, "./views/pages"))
// hbs.registerPartials(path.join(__dirname, "./views/partials"))


app.post("/settinn", (req, res) => {
    console.log(req.body)
    let svar = req.body
    let avgift = 0;

    if (svar.avgift == "on") {
         avgift = 1
    } else {
        avgift = 0
    }
    settInnMedlem(svar.fornavn, svar.etternavn, svar.gateadresse, svar.postnummer, svar.poststed, avgift, svar.fodselsdato)
    res.redirect("back")
})


let medlemmer = db.prepare("SELECT * FROM medlemmer WHERE fornavn = ?");
medlemmer = medlemmer.all(1);

function settInnMedlem(fornavn, etternavn, gateadresse, postnummer, poststed, avgift, fodselsdato) {
    let settInnMedlem = db.prepare("INSERT INTO medlemmer (fornavn, etternavn, gateadresse, postnummer, poststed, avgift, fodselsdato) VALUES (?, ?, ?, ?, ?, ?, ?)")
    settInnMedlem.run(fornavn, etternavn, gateadresse, postnummer, poststed, avgift, fodselsdato)
}

settInnMedlem()

//

console.log(medlemmer)
app.listen(3000, () => {
    console.log("Sørver køyrer")
})


