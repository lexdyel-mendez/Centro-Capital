import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function CustomCompareLine({data, year, firstMetric,secondMetric}){
  //Function is defined for a single data input
  let workingData=data
  let lineData=[]
  for(const pos of workingData){
    if(pos['year']== year){
      lineData.push(pos)
    }
  }
  
  if(secondMetric === undefined){
    return (
      <ResponsiveContainer height={300}>
        <LineChart
          width={500}
          height={300}
          data={lineData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey= {"month"}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={firstMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
        );
  }else{
    return (
      <ResponsiveContainer height={300}>
        <LineChart
          width={500}
          height={300}
          data={lineData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey= {"month"}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={firstMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey={secondMetric} stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
        );
  }


  
}
export default CustomCompareLine