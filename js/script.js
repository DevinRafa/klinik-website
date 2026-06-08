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

  // Stacked Carousel (Mobile)
  const gridSpesialisasi = document.querySelector(".specialty-grid");
  const wadahDots = document.querySelector(".specialty-dots");
  let startX = 0;
  let indexSpesialisasi = Array.from(kartuSpesialisasi).findIndex(card => card.classList.contains("active"));
  if (indexSpesialisasi === -1) indexSpesialisasi = 0;
  
  let isDragging = false;
  let isAnimating = false;
  
  const cekMobile = () => window.innerWidth <= 768;

  function buatDots() {
    if (!wadahDots) return;
    wadahDots.innerHTML = "";
    kartuSpesialisasi.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === indexSpesialisasi) dot.classList.add("active");
      dot.addEventListener("click", () => {
        if (isAnimating || !cekMobile() || i === indexSpesialisasi) return;
        indexSpesialisasi = i;
        renderMobileStack();
      });
      wadahDots.appendChild(dot);
    });
  }

  function renderMobileStack() {
    if (!cekMobile()) {
      if (wadahDots) wadahDots.style.display = "none";
      kartuSpesialisasi.forEach(card => {
        card.style.cssText = "";
        card.classList.remove("mobile-active");
      });
      return;
    }

    if (wadahDots) wadahDots.style.display = "flex";
    
    kartuSpesialisasi.forEach((card, i) => {
      card.style.cssText = "transition: all 0.4s ease;";
      if (i === indexSpesialisasi) {
        card.classList.add("mobile-active");
      } else {
        card.classList.remove("mobile-active");
      }
    });

    // Update dots
    const dots = document.querySelectorAll(".specialty-dots .dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === indexSpesialisasi);
    });
  }

  if (gridSpesialisasi) {
    buatDots();
    gridSpesialisasi.addEventListener("pointerdown", (e) => {
      if (!cekMobile() || isAnimating) return;
      isDragging = true;
      startX = e.clientX;
    });

    const tanganiGeser = (e) => {
      if (!cekMobile() || !isDragging || isAnimating) return;
      isDragging = false;
      const diffX = startX - e.clientX;

      if (Math.abs(diffX) > 40) {
        isAnimating = true;
        const kartuSekarang = kartuSpesialisasi[indexSpesialisasi];

        if (diffX > 0) {
          // Geser Kiri (Next): Kartu sekarang mengecil ke belakang, baru masuk dari kanan
          kartuSekarang.style.cssText = "transform: translateX(-50%) scale(0.8); opacity: 0; z-index: 1; transition: all 0.4s ease;";
          
          indexSpesialisasi = (indexSpesialisasi + 1) % kartuSpesialisasi.length;
          const kartuBaru = kartuSpesialisasi[indexSpesialisasi];
          
          kartuBaru.style.cssText = "transform: translateX(100%) scale(1); opacity: 1; z-index: 4; transition: none;";
          void kartuBaru.offsetWidth; // Force reflow
          kartuBaru.style.cssText = "transform: translateX(-50%) scale(1); opacity: 1; z-index: 4; transition: all 0.4s ease;";
          
          setTimeout(() => {
            renderMobileStack();
            isAnimating = false;
          }, 400);

        } else {
          // Geser Kanan (Prev): Kartu sekarang geser ke kanan, kartu lama membesar dari belakang
          kartuSekarang.style.cssText = "transform: translateX(100%) scale(1); opacity: 0; z-index: 4; transition: all 0.4s ease;";
          
          indexSpesialisasi = (indexSpesialisasi - 1 + kartuSpesialisasi.length) % kartuSpesialisasi.length;
          const kartuBaru = kartuSpesialisasi[indexSpesialisasi];
          
          kartuBaru.style.cssText = "transform: translateX(-50%) scale(0.8); opacity: 0; z-index: 1; transition: none;";
          void kartuBaru.offsetWidth;
          kartuBaru.style.cssText = "transform: translateX(-50%) scale(1); opacity: 1; z-index: 3; transition: all 0.4s ease;";
          
          setTimeout(() => {
            renderMobileStack();
            isAnimating = false;
          }, 400);
        }
      }
    };

    gridSpesialisasi.addEventListener("pointerup", tanganiGeser);
    gridSpesialisasi.addEventListener("pointercancel", () => isDragging = false);
    gridSpesialisasi.addEventListener("pointerleave", () => isDragging = false);
  }

  window.addEventListener("resize", renderMobileStack);
  renderMobileStack();

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
    tombolCari.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Terima kasih! Fitur pencarian lokasi saat ini sedang dalam tahap pengembangan.");
    });
  }

  // Footer Dummy Links Logic
  const tautanDummy = document.querySelectorAll(".dummy-link");
  tautanDummy.forEach(tautan => {
    tautan.addEventListener("click", function (e) {
      e.preventDefault();
      const namaMenu = this.textContent;
      alert(`Terima kasih! Halaman "${namaMenu}" saat ini sedang dalam tahap pengembangan.`);
    });
  });

  // Social Media Dummy Logic
  const tautanSosmed = document.querySelectorAll(".dummy-social");
  tautanSosmed.forEach(tautan => {
    tautan.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Nantikan kami! Sosial media Go Sehat akan segera hadir.");
    });
  });
});
