"use strict";

// Fungsi untuk mengambil data dari API
async function fetchFaqData() {
    try {
        const response = await fetch('../static/data/faq.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching FAQ data:", error);
    }
}

// Fungsi untuk merender pertanyaan
function renderQuestions(data) {
    return data.map(values => `<div class="faq-item mb-3" data-aos="fade-down" data-aos-duration="1000">
        <a class="btn" data-bs-toggle="collapse" href="#collapseExample${values.id}" role="button"
            aria-expanded="false" aria-controls="collapseExample${values.id}">
            <i class="fa-solid fa-leaf"></i>${values.question}<i
                class="bi bi-chevron-down fw-bold"></i>
        </a>
        <div class="collapse" id="collapseExample${values.id}">
            <div class="text-accordion">${values.answer}</div>
        </div>
    </div>`).join('');
}

// Ambil elemen HTML untuk FAQ
const faqItems = document.getElementById("faq-list");

// Ambil data dan render
fetchFaqData().then(data => {
    if (data) {
        faqItems.innerHTML = renderQuestions(data);
    }
});
