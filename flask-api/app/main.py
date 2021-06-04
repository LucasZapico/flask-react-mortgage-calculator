from flask import Blueprint, jsonify, session

main = Blueprint('main', __name__)

# basic public route
@main.route('/')
def index():
  return jsonify({'message': 'hello from main'})


@main.route('/public', methods=['GET'])
def public_example():
  print('sessions', session)
  return jsonify({'message': 'hello from simple public route'})

