from flask import Flask, Blueprint, jsonify, make_response
from flask.globals import session
from flask_cors import CORS, cross_origin
from app.helper import login_required

from .models import User

auth = Blueprint('auth', __name__, url_prefix='/api/v1')

@auth.route('/user/signup', methods=["POST"])
@cross_origin()
def signup():
  user = User()
  data = user.signup() 
  # add session to response
  # data['flask session'] = session['logged_in']
  resp = make_response(data)
  # resp.headers.add('Access-Control-Allow-Origin', '*')

  return resp

# login route
@auth.route('/user/login', methods=["POST"])
@cross_origin()
def login():
  user = User()
  return user.login()
 
# logout route
@auth.route('/user/logout', methods=["POST"])
@login_required
@cross_origin()
def logout():
  user = User()
  return user.logout()