import React from 'react'
import CustomBar from './CustomBar'
export default function Grid () {
  
  return (

    <div className="container">
        {/* No extra definition of column and row sizes as they naturally flex avoiding overflow */}
        <div class="row">
            <div class="col">
                 <CustomBar></CustomBar>
            </div>
            <div class="col">
            <CustomBar></CustomBar>
            </div>
            <div class="col">
            <CustomBar></CustomBar>
            </div>
    </div>

    </div>
  )
}