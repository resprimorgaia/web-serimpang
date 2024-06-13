# Mengimpor pustaka yang diperlukan
import numpy as np
from flask import render_template, request, json, flash
from keras.models import load_model
from keras.preprocessing import image
import os
from datetime import datetime
from PIL import Image
from app import app
from app.config import Config

# Memuat model serimpang
serimpang_model = load_model(app.config['MODEL_PATH'])

# Fungsi membaca format file
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Fungsi untuk memuat kamus kelas dari file JSON
def load_class_mapping():
    with open(app.config['LABEL_PATH'], 'r') as f:
        class_mapping = json.load(f)
    return class_mapping

# Fungsi menambahkan penjelasan di kelas terprediksi
def load_class_info():
    with open(app.config['CLASS_INFO_PATH'], 'r') as f:
        class_info = json.load(f)
    return class_info

# Render halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# Render halaman prediksi
@app.route('/class-serimpang')
def class_serimpang():
    return render_template('class-serimpang.html')

# Render halaman hasil prediksi
@app.route('/result-class-serimpang', methods=['POST'])
def result_class_serimpang():
    # Menghandle upload file
    file = request.files.get('file')
    
    # Cek validitas file yang diunggah
    if not file:
        flash("Gambar belum dimasukkan. Mohon unggah gambar terlebih dahulu")
        return render_template("class-serimpang.html")

    if not allowed_file(file.filename):
        flash("File yang dipilih harus berformat .jpg, .jpeg, atau .png")
        return render_template("class-serimpang.html")

    # Jika validasi berhasil, lanjutkan dengan proses prediksi
    filename = "temp_image.png"
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    img_url = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Praproses dan persiapkan gambar untuk prediksi
    img = Image.open(img_url).convert('RGB')
    now = datetime.now()
    predict_image_path = app.config['UPLOAD_FOLDER'] + now.strftime("%d%m%y-%H%M%S") + ".png"
    img.convert('RGB').save(predict_image_path, format="png")
    img.close()

    img = image.load_img(predict_image_path, target_size=(256, 256))
    x = image.img_to_array(img) / 255.0
    x = x.reshape(1, 256, 256, 3)
    images = np.array(x)

    # Memuat kamus kelas dari JSON
    class_mapping = load_class_mapping()
    class_info = load_class_info()

    # Melakukan prediksi
    prediction_array_densenet169 = serimpang_model.predict(images)

    # Menentukan indeks kelas yang diprediksi dan tingkat kepercayaan menggunakan kamus kelas
    predicted_class_index = np.argmax(prediction_array_densenet169)
    predicted_class = class_mapping.get(str(predicted_class_index))
    confidence = '{:.2%}'.format(np.max(prediction_array_densenet169))
    
    additional_info = class_info.get(predicted_class, {})
    
    # data respon
    return render_template("class-serimpang-predict.html", img_path=img_url,
                           prediction=predicted_class, confidence=confidence,
                           additional_info=additional_info)

# Render halaman tentang pengembang
@app.route('/about')
def about():
    return render_template('about.html')
