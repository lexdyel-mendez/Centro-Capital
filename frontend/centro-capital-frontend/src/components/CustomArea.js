import React, { Component } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
  
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

function CustomArea({data, data2, year, firstMetric, secondMetric}){
  let runArr2=[]
  let workingData=data
  let lineData=[]
  for(const pos of workingData){
    if(pos['year']== year){
      lineData.push(pos)
    }
  }
  if(data2){
    let workingData2=data2[year]
    for(const i=0;i<workingData2.length-1;i++){
      lineData[i][secondMetric] = workingData2
    }
  }

let minMax = getMinMaxCivilianPopulation(lineData)
    return(
        <ResponsiveContainer height={300}>
        <AreaChart width={730} height={250} data={lineData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis domain={[minMax['min'],minMax['max']]}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey={firstMetric} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey={secondMetric} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
        </ResponsiveContainer>
    );
}
export default CustomArea
