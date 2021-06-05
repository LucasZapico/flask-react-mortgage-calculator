from flask import  Blueprint, json, jsonify, request

from flask_cors import CORS, cross_origin

from .models import Calculation


mortgage = Blueprint('mortgage', __name__, url_prefix='/api/v1')

# basic public route
@mortgage.route('/')
@cross_origin()
def index():
  return jsonify({'message': 'hello from mortgage'})


@mortgage.route('/public', methods=['GET'])
@cross_origin()
def public_example():
  return jsonify({'message': 'hello from simple public route'})


@mortgage.route('/mortgagecalc', methods=['POST'])
@cross_origin()
def mortgage_calc():
  mortgage_data =  request.get_json()
  calculator = Calculation()
  
  return calculator.calculate_mortgage_payment(mortgage_data)