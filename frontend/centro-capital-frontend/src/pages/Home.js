import React, { useState } from 'react';

import CustomBar from "../components/CustomBar";
import CustomLine from '../components/CustomLine'
const input = [
  {
    name: '2014',
    unemployment: 4,
    gdp: 3,
  },
  {
    name: '2015',
    unemployment: 5,
    gdp: 3.2,
  },
  {
    name: '2016',
    unemployment: 5,
    gdp: 7,
  },
];
const dailydata = [
  // Daily data
  { name: '01', uv: 4000, pv: 2400, amt: 2400, period: 'daily' },
  { name: '02', uv: 3000, pv: 1398, amt: 2210, period: 'daily' },
]
// function filterData(period) {
//   return allData.filter((data) => data.period === period);
// }

const Home = () => {
  return (
      <div>
        <div class="row bg-light">
        <h1>Centro Capital, for all your financial info</h1>
        </div>
              {/* No extra definition of column and row sizes as they naturally flex avoiding overflow with bootstrap*/}
              <div class="row p-3">
            <div class="col p-3 bg-secondary rounded">
              <h1> Bar Chart in container grid</h1>
                 <CustomBar data={dailydata}></CustomBar>
            </div>
            <div class="col p-3 bg-dark rounded">
              <h1>  Line Chart in container grid</h1>
              <CustomLine data={input}></CustomLine>
            </div>
            <div class="row p-3">
            <div class="col p-3 bg-success rounded">
              <CustomBar data={dailydata}></CustomBar>
            </div>
            <div class="col p-3 bg-secondary rounded">
              <CustomBar data={dailydata}></CustomBar>
            </div>
            </div>
      </div>
      </div>
  );
};

export default Home;