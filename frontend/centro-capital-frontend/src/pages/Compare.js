import React, { useEffect, useState } from "react";


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
  })

  console.log(data)
  console.log(typeof data)


  return (
    <div>
      <p>hi</p>
    </div>
  )

};

export default Compare;