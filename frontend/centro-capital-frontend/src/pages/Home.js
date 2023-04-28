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

let localdata= {"2014":{"JULY":"14.7","AUGUST":"14.9","SEPTEMBER":"15.1","OCTOBER":"14.7","NOVEMBER":"14.1","DECEMBER":"15.4","JANUARY":"14.4","FEBRUARY":"14.6","MARCH":"14.2","APRIL":"13.4","MAY":"13.6","JUNE":"12.8"},
"2015":{"JULY":"13.9","AUGUST":"15.3","SEPTEMBER":"15.1","OCTOBER":"13.7","NOVEMBER":"13.6","DECEMBER":"12","JANUARY":"10.8","FEBRUARY":"11.2","MARCH":"12.5","APRIL":"12.6","MAY":"12.3","JUNE":"12.6"},
"2016":{"JULY":"11.1","AUGUST":"12.3","SEPTEMBER":"12.2","OCTOBER":"14.1","NOVEMBER":"11.7","DECEMBER":"10.3","JANUARY":"11.1","FEBRUARY":"11.6","MARCH":"12.2","APRIL":"11.4","MAY":"11.2","JUNE":"10.8"},
"2017":{"JULY":"12.4","AUGUST":"12","SEPTEMBER":"13.1","OCTOBER":"12.5","NOVEMBER":"10.9","DECEMBER":"12","JANUARY":"11.6","FEBRUARY":"11.3","MARCH":"11","APRIL":"11.5","MAY":"10.3","JUNE":"9.4"},
"2018":{"JULY":"10.5","AUGUST":"11.8","SEPTEMBER":"11","OCTOBER":"11.4","NOVEMBER":"10.4","DECEMBER":"9.9","JANUARY":"10.7","FEBRUARY":"10","MARCH":"9.8","APRIL":"9.4","MAY":"9.3","JUNE":"9.2"},
"2019":{"JULY":"9.5","AUGUST":"9.2","SEPTEMBER":"8.7","OCTOBER":"8.3","NOVEMBER":"7.7","DECEMBER":"8.5","JANUARY":"8","FEBRUARY":"9","MARCH":"9.3","APRIL":"7.8","MAY":"7.8","JUNE":"8"},
"2020":{"JULY":"7.9","AUGUST":"7","SEPTEMBER":"8.2","OCTOBER":"9","NOVEMBER":"8.5","DECEMBER":"9.2","JANUARY":"9.6","FEBRUARY":"7.8","MARCH":"8.4","APRIL":"9","MAY":"9.6","JUNE":"8.5"},
"2021":{"JULY":"7.3","AUGUST":"8.5","SEPTEMBER":"9.4","OCTOBER":"8.5","NOVEMBER":"9.5","DECEMBER":"10.6","JANUARY":"9.1","FEBRUARY":"7.9","MARCH":"7.4","APRIL":"7.1","MAY":"8.1","JUNE":"8.2"},
"2022":{"JULY":"9.3","AUGUST":"9.2","SEPTEMBER":"7.9","OCTOBER":"7.1","NOVEMBER":"7.3","DECEMBER":"6.7","JANUARY":"6.4","FEBRUARY":"6","MARCH":"5.8","APRIL":"5.8","MAY":"5.9","JUNE":"5.8"},
"metric style":"Labor Force (%)","metric":"Unemployment Rate","source":" • Source: Dept. of Labor and Human Resources, Household Survey"
}

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
    fetchData()
  }, []);

  if(!data){
    return <div>Loading...</div>
  }else{
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
  }


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
