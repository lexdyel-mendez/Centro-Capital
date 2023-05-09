import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CRow } from '@coreui/react';
function Welcome() {

    return (
        <div style={{background: 'linear-gradient(to bottom, #f8f9fa, #85a78c)' }}>
        <Container>
            <Row className=" d-flex align-items-center justify-content-center">
                <Col className=" d-flex align-items-center justify-content-center"><h2>Centro Capital is a student project that intends to promote the knowledge of well-being in Puerto Rico</h2></Col>
                <Col className=" d-flex align-items-center justify-content-center"><h4>Feedback is a quintessential part of growing so please let us know your thoughts</h4></Col>
                </Row>
               <h6>Feel free to contact us at: juan.diaz28@upr, adean.colon@upr.edu, or lexdyel.mendez@upr.edu</h6>
        
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdreUsik8fmSbtcpQJNR74Xyxj_KGa6kD4TJ_94gQHemmo92Q/viewform?embedded=true" width="640" height="1940" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        <CRow className='m-4'></CRow>
          <CRow className='m-4'></CRow>
        </Container>
        </div>
    )
}

export default Welcome;