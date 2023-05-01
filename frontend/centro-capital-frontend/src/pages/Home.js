import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomBar from "../components/CustomBar";
import CustomLine from '../components/CustomLine'
import CustomPie from '../components/CustomPie';
import CustomArea from '../components/CustomArea';

function organizeData(inputData){
  //data filter after extraction START
  const finalValArr=[]
  for(const key of Object.keys(inputData).slice(0,9)){
    const currYears = new Object()
    currYears['year'] = key
    for(const [innerKey, innerValue] of Object.entries(inputData[key])){
      currYears[innerKey] = innerValue
    }
  }
  //data filter after extraction END
  return  finalValArr
}

const areadata = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];
const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1398
  },
  {
    "name": "Group D",
    "value": 9800
  },
  {
    "name": "Group E",
    "value": 3908
  },
  {
    "name": "Group F",
    "value": 4800
  }
];
const input = [
  {
    name: '2014',
    unemployment: 4,
    gdp: 3,
  },
  {
    name: '2015',
    unemployment: 5,
    gdp: 3.2,
  },
  {
    name: '2016',
    unemployment: 5,
    gdp: 7,
  },
];
const dailydata = [
  // Daily data
  { name: '01', uv: 4000, pv: 2400, amt: 2400, period: 'daily' },
  { name: '02', uv: 3000, pv: 1398, amt: 2210, period: 'daily' },
]
// function filterData(period) {
//   return allData.filter((data) => data.period === period);
// }



const Home = () => {
  return (
    <Container id="containerID">
       <Row className="m-4">
        <Col className="bg-primary m-4 rounded"> Bar Chart<CustomBar data={dailydata}></CustomBar></Col>
        <Col className="bg-secondary m-4 rounded"><CustomLine data={input}></CustomLine></Col>
      </Row>
      <Row className="m-4">
        <Col className="bg-warning m-4 rounded"><CustomArea data={areadata}></CustomArea></Col>
        <Col className="bg-info m-4 rounded"> <CustomPie data01={data01} data02={data02}></CustomPie></Col>
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