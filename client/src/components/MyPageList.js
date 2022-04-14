import React from 'react';
import './MyPageList.css';
const { getName } = require('country-list');
const moment = require('moment');

function MyPageList(props) {
  const startDate = props.start_date.split('/');
  const endDate = props.end_date.split('/');
  startDate[0] = Number(startDate[0]);
  startDate[1] = Number(startDate[1]);
  startDate[2] = Number(startDate[2]);
  endDate[0] = Number(endDate[0]);
  endDate[1] = Number(endDate[1]);
  endDate[2] = Number(endDate[2]);
  let totalCostString = '';
  if (props.totalCost < 10000) {
    totalCostString += `${props.totalCost}원`;
  } else {
    totalCostString += `${props.totalCost / 10000}만원`;
  }
  const diff = moment(endDate).diff(moment(startDate), 'days');

  return (
    <div className="MyPageListBox">
      <div className="item">{getName(props.country)}</div>
      <div className="item">전재산 : {totalCostString}</div>
      <div className="item">{diff}일</div>
    </div>
  );
}

export default MyPageList;
