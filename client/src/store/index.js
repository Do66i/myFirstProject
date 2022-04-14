import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

const moment = require('moment');

export const stateContext = createContext(null);

function Store({ children }) {
  const [isLogIn, setIsLogIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [country, setCountry] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [tripList, setTripList] = useState([]);

  const state = {
    isLogIn,
    accessToken,
    country,
    totalCost,
    start_date,
    end_date,
    tripList,
  };

  const issueCountry = data => {
    setCountry(data);
  };

  const issueAccessToken = token => {
    setAccessToken(token);
  };

  const loginHandler = (id, password, data) => {
    setIsLogIn(true);
    issueAccessToken(data.accessToken);
  };

  const logoutHandler = () => {
    setIsLogIn(false);
    issueAccessToken('');
  };

  const totalCostHandler = data => {
    setTotalCost(data);
  };

  const startDateHandler = data => {
    setStartDate(moment(data).format('YYYY/MM/DD'));
  };

  const endDateHandler = data => {
    setEndDate(moment(data).format('YYYY/MM/DD'));
  };

  const updateTripList = date => {
    setTripList(date);
  };

  const startTrip = () => {
    axios
      .post(
        'https://www.remembertrip.tk/mypage/trip',
        { country, totalPrice: totalCost, start_date, end_date },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        getTrip();
      });
  };

  const getTrip = () => {
    axios({
      url: 'https://www.remembertrip.tk/mypage/trip',
      method: 'get',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then(data => {
      if (tripList.length === 0) {
        setTripList([...tripList, ...data.data.trips]);
        return;
      }

      const newTrips = data.data.trips;

      if (tripList.length !== newTrips.length) {
        setTripList(newTrips);
      }
      for (const trip of tripList) {
        let isSame = false;
        for (const newTrip of newTrips) {
          if (trip.id === newTrip.id) {
            isSame = true;
            break;
          }
        }
        if (!isSame) {
          setTripList(newTrips);
          break;
        }
      }
    });
  };

  const funcs = {
    loginHandler,
    logoutHandler,
    issueCountry,
    totalCostHandler,
    startTrip,
    startDateHandler,
    endDateHandler,
    updateTripList,
    getTrip,
  };

  return (
    <stateContext.Provider value={{ state, funcs }}>
      {children}
    </stateContext.Provider>
  );
}

Store.propTypes = {
  children: propTypes.node.isRequired,
};

export default Store;
