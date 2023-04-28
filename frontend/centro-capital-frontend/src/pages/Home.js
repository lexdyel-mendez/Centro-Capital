import React, { useState, useEffect } from 'react';
import { useQueries} from '@tanstack/react-query';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomBar from "../components/CustomBar";
import CustomLine from '../components/CustomLine'
import CustomPie from '../components/CustomPie';
import CustomArea from '../components/CustomArea';


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

const Home = () => {

  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/centro-capital/allUnemploymentYearly", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setData(organizeData(doc));
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
  }, []);


  return (
    <Container>
       <Row className="m-4">
        {/* <Col className="bg-primary m-4 rounded"> Bar Chart<CustomBar data={dailydata}></CustomBar></Col> */}
        {/* <Col className="bg-secondary m-4 rounded"><CustomLine data={data} year='2014' }></CustomLine></Col> */}
        <Col><CustomLine data={data} year='2014' metric='Unemployment Rate'></CustomLine></Col>
      </Row>
    </Container>

      // <div>
      //   <div class="row bg-light">
      //   <h1>Centro Capital, for all your financial info</h1>
      //   </div>
      //         {/* No extra definition of column and row sizes as they naturally flex avoiding overflow with bootstrap*/}
      //         <div class="row p-3">
      //       <div class="col d-inline-block mr-3 p-3 bg-secondary rounded">
      //         <h1> Bar Chart in container grid</h1>
      //            <CustomBar data={dailydata}></CustomBar>
      //       </div>
      //       <div class="col d-inline-block mr-3 p-3 bg-dark rounded">
      //         <h1>  Line Chart in container grid</h1>
      //         <CustomLine data={input}></CustomLine>
      //       </div>
      //       <div class="row p-3">
      //       <div class="col d-inline-block mr-3 p-3 bg-success rounded">
      //         <CustomBar data={dailydata}></CustomBar>
      //       </div>
      //       <div class="col d-inline-block mr-3 p-3 bg-secondary rounded">
      //         <CustomBar data={dailydata}></CustomBar>
      //       </div>
      //       </div>
      // </div>
      // </div>
  );
};

export default Home;


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
