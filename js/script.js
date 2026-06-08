document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const tombolMenu = document.getElementById("tombol-menu");
  const menuNavigasi = document.querySelector(".nav-links");

  if (tombolMenu && menuNavigasi) {
    tombolMenu.addEventListener("click", function () {
      menuNavigasi.classList.toggle("tampil");
    });

    // Close menu when a link is clicked
    const tautanNavigasi = menuNavigasi.querySelectorAll("a");
    tautanNavigasi.forEach(tautan => {
      tautan.addEventListener("click", () => {
        menuNavigasi.classList.remove("tampil");
      });
    });
  }

  // Specialty Cards Selection
  const kartuSpesialisasi = document.querySelectorAll(".card");
  kartuSpesialisasi.forEach(function (kartu) {
    kartu.addEventListener("click", function () {
      kartuSpesialisasi.forEach((k) => k.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Testimoni Carousel
  const wadahTestimoni = document.getElementById('wadah-testimoni');
  const btnKiri = document.getElementById('geser-kiri');
  const btnKanan = document.getElementById('geser-kanan');

  if (wadahTestimoni && btnKiri && btnKanan) {
    // Lebar 1 kartu (249px) + gap (20px) = 269px
    const scrollAmount = 269;

    btnKanan.addEventListener('click', () => {
      wadahTestimoni.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    btnKiri.addEventListener('click', () => {
      wadahTestimoni.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // Search Logic (Hero)
  const tombolCari = document.querySelector(".btn-search-icon");
  const inputPencarian = document.querySelector(".search-input-field input");

  if (tombolCari && inputPencarian) {
    tombolCari.addEventListener("click", function () {
      if (inputPencarian.value.trim() === "") {
        alert("Masukkan kata kunci pencarian terlebih dahulu.");
      } else {
        alert("Mencari: " + inputPencarian.value);
      }
    });
  }
});
