import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomBar from "../components/CustomBar";
import CustomCompareLine from '../components/CustomCompareLine'
import CustomPie from '../components/CustomPie';
import CustomArea from '../components/CustomArea';
import { initGA, trackPageView } from '../analytics';
import ReactGA from 'react-ga';

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
    console.log(data)
    return (

      <Container>
         <Row className="m-4">
          {/* <Col className="bg-primary m-4 rounded"> Bar Chart<CustomBar data={dailydata}></CustomBar></Col> */}
          {/* <Col className="bg-secondary m-4 rounded"><CustomLine data={data} year='2014' }></CustomLine></Col> */}
          <Col><CustomCompareLine data={data} year={data[data.length-1]['year']} firstMetric={data[0]['metric']}></CustomCompareLine></Col>
        </Row>
      </Container>
    );
  }

};

export default Home;


