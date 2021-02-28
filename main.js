const ime = document.getElementById("name");
const prezime = document.getElementById("lastName");
const datumRodjenja = document.getElementById("datum");
const tableTbody = document.querySelector(".table-tbody");
var trash =
  "<td><span><i onclick = 'removeRow(this)' title = 'Delete' class='far fa-trash-alt'></i></span></td>";
var edit =
  "<td><span><i onclick = 'editInputValue(this)' title = 'Edit' class='far fa-edit'></i></span></td>";
var check =
  "<td><span><i onclick = 'checkToConfirm(this)' ondblclick = 'dubleClick(this)' title = 'Check' class='fas fa-check'></i></span></td>";
const izmjenjenoIme = document.getElementById("nameModal");
const izmjenjenoPrezime = document.getElementById("lastNameModal");
const izmjenjenoDatum = document.getElementById("datumModal");
var selectedRow = "";
var table = document.querySelectorAll(".table");
var myModalHusein = new bootstrap.Modal(document.getElementById("myModal"));
//var openModal = document.getElementById("myModal");
porodica = [];
var brojPorodice = document.querySelector(".prikazUkupnoClanova");
var danasnjDatum = new moment();
//definisanje vrijednosti inputa i ubacivanje ikona u tabelu
function dodajClana() {
  if (ime.value == "" || prezime.value == "" || datumRodjenja.value == "") {
    alert("Unesite sve potrebne podatke: Ime, prezime, datum rođenja!!!");
  } else if (danasnjDatum < new moment(datumRodjenja.value)) {
    alert("Potrebno je da unesete datum ne mlađi od današnjeg !!!");
  } else {
    var ispis = racunjanjeDatuma(datumRodjenja.value);
    brojClanovaPorodice();
    var row =
      "<tr><td>" +
      ime.value +
      "</td><td>" +
      prezime.value +
      "</td><td>" +
      datumRodjenja.value +
      "</td><td>" +
      ispis +
      "</td>" +
      trash +
      edit +
      check +
      "</tr>";
    var novi = tableTbody.innerHTML + row;
    tableTbody.innerHTML = novi;
    obrisiVrijednosti();
    console.table(porodica);
  }
}
//razlika datuma u godinama između zadatog i današnjeg datuma
function racunjanjeDatuma(param1) {
  var momentDatumRodjenja = new moment(param1);

  var razlikaVrmenaUms = moment.duration(
    danasnjDatum.diff(momentDatumRodjenja)
  );

  var godina = Math.floor(razlikaVrmenaUms.asYears());
  var mjesec = razlikaVrmenaUms.months();
  var dani = razlikaVrmenaUms.days();

  var ispis = "Y " + godina + " M " + mjesec + " D " + dani;

  return ispis;
}
//koliko ima članova porodice
function brojClanovaPorodice() {
  porodica.push({
    ime: ime.value,
    prezime: prezime.value,
    datumRodjenja: datumRodjenja.value,
  });

  brojPorodice.innerText = porodica.length;
}

function obrisiVrijednosti() {
  ime.value = "";
  prezime.value = "";
  datumRodjenja.value = "";
}
//brisanje niza ZAVRŠIO
function removeRow(i) {
  var obrisiChild = i.parentNode.parentNode.parentNode;
  // var parent = document.querySelector(".table-tbody");
  // parent.removeChild(obrisiChild);
  // ili ova gore ili dole:-)
  i.closest("tr").remove();
  // console.log(obrisiChild);
  /* console.log(obrisiChild.childNodes[0]);
  console.log(porodica);
  console.log(obrisiChild);
  PROVJERITI ŠTA MI POKAZUJE ZA PARENTNODE REDOSLIJED*/
  // console.log(parent);
  var obrisiTr = i.parentNode.parentNode.parentNode;
  var obrisiTrIme = obrisiTr.childNodes[0].innerText;
  var obrisiTrPrezime = obrisiTr.childNodes[1].innerText;
  console.log(obrisiTrIme);
  // console.log(obrisiTrPrezime);
  realniPrikaziBrojClanova(obrisiTrIme, obrisiTrPrezime);
}

//označavanje žutom bojom selektovanog reda
function checkToConfirm(i) {
  var obojiClana = i.parentNode.parentNode.parentNode;
  i.closest("tr").style.backgroundColor = "#ccb399";
}

function dubleClick(i) {
  var obojiClana = i.parentNode.parentNode.parentNode;
  i.closest("tr").style.backgroundColor = "#f4f4f4";
}

//brisanje broja članova iz porodice MORAM UZETI removeRow funkciju
function realniPrikaziBrojClanova(obrisanoIme, obrisiTrPrezime) {
  for (i = 0; i < porodica.length; i++) {
    console.log(porodica[i].ime);
    if (
      porodica[i].ime == obrisanoIme &&
      porodica[i].prezime == obrisiTrPrezime
    ) {
      porodica.splice(i, 1);
      break;
    }
  }
  brojPorodice.innerText = porodica.length;
}

//EDITOVANJE VRIJEDNOSTI KROZ MODAL
function editInputValue(i) {
  myModalHusein.show();
  selectedRow = i;
  //$(openModal).modal("show"); ovo je jQery radi isto ****
  var edituj = i.parentNode.parentNode.parentNode;
  var editujTrIme = edituj.childNodes[0].innerText;
  var editTrPrezime = edituj.childNodes[1].innerText;
  var editujTrDadum = edituj.childNodes[2].innerText;
  izmjenjenoIme.value = editujTrIme;
  izmjenjenoPrezime.value = editTrPrezime;
  izmjenjenoDatum.value = editujTrDadum;
}
function promjenaVrijednostiInpute() {
  var edituj = selectedRow.parentNode.parentNode.parentNode;
  var editujTrIme = edituj.childNodes[0];
  var editTrPrezime = edituj.childNodes[1];
  var editujTrDadum = edituj.childNodes[2];
  var editujStarost = edituj.childNodes[3];
  var ispis = racunjanjeDatuma(izmjenjenoDatum.value);

  // izmjenjenoIme = editujTrIme;
  // table.refresh();
  editujTrIme.innerHTML = izmjenjenoIme.value;
  editTrPrezime.innerHTML = izmjenjenoPrezime.value;
  editujTrDadum.innerHTML = izmjenjenoDatum.value;
  editujStarost.innerHTML = ispis;
  myModalHusein.hide();
  console.log(ispis);
}

//treba podesiti da se i datum mjenja prilikom editovanja
