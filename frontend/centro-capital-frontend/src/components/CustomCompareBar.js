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
  { "name": 'june', uv: 4000, pv: 2400, period: '2014' },
  { "name": 'july', uv: 3000, pv: 1398, period: '2014' },
  // Weekly data
  { "name": 'Week 1', uv: 8000, pv: 4800,  period: '2015' },
  { "name": 'Week 2', uv: 6000, pv: 2796, period: '2015' },
  // Monthly data
  {"name": 'Jan', uv: 24000, pv: 14400,  period: '2016' },
  { "name": 'Feb', uv: 18000, pv: 8396, period: '2016' },
  // Quarterly data
  { "name": 'Q1', uv: 72000, pv: 43200,  period: '2017' },
  // Yearly data
  { "name": '2022', uv: 288000, pv: 172800, period: '2018' },
];
let barData=[]
function filterData(period) {
  return inputData.filter((data) => data.period === period);
}

function CustomCompareBar({data, year}){
  // console.log(data)
  let barData=[]
  const monthArr = ["JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE"]

  for(const key of Object.keys(data)){
    if(!isNaN(parseInt(key))){
      for(const month of monthArr){
        let runDict={}
        runDict['period'] = key
        runDict['month'] = month
        runDict['metric1'] = data['metric']
        runDict[data['metric']] = data[key][month]
        barData.push(runDict)
      }
    }

  }
  console.log(barData)

  const [inputData, setData] = useState(filterData(year));

  return (
    <div>
      <div className="m-2">
        <button className="rounded" onClick={() => setData(filterData('2022'))}>2022</button>
        <button className="rounded" onClick={() => setData(filterData('2021'))}>2021</button>
        <button className="rounded" onClick={() => setData(filterData('2020'))}>2020</button>
        <button className="rounded" onClick={() => setData(filterData('2019'))}>2019</button>
        <button className="rounded" onClick={() => setData(filterData('2018'))}>2018</button>
        <button className="rounded" onClick={() => setData(filterData('2017'))}>2017</button>
        <button className="rounded" onClick={() => setData(filterData('2016'))}>2016</button>
        <button className="rounded" onClick={() => setData(filterData('2015'))}>2015</button>
        <button className="rounded" onClick={() => setData(filterData('2014'))}>2014</button>
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
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomCompareBar;