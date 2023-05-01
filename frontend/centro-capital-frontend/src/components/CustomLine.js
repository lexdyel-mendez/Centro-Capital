import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function dataKeyLoop(input){
//   input.shift()
//   input.forEach(metric => {
//     let line = document.createElement("Line")
//     line.setAttribute("type","monotone")
//     line.setAttribute("dataKey",metric)
//     line.setAttribute("stroke", "#8884d8")
//     let x = document.getElementsByClassName("row bg-light")
//     console.log(x)
//   });
// }

function CustomLine({data, year, metric}){
  //Function is defined for a single data input
  let workingData=data
  let lineData=[]
  for(const pos of workingData){
    if(pos['year']== year){
      lineData.push(pos)
    }
  }
  
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
  <Line type="monotone" dataKey={metric} stroke="#8884d8" activeDot={{ r: 8 }} />
</LineChart>
</ResponsiveContainer>
  );
}
export default CustomLine