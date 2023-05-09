import React, { Component, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function CustomCompareLine({data, inputYear, firstMetric,secondMetric}){
  
  const [yearFilter, setYearFilter] = useState(null);

  const handleClick = (year) => {
    setYearFilter(year);
  }

  let filteredData = data;
  if (yearFilter !== null) {
    filteredData = data.filter((item) => item.year === yearFilter);
  }else{
    setYearFilter("2022")
  }


  if(secondMetric === undefined){
    return (
      <div>
      <div className="m-2">
      <button className="rounded" onClick={() => handleClick("2014")}>2014</button>
      <button className="rounded" onClick={() => handleClick("2015")}>2015</button>
      <button className="rounded" onClick={() => handleClick("2016")}>2016</button>
      <button className="rounded" onClick={() => handleClick("2017")}>2017</button>
      <button className="rounded" onClick={() => handleClick("2018")}>2018</button>
      <button className="rounded" onClick={() => handleClick("2019")}>2019</button>
      <button className="rounded" onClick={() => handleClick("2020")}>2020</button>
      <button className="rounded" onClick={() => handleClick("2021")}>2021</button>
      <button className="rounded" onClick={() => handleClick("2022")}>2022</button>

      </div>
      <ResponsiveContainer height={300}>
        <LineChart
          width={500}
          height={300}
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey= {"month"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={firstMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
      </div>
        );


  }else{
    return (
      <div>
      <div className="m-2">
        <button className="rounded" onClick={() => handleClick("2022")}>2022</button>
        <button className="rounded" onClick={() => handleClick("2021")}>2021</button>
        <button className="rounded" onClick={() => handleClick("2020")}>2020</button>
        <button className="rounded" onClick={() => handleClick("2019")}>2019</button>
        <button className="rounded" onClick={() => handleClick("2018")}>2018</button>
        <button className="rounded" onClick={() => handleClick("2017")}>2017</button>
        <button className="rounded" onClick={() => handleClick("2016")}>2016</button>
        <button className="rounded" onClick={() => handleClick("2015")}>2015</button>
        <button className="rounded" onClick={() => handleClick("2014")}>2014</button>
      </div>
      <ResponsiveContainer height={300}>
        <LineChart
          width={500}
          height={300}
          data={filteredData}
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
      </div>
        );
  }


  
}
export default CustomCompareLine