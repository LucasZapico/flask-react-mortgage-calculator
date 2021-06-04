from functools import wraps
from flask import jsonify, session

# Decorators 
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session: 
      return f(*args, **kwargs)
    else: 
      return jsonify({'error': 'not authorized'})
  return wrap
