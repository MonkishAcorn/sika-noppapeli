let pelaajat = [];

let nykyinenPelaaja = 0;

let kierrosPisteet = 0;

let tuplatPerakkain = 0;

let noppaMaara = 1;

function luoPelaajaKentat() {

  const maara =
    Number(document.getElementById("pelaajaMaara").value);

  const div =
    document.getElementById("pelaajaNimet");

  div.innerHTML = "";

  for (let i = 0; i < maara; i++) {

    div.innerHTML +=
      '<input type="text" id="nimi' + i +
      '" placeholder="Pelaaja ' +
      (i + 1) + '"><br>';
  }
}

function aloitaPeli() {

  pelaajat = [];

  const maara =
    Number(document.getElementById("pelaajaMaara").value);

  for (let i = 0; i < maara; i++) {

    const nimiKentta =
      document.getElementById("nimi" + i);

    let nimi = nimiKentta.value;

    if (nimi.trim() === "") {

      nimi = "Pelaaja " + (i + 1);

    }

    pelaajat.push({
      nimi: nimi,
      pisteet: 0
    });

  }

  noppaMaara =
    Number(document.getElementById("noppaMaara").value);

  if (noppaMaara === 1) {

    document.getElementById("noppa2").style.display =
      "none";

  } else {

    document.getElementById("noppa2").style.display =
      "flex";

  }

  nykyinenPelaaja = 0;
  kierrosPisteet = 0;
  tuplatPerakkain = 0;

  paivitaUI();
}

function heitaNoppaa() {

  if (noppaMaara === 1) {

    yhdenNopanPeli();

  } else {

    kahdenNopanPeli();

  }

}

function yhdenNopanPeli() {

  const noppa =
    Math.floor(Math.random() * 6) + 1;

  document.getElementById("noppa1").textContent =
    noppa;

  if (noppa === 1) {

    kierrosPisteet = 0;

    vaihdaVuoro();

    return;
  }

  kierrosPisteet += noppa;

  paivitaUI();
}

function kahdenNopanPeli() {

  const noppa1 =
    Math.floor(Math.random() * 6) + 1;

  const noppa2 =
    Math.floor(Math.random() * 6) + 1;

  document.getElementById("noppa1").textContent =
    noppa1;

  document.getElementById("noppa2").textContent =
    noppa2;


  if (noppa1 === 1 && noppa2 === 1) {

    kierrosPisteet += 25;

    paivitaUI();

    return;
  }


  if (noppa1 === 1 || noppa2 === 1) {

    kierrosPisteet = 0;

    tuplatPerakkain = 0;

    vaihdaVuoro();

    return;
  }


  if (noppa1 === noppa2) {

    tuplatPerakkain++;

    kierrosPisteet +=
      (noppa1 + noppa2) * 2;

    if (tuplatPerakkain >= 3) {

      kierrosPisteet = 0;

      tuplatPerakkain = 0;

      vaihdaVuoro();

      return;
    }

  } else {

    tuplatPerakkain = 0;

    kierrosPisteet +=
      noppa1 + noppa2;

  }

  paivitaUI();
}

function pidaPisteet() {

  pelaajat[nykyinenPelaaja].pisteet +=
    kierrosPisteet;

  if (
    pelaajat[nykyinenPelaaja].pisteet >= 100
  ) {

    alert(
      pelaajat[nykyinenPelaaja].nimi +
      " voitti pelin!"
    );

    location.reload();
  }

  kierrosPisteet = 0;

  tuplatPerakkain = 0;

  vaihdaVuoro();
}

function vaihdaVuoro() {

  nykyinenPelaaja++;

  if (nykyinenPelaaja >= pelaajat.length) {

    nykyinenPelaaja = 0;

  }

  paivitaUI();
}

function paivitaUI() {

  if (pelaajat.length === 0) {
    return;
  }

  document.getElementById("vuoro").textContent =
    "Vuoro: " +
    pelaajat[nykyinenPelaaja].nimi;

  document.getElementById("kierrosPisteet").textContent =
    kierrosPisteet;

  const div =
    document.getElementById("pelaajat");

  div.innerHTML = "";

  pelaajat.forEach((pelaaja, index) => {

    const el =
      document.createElement("div");

    el.className = "pelaaja";

    el.innerHTML =
      "<strong>" +
      pelaaja.nimi +
      "</strong><br>" +
      "Pisteet: " +
      pelaaja.pisteet;

    if (index === nykyinenPelaaja) {

      el.style.border =
        "2px solid yellow";

    }

    div.appendChild(el);

  });

}

luoPelaajaKentat();