import React, { useState , useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomLine from '../components/CustomLine'


function organizeData(inputData){
  //data filter after extraction START
  const finalValArr=[]
  for(const key of Object.keys(inputData).slice(0,9)){
    const currYears = {}
    const currMonths = {}
    currYears['year'] = key

    for(const [innerKey, innerValue] of Object.entries(inputData[key])){
      currYears[innerKey] = innerValue
    }
//    currYears['months'] = currMonths

    finalValArr.push(currYears)
//    console.log(finalValArr)
  }
  //data filter after extraction END
//  console.log(finalValArr)
  return  finalValArr
}

const Compare = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/centro-capital/allUnemploymentYearly", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setData(organizeData(doc));
          console.log(organizeData(doc))
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

//  console.log(typeof Object.keys(data))

  return (
    <Container>
    {data && (
      <Row className="m-4">
        <Col className="bg-secondary m-4 rounded">
          <CustomLine data={data} />
        </Col>
      </Row>
    )}
  </Container>
  );
};

export default Compare;
