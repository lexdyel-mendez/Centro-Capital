import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { CSpinner, CCard, CCardTitle, CCardLink, CRow, CCol, CCardBody, CCardFooter } from '@coreui/react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomBar from "../components/CustomBar";
import CustomCompareLine from '../components/CustomCompareLine'
import CustomPie from '../components/CustomPie';
import CustomArea from '../components/CustomArea';

function organizeLineData(inputData) {
  //data filter after extraction START
  if (inputData) {
    const finalValArr = []
    const monthArr = ["JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE"]
    for (const key of Object.keys(inputData).slice(0, 9)) {
      for (const month of monthArr) {
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

function organizePieData(data01, data02) {
  if (data01 && data02) {
    const finalData = []
    const data01Latest = data01['2022']
    const data02Latest = data02['2022']


    const dic01 = new Object()
    const dic02 = new Object()

    dic01['metric'] = data01['metric']
    dic02['metric'] = data02['metric']

    dic01['value'] = data01Latest['DECEMBER']
    dic02['value'] = data02Latest['DECEMBER']

    dic01['year'] = '2022'
    dic02['year'] = '2022'

    dic01['month'] = "DECEMBER"
    dic02['month'] = "DECEMBER"

    finalData.push(dic01, dic02)

    return finalData
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
          setUnemploymentRate(organizeLineData(doc));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const response = await fetch("/centro-capital/employmentTotalYearly", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setEmploymentTotal(doc);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const response = await fetch("/centro-capital/unemploymentTotalYearly", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setUnemploymentTotal(doc);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }


      
    }
    fetchData()
  }, []);

  if (!unemploymentRate || !unemploymentTotal || !employmentTotal) {
    return (
      <CSpinner color="secondary" className="justify-center">Fetching data...</CSpinner>
    );
  } else {
    const pie1 = organizePieData(unemploymentTotal, employmentTotal)

      return (
        <Container>
          <CRow id="firstRow"className="mb-4 mt-4">
            <CCol xs="12" sm="6" md="6" lg="6">
              <CCard className="bg-light">
                <CCardBody>
                  <CCardTitle>{unemploymentRate[0]['metric']} for the year {unemploymentRate[unemploymentRate.length - 1]['year']}</CCardTitle>
                  <CustomCompareLine data={unemploymentRate} year={unemploymentRate[unemploymentRate.length - 1]['year']} firstMetric={unemploymentRate[0]['metric']}></CustomCompareLine>
                </CCardBody>
                <CCardFooter style={{ textAlign: 'right' }}>
                <CCardLink href="/insights" className='text-info'>Additional insights {'>'}</CCardLink>
                </CCardFooter>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6" md="6" lg="6">
              <CCard className="bg-light">
                <CCardBody>
                  <CCardTitle>{pie1[0]['month'].charAt(0) + pie1[0]['month'].slice(1).toLowerCase()} {pie1[0]['year']} Employment (000s) </CCardTitle>
                  <CustomPie data={pie1}></CustomPie>
                </CCardBody>
                <CCardFooter style={{ textAlign: 'right' }}>
                <CCardLink href="/insights" className='text-info'>Additional insights {'>'}</CCardLink>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>

          <CRow id="secondRow" className="mb-5 mt-4">
            <CCol xs="12" sm="6" md="6" lg="6">
              <CCard>
                <CCardBody>
                  <CCardTitle>Card 3</CCardTitle>
                  <CustomArea></CustomArea>
                </CCardBody>
                <CCardFooter style={{ textAlign: 'right' }}>
                <CCardLink href="/insights" className='text-info'>Additional insights {'>'}</CCardLink>
                </CCardFooter>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6" md="6" lg="6">
              <CCard>
                <CCardBody>
                  <CCardTitle>Card 4</CCardTitle>
                </CCardBody>
                <CCardFooter style={{ textAlign: 'right' }}>
                <CCardLink href="/insights" className='text-info'>Additional insights {'>'}</CCardLink>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>


        </Container>
      );
  }


};

export default Home;


