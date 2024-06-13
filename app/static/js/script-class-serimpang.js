// Fungsi untuk menampilkan gambar yang diunggah
function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(this);
    });
});

// Memproses klik pada gambar default
$('.try-image').on('click', function() {
    var imgSrc = $(this).attr('src');
    $('#imageResult').attr('src', imgSrc);

    // Buat file input baru dari gambar default
    fetch(imgSrc)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "default-image.jpg", {type: blob.type});
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('upload').files = dataTransfer.files;
        });
});

// Show upload image name
const input = document.getElementById('upload');
const infoArea = document.getElementById('upload-label');

input.addEventListener('change', showFileName);
function showFileName(e) {
    const input = e.srcElement;
    const fileName = input.files[0].name;
    infoArea.textContent = 'File name: ' + fileName;
}

// Show flash message in modal
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("flashModal");
    var span = document.getElementsByClassName("close")[0];
    var mainElement = document.querySelector("main");
    var flashMessage = mainElement.getAttribute("data-flash");

    if (flashMessage === "True") {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});