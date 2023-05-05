import React, {Component} from 'react';
import {useState} from 'react';
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

function getMinMaxCivilianPopulation(data) {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  
  for (let i = 0; i < data.length; i++) {
    const value = Number(data[i]["Civilian Population"]);
    
    if (!isNaN(value)) {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  }
  
  return { min, max };
}


function CustomBar({data, year}){
  let barData= []
  barData.push(data[year])
  const monthArr = ["JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE"]
  for(const month of monthArr){
    let runDict = {}
    runDict['month'] = month
    runDict[data['metric']] = barData[0][month]
    barData.push(runDict)
  }
  let minMax = getMinMaxCivilianPopulation(barData)
  return(
     <div>
      <div>
      </div>
      <ResponsiveContainer height={300}>
      <BarChart
        width={500}
        height={300}
        data={barData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[minMax['min']-15,minMax['max']+15]}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="Civilian Population" fill="#8884d8" />
        {/* <Line dataKey="pv" fill="#8884d8" />
        <Line dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default CustomBar