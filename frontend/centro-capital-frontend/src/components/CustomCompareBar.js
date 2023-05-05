import React, { useState } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';

// Dummy data
const inputData = [
  // Daily data
  { name: 'june', uv: 4000, pv: 2400, period: '2014' },
  { name: 'july', uv: 3000, pv: 1398, period: '2014' },
  // Weekly data
  { name: 'Week 1', uv: 8000, pv: 4800,  period: '2015' },
  { name: 'Week 2', uv: 6000, pv: 2796, period: '2015' },
  // Monthly data
  { name: 'Jan', uv: 24000, pv: 14400,  period: '2016' },
  { name: 'Feb', uv: 18000, pv: 8396, period: '2016' },
  // Quarterly data
  { name: 'Q1', uv: 72000, pv: 43200,  period: '2017' },
  // Yearly data
  { name: '2022', uv: 288000, pv: 172800, period: '2018' },
];

function filterData(period) {
  return inputData.filter((data) => data.period === period);
}

function CustomCompareBar(){

  const [inputData, setData] = useState(filterData('2014'));

  return (
    <div>
      <h1>Time Period Bar Chart using Recharts</h1>
      <div>
        <button onClick={() => setData(filterData('2014'))}>2014</button>
        <button onClick={() => setData(filterData('2015'))}>2015</button>
        <button onClick={() => setData(filterData('2016'))}>2016</button>
        <button onClick={() => setData(filterData('2017'))}>2017</button>
        <button onClick={() => setData(filterData('2018'))}>2018</button>
      </div>
      <ResponsiveContainer height={300}>
      <BarChart
        width={500}
        height={300}
        data={inputData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomCompareBar;