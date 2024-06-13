import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'qwerty098765421')
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', 'app/static/user_uploads/')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    MODEL_PATH = os.environ.get('MODEL_PATH', 'app/models/model_dir/serimpang256-densenet169-model4_1b-acc99.32%.h5')
    LABEL_PATH = os.environ.get('LABEL_PATH', 'app/models/label_dir/serimpang256-model4_1b-classes.json')
    CLASS_INFO_PATH = os.environ.get('CLASS_INFO_PATH', 'app/models/label_dir/class_info.json')