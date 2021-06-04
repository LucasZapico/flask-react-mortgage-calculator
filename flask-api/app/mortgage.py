from flask import Blueprint, jsonify, session

mortgage = Blueprint('mortgage', __name__, url_prefix='/api/v1')

# basic public route
@mortgage.route('/')
def index():
  return jsonify({'message': 'hello from mortgage'})


@mortgage.route('/public', methods=['GET'])
def public_example():
  print('sessions', session)
  return jsonify({'message': 'hello from simple public route'})

