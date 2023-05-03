import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomBar from "../components/CustomBar";
import CustomCompareLine from '../components/CustomCompareLine'
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

  const [unemploymentRate, setUnemploymentRate] = useState();
  const [unemploymentTotal, setUnemploymentTotal] = useState();
  const [employmentTotal, setEmploymentTotal] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/centro-capital/allUnemploymentYearly", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setUnemploymentRate(organizeData(doc));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const response = await fetch("/centro-capital/employmentTotalYearly", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setEmploymentTotal(organizeData(doc));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const response = await fetch("/centro-capital/unemploymentTotalYearly", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setUnemploymentTotal(organizeData(doc));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, []);

  if(!unemploymentRate || !unemploymentTotal || !employmentTotal){
    return <div>Loading...</div>
  }else{
    console.log(unemploymentTotal[0][unemploymentTotal[0]['metric']])
    return (
      <Container>
         <Row className="m-4">
          {/* <Col className="bg-primary m-4 rounded"> Bar Chart<CustomBar data={dailydata}></CustomBar></Col> */}
          {/* <Col className="bg-secondary m-4 rounded"><CustomLine data={data} year='2014' }></CustomLine></Col> */}
          <Col className="bg-light m-4 rounded"> {unemploymentRate[0]['metric']} for the year {unemploymentRate[unemploymentRate.length-1]['year']}<CustomCompareLine data={unemploymentRate} year={unemploymentRate[unemploymentRate.length-1]['year']} firstMetric={unemploymentRate[0]['metric']}></CustomCompareLine></Col>
          <Col className="bg-light m-4 rounded"><CustomPie data01={unemploymentTotal.length-12} dataKey01={unemploymentTotal[0][unemploymentTotal[0]['metric']]} nameKey01={unemploymentTotal[0]['metric']}></CustomPie></Col>
          {/* <Col className="bg-light m-4 rounded"><CustomPie data01={unemploymentTotal[0]} dataKey01={unemploymentTotal[unemploymentTotal.length-1][unemploymentTotal[0]['metric']]} nameKey01={unemploymentTotal[0]['metric']} ></CustomPie></Col> */}
        </Row>
      </Container>
    );
  }

};

export default Home;


