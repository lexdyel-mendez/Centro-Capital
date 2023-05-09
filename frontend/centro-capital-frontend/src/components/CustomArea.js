import React, { Component, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
  

function CustomArea({data, data2, year, firstMetric, secondMetric}){
  let runArr2=[]
  let workingData=data
  let lineData=[]
  for(const pos of workingData){
    if(pos['year']== year){
      lineData.push(pos)
    }
  }

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
      <AreaChart width={730} height={250} data={filteredData}
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
      <YAxis tickCount={5} domain={['auto', 'dataMax']}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey={firstMetric} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey={secondMetric} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
      </ResponsiveContainer>
      </div>
  );

    
}
export default CustomArea
