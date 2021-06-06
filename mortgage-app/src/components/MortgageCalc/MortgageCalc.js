import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';

import axios from 'axios';
import { axiosInstance } from '../App/App';

const CalculateMortgage = async (data) => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  console.log('data', data);
  return await axios
    .post('api/v1/mortgagecalc', data, {
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((data) => {
      console.log('response', data);
      return data;
    })
    .catch((err) => {
      return err;
    });
};

const MortgageCalc = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [mortgageData, setMortgageData] = useState({
    homePrice: 220000,
    downPayment: 80000,
    percentDown: 80000 / 220000,
    interestRate: 3.06,
    lengthOfLoan: 30,
    monthlyPayment: '0',
  });

  const onSubmit = async (data) => {
    console.log('submit-data', data);
    const response = await CalculateMortgage(data);
    setMortgageData((prev) => {
      return { ...prev, monthlyPayment: response.data?.monthlyPayment };
    });
  };

  return (
    <div className="row">
      <div className="col s12 m4">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <div className="input-field col s12">
            <label className="active" htmlFor="down-payment">
              Home Price
            </label>
            <p className="range-field">
              {/* <input
                type="range"
                id="test5"
                min="40000"
                max="3000000"
                defaultValue={mortgageData.homePrice}
                onChange={(e) =>
                  setMortgageData((prev) => {
                    return { ...prev, homePrice: e.target.value };
                  })
                }
              /> */}
            </p>
            <input
              id="home-price"
              type="text"
              className="validate"
              {...register('home-price')}
              defaultValue={`$ ${mortgageData.homePrice}`}
            ></input>
          </div>
          <div className="input-field col s12">
            <label className="active" htmlFor="down-payment">
              Down Payment
            </label>
            <input
              id="down-payment"
              type="text"
              className="validate"
              defaultValue={`$${mortgageData.downPayment}`}
              {...register('down-payment')}
            />
          </div>
          <div className="input-field col s12">
            <input
              id="length-of-loan"
              type="text"
              className="validate"
              defaultValue={`${mortgageData.lengthOfLoan} years`}
              {...register('length-of-loan')}
            />
            <label className="active" htmlFor="length-of-loan">
              Length Of Loan
            </label>
          </div>
          <div className="input-field col s12">
            <input
              defaultValue={`${mortgageData.interestRate} %`}
              id="interest-rate"
              type="text"
              className="validate"
              {...register('interest-rate')}
            ></input>
            <label className="active" htmlFor="interest-rate">
              Interest Rate
            </label>
          </div>
          <div className="input-field col s12">
            <input type="submit" className="btn"></input>
          </div>
        </form>
      </div>
      <div className="col s12 m8">
        <div className="row">
          <h2>{`$${parseInt(mortgageData.monthlyPayment)}`}</h2>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalc;
