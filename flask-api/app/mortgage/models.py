from flask import Flask, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId, json_util
import json
from app.extensions import mongo 

class User: 

  def start_session(self, user):
    session['logged_in'] = True
    session['user'] = user
    # todo remove password from session
    del user['password']
    return user, 200

  def signup(self):
    # user collection
    user_collection = mongo.db.users
    # parser json request
    new_user = request.get_json()
    # hash password 
    hashed_password = generate_password_hash(new_user["password"], method='sha256')
    
    # create user object
    user = {
      "_id": ObjectId(),
      "name":  new_user['name'],
      "email": new_user['email'],
      "password": hashed_password
    }

    json_user = json.loads(json_util.dumps(user))
    exists = user_collection.find_one({'email': new_user['email']})
    if exists:
      return jsonify({'error': 'email already exists'}), 401
    # get user collection from mongo
    
    # convert json object to mongo objectId
    mongo_user = json_util.loads(json.dumps(json_user))
    mongores = user_collection.insert_one(mongo_user)
    if mongores.inserted_id:      
      print('sesion test', self.start_session(user) )
      return self.start_session(json_user)
    
    return jsonify({'error': 'signup failed'}), 400
  
  def logout(self):
    session.clear()
    print('logout', session)
    return jsonify({'message': 'user has logged out'})

  def login(self):
    # user collection
    user_collection = mongo.db.users
    # parser json request
    user = request.get_json()
    
    exists = user_collection.find_one({'email': user['email']})
    
    if exists and check_password_hash(exists['password'], user['password']):
      print(check_password_hash(exists['password'], user['password']))
      json_user = json.loads(json_util.dumps(exists))
      return self.start_session(json_user)
      
    return jsonify({'error': 'login failed'}), 400
    
    

    