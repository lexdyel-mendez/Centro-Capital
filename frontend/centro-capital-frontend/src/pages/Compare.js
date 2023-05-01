import React, { useEffect, useState } from "react";



function organizeData(inputData) {
  //data filter after extraction START
  if (inputData) {
    const finalValArr = []
    const monthArr =["JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE"]
    for (const key of Object.keys(inputData).slice(0, 9)) {
      for (const month of monthArr){
        const runningVals = new Object()
        runningVals['year'] = key
        runningVals['month'] = month
        runningVals[inputData['metric']] = inputData[key][month]
        runningVals['metric'] = inputData['metric']
        finalValArr.push(runningVals)
      }
    }
    //data filter after extraction END
    return finalValArr
  } else {
    return
  }
}

const Compare = () => {

  const [compareData, setdata] = useState();

  useEffect(() => {
    fetch("/centro-capital/allUnemploymentYearly",
      { method: 'GET' }).then(response => {
        if (response.status == 200) {
          return response.json()
        }
      }).then(compareData => console.log(compareData))
      .then(error => console.log(error))
  },[])

  if(!compareData){

    return (
      <div>
        <p>no data so far</p>
      </div>
    )

  }else{
    return (
      <div>
        <p>data loaded</p>
      </div>
    )
  }

};

export default Compare;

//Comment below helps filter compare

// function filterData(period) {
//   return allData.filter((data) => data.period === period);
// }

// const Home = () => {

//   const [data, setData] = useState(filterData('daily'));

//   return (
//     <div>
//       <h1>Time Period Bar Chart using Recharts</h1>
//       <div>
//         <button onClick={() => setData(filterData('daily'))}>Daily</button>
//         <button onClick={() => setData(filterData('weekly'))}>Weekly</button>
//         <button onClick={() => setData(filterData('monthly'))}>Monthly</button>
//         <button onClick={() => setData(filterData('quarterly'))}>Quarterly</button>
//         <button onClick={() => setData(filterData('yearly'))}>Yearly</button>
//       </div>
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="pv" fill="#8884d8" />
//         <Bar dataKey="uv" fill="#82ca9d" />
//         {/* <Line dataKey="pv" fill="#8884d8" />
//         <Line dataKey="uv" fill="#82ca9d" /> */}
//       </BarChart>
//     </div>
//   );
// };
