from flask import Flask
from flask_cors import CORS, cross_origin

from .main import main as main_blueprint


def create_app():
  app = Flask(__name__)
  CORS(app)

  # register blueprints 
  app.register_blueprint(main_blueprint)

  return app

my_app = create_app()