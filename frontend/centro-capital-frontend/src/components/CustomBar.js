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



function CustomBar({data, metric}){
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

  return(
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
      <BarChart
        width={500}
        height={300}
        data={filteredData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickCount={10} domain={['auto', 'dataMax']}/>
        <Tooltip />
        <Legend />
        <Bar dataKey={metric} fill="#8884d8" />
        {/* <Line dataKey="pv" fill="#8884d8" />
        <Line dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default CustomBar