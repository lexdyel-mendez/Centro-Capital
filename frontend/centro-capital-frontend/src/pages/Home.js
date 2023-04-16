import React, { useState } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import CustomBar from "../components/CustomBar";
import Grid from "../components/Grid"
// Dummy data
const allData = [
  // Daily data
  { name: '01', uv: 4000, pv: 2400, amt: 2400, period: 'daily' },
  { name: '02', uv: 3000, pv: 1398, amt: 2210, period: 'daily' },
  // Weekly data
  { name: 'Week 1', uv: 8000, pv: 4800, amt: 4800, period: 'weekly' },
  { name: 'Week 2', uv: 6000, pv: 2796, amt: 4420, period: 'weekly' },
  // Monthly data
  { name: 'Jan', uv: 24000, pv: 14400, amt: 14400, period: 'monthly' },
  { name: 'Feb', uv: 18000, pv: 8396, amt: 13260, period: 'monthly' },
  // Quarterly data
  { name: 'Q1', uv: 72000, pv: 43200, amt: 43200, period: 'quarterly' },
  // Yearly data
  { name: '2022', uv: 288000, pv: 172800, amt: 172800, period: 'yearly' },
];

function filterData(period) {
  return allData.filter((data) => data.period === period);
}

const Home = () => {
  return (
    <div>
      <h1>Centro Capital, for all your financial info</h1>
      <Grid></Grid>
      </div>
  );
};

export default Home;