document.addEventListener("DOMContentLoaded", function () {
  const tombolMenu = document.getElementById("tombol-menu");
  const menuNavigasi = document.querySelector(".nav-links");

  tombolMenu.addEventListener("click", function () {
    menuNavigasi.classList.toggle("tampil");
  });

  const kartuSpesialisasi = document.querySelectorAll(".card");
  kartuSpesialisasi.forEach(function (kartu) {
    kartu.addEventListener("click", function () {
      kartuSpesialisasi.forEach((k) => k.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const tombolCari = document.getElementById("tombol-cari");
  const inputPencarian = document.getElementById("input-pencarian");

  tombolCari.addEventListener("click", function () {
    if (inputPencarian.value.trim() === "") {
      alert("Masukkan kata kunci pencarian terlebih dahulu.");
    } else {
      alert("Mencari: " + inputPencarian.value);
    }
  });
});
