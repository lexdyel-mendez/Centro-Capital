import React, { useEffect, useState } from "react";

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

const Compare = () => {

  const [data, setdata] = useState();

  useEffect(() => {
    fetch("/centro-capital/allUnemploymentYearly",
    {method: 'GET'}).then(response => {
      if (response.status == 200) {
        return response.json()
      }
    }).then(data => setdata(data))
    .then(error => console.log(error))
  },[])


  console.log(data)
  console.log(typeof data)

  console.log(organizeData(data))


  return (
    <div>
    <p>x</p>
    </div>
  )

};

export default Compare;