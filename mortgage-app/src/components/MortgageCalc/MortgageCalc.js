import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CalculateMortgage = async (data) => {
  return await axios
    .post('api/v1/mortgagecalc', data, {
      baseURL: process.env.REACT_APP_API_BASE_URL,
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
  const onSubmit = async (data) => {
    console.log('submit-data', data);
    const response = await CalculateMortgage(data);
  };

  const [mortgageData, setMortgageData] = useState({
    homePrice: 220000,
    downPayment: 80000,
    percentDown: 80000 / 220000,
    interestRate: 3.06,
    lengthOfLoan: 30,
  });

  return (
    <div class="flex one">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset class="flex one">
          <label for="home-price">
            Home Price
            {/* <input
              type="range"
              id="home-price"
              name="home-price"
              defaultValue={mortgageData.homePrice}
              min="40000"
              max="3000000"
            /> */}
            <input
              {...register('home-price')}
              type="home-price"
              placeholder={mortgageData.homePrice}
            />
            <span>{mortgageData.homePrice}</span>
          </label>

          <label for="down-payment flex">
            Down Payment
            <input
              type="down-payment"
              placeholder={mortgageData.downPayment}
              {...register('down-payment')}
            />
            Percent Down{' '}
            <span>{`${Math.ceil(mortgageData.percentDown * 100)}%`}</span>
          </label>
          <label>
            Length Of Loan
            <input
              type="length-of-loan"
              placeholder={`${mortgageData.lengthOfLoan} years`}
              {...register('length-of-loan')}
            />
          </label>
          <label>
            Interest Rate
            <input
              type="interest-rate"
              {...register('interst-rate')}
              placeholder={`${mortgageData.interestRate}%`}
            />
          </label>
        </fieldset>
        <input type="submit" />
      </form>
      <div>
        <span>2</span>
      </div>
    </div>
  );
};

export default MortgageCalc;
