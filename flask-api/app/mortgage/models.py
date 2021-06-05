from flask import Flask
from flask.json import jsonify 

import re

def mortgage_monthly_payment(p, r, n):
  result = (r*p*(1+r)**n)/((1+r)**n - 1)
  print(result)
  return result
class Calculation:
  def calculate_mortgage_payment(self, data):
    # sanitize string values to floats
    down_payment = float(re.sub(r'[^\d.]', '', data['down-payment']))
    home_price = float(re.sub(r'[^\d.]', '', data['home-price']))
    interest_rate = float(re.sub(r'[^\d.]', '', data['interest-rate']))
    length_of_loan = float(re.sub(r'[^\d.]', '', data['length-of-loan']))
    # declare necessary variables for equation
    principle = home_price - down_payment
    monthly_interest_rate = interest_rate / 100 / 12
    monthly_payments = length_of_loan * 12
    
    monthly_payment = mortgage_monthly_payment(principle, monthly_interest_rate, monthly_payments)
    
    return jsonify({'monthlyPayment': monthly_payment})