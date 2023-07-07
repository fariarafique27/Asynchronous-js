const input = document.getElementById("searchInput");
const submitbutton = document.getElementById("submitbtn");
const output = document.getElementById("output");
const tOutput = document.getElementById("Translate-output");

function getAyah(ayahnumber) {
  const request = new XMLHttpRequest();
  const request2 = new XMLHttpRequest();

  request.open("GET", `http://api.alquran.cloud/v1/ayah/${ayahnumber}`);
  request2.open("GET", `http://api.alquran.cloud/v1/ayah/${ayahnumber}/en.asad`);

  request.send();
  request2.send();

  request.addEventListener("load", function () {
    const response = JSON.parse(this.responseText);
    const ayah = response.data.text;
    output.innerText = ayah;
  });

  request2.addEventListener("load", function () {
    const response = JSON.parse(this.responseText);
    const ayah = response.data.text;
    tOutput.innerText = ayah;
  });
}

submitbutton.addEventListener("click", function (e) {
  e.preventDefault();
  const ayahnumber = input.value;
  getAyah(ayahnumber);
});
