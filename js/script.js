document.addEventListener('DOMContentLoaded', () => {
    // 1. LOADER
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 500);
    });

    // 2. MOBILE MENU
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenu.classList.toggle('active');
        });
    }

    // 3. LIVE SERVICE SEARCH
    const serviceSearch = document.getElementById('service-search');
    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceSearch) {
        serviceSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            serviceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 4. MULTI-STEP FORM
    const form = document.getElementById('reg-form');
    const steps = document.querySelectorAll('.step-content');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtn = document.querySelector('.next-step');
    const prevBtn = document.querySelector('.prev-step');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            if (name && phone) {
                steps[0].classList.remove('active');
                steps[1].classList.add('active');
                progressSteps[1].classList.add('active');
            } else {
                alert('Mohon lengkapi data pasien terlebih dahulu.');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            steps[1].classList.remove('active');
            steps[0].classList.add('active');
            progressSteps[1].classList.remove('active');
        });
    }

    // 5. QUEUE CHECKER SIMULATION
    const btnCheckQueue = document.getElementById('btn-check-queue');
    const queueInput = document.getElementById('queue-input');
    const queueResult = document.getElementById('queue-result');

    if (btnCheckQueue) {
        btnCheckQueue.addEventListener('click', () => {
            const val = queueInput.value.trim();
            if (!val) {
                alert('Masukkan nomor pendaftaran!');
                return;
            }

            queueResult.innerHTML = '<div class="loader"></div><p>Mencari data...</p>';
            
            setTimeout(() => {
                const isFound = val.startsWith('REG-2026-');
                if (isFound) {
                    const queueNum = val.split('-')[2];
                    queueResult.innerHTML = `
                        <div class="result-card">
                            <h4 style="color: #F59E0B">Data Ditemukan</h4>
                            <div style="font-size: 2rem; font-weight: 800; margin: 10px 0;">Antrean #${queueNum}</div>
                            <p>Estimasi Pelayanan: <strong>15 Menit Lagi</strong></p>
                            <div style="margin-top: 15px; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px;">
                                Silakan menuju ruang tunggu Poliklinik.
                            </div>
                        </div>
                    `;
                } else {
                    queueResult.innerHTML = `
                        <div class="result-error">
                            <p>Nomor tidak terdaftar atau salah format.</p>
                            <button onclick="location.reload()" class="btn btn-sm btn-outline">Ulangi</button>
                        </div>
                    `;
                }
            }, 1500);
        });
    }

    // 6. FORM SUBMISSION
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Memproses...';

            setTimeout(() => {
                const randomQueue = 'REG-2026-' + Math.floor(Math.random() * 900 + 100);
                document.getElementById('assigned-queue').textContent = randomQueue;
                
                form.style.display = 'none';
                document.querySelector('.form-progress').style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
                
                // Add to "database" for checker
                console.log('Registered:', randomQueue);
            }, 2000);
        });
    }

    // RESET FORM
    const resetBtn = document.querySelector('.reset-form');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    // 7. INTERSECTION OBSERVER
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .doctor-card, .hero-text, .hero-image, .queue-wrapper');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});
