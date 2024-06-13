from flask import Flask

# Create flask app
app = Flask(__name__)

# Load the configuration from config.py
app.config.from_object('app.config.Config')

# Import routes from application.py
from app import application