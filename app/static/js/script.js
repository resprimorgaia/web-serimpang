"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("[data-header]");
    const backTopBtn = document.querySelector("[data-back-top-btn]");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Tambahkan kelas "active" secara langsung saat halaman dimuat
    navbar.classList.add("active");
    navbar.classList.add("navbar-anim");

    // Fungsi untuk mengelola visibilitas tombol "Back to Top" berdasarkan scroll posisi
    function handleScroll() {
        if (window.scrollY >= 150) {
            backTopBtn.classList.add("active");
        } else {
            backTopBtn.classList.remove("active");
        }

        // Menutup navbar ketika pengguna melakukan scroll di luar navbar terbuka
        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click(); // Tutup navbar
        }
    }

    // Menambahkan event listener untuk scroll event
    window.addEventListener("scroll", handleScroll);

    // Menutup navbar ketika klik di luar navbar terbuka
    document.addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (!clickedElement.closest(".navbar-collapse") && navbarCollapse.classList.contains("show")) {
            navbarToggler.click(); // Tutup navbar
        }
    });

    // Inisialisasi tombol "Back to Top" sesuai dengan posisi scroll saat halaman dimuat
    handleScroll();
});
