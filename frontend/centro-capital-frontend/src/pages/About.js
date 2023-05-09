import { CSpinner, CCard, CCardTitle, CCardLink, CRow, CCol, CCardBody, CCardFooter, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CListGroup, CListGroupItem } from '@coreui/react';
import Container from 'react-bootstrap/Container';
const About = () => {
  return (
    <div className="about" style={{ background: 'linear-gradient(to bottom, #f8f9fa, #85a78c)' }} >
      <div>
        <Container>
          <CRow >
            <CCol>
              <CCard style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <CCardTitle style={{ height: '100%', display: 'flex', alignItems: 'center' }}> <h1>About Us:</h1> </CCardTitle>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardBody >  Welcome to Centro Capital, a capstone project designed
                  to be the main destination for exploring
                  and analyzing key economic indicators regarding Puerto Rico's
                  well-being. Our mission is to provide a comprehensive, accessible, and
                  user-friendly platform for researchers, policymakers, students, and
                  anyone interested in understanding the economic landscape of Puerto
                  Rico. </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className='m-4'>
            <CCol>
              <CCard style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <CCardTitle style={{ height: '100%', display: 'flex', alignItems: 'center' }}> <h1>Our Team:</h1> </CCardTitle>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardBody >
                  We are a team of three university students studying software
                  engineering. Our diverse skillset and backgrounds enable us to combine
                  our expertise to create this new tool that contributes to the
                  ongoing discussion about Puerto Rico's economy.
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>


          <CRow className='m-4'>
            <CCol>
              <CCard style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <CCardTitle style={{ height: '100%', display: 'flex', alignItems: 'center' }}> <h1>Our Platform:</h1> </CCardTitle>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardBody >
                  The platform features a comprehensive and organized collection of
                  various economic indicators, which are crucial for assessing the
                  well-being of Puerto Rico. These indicators cover key areas such as
                  GDP, employment, inflation, poverty rates, and more. By providing a
                  holistic view of the economy, our platform facilitates informed
                  decision-making and encourages constructive debate amongst individuals and organizations.
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className='m-4'>
            <CCol>
              <CCard style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <CCardTitle style={{ height: '100%', display: 'flex', alignItems: 'center' }}> <h1>Features include:</h1> </CCardTitle>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardBody >
                  <CListGroup flush>
                    <CListGroupItem>
                      <CAccordion activeItemKey={1}>
                        <CAccordionItem itemKey={1}>

                          <CAccordionHeader>Interactive data visualization</CAccordionHeader>
                          <CAccordionBody>Our team has carefully
                            crafted intuitive and engaging visualizations to help users explore
                            and analyze data more effectively.</CAccordionBody>

                        </CAccordionItem>
                        <CAccordionItem itemKey={2}>

                          <CAccordionHeader>Data-driven insights</CAccordionHeader>
                          <CAccordionBody>          Data-driven insights: Our team strives to provide
          up-to-date, data-driven insights, ensuring that our platform
          remains a reliable source of information.</CAccordionBody>

                        </CAccordionItem>
                        <CAccordionItem itemKey={3}>

                          <CAccordionHeader>Customizable experience</CAccordionHeader>
                          <CAccordionBody>Users can easily customize their experience
          on our platform, selecting specific indicators and timeframes to
          generate tailored reports and analyses. Additionally, users can compare metrics against each other
          for further analysis.</CAccordionBody>

                        </CAccordionItem>
                        <CAccordionItem itemKey={4}>

                          <CAccordionHeader>Continuous updates</CAccordionHeader>
                          <CAccordionBody>As our database grows, our team remains committed
          to keeping our platform up-to-date with the latest economic data and
          trends.</CAccordionBody>

                        </CAccordionItem>

                      </CAccordion>

                    </CListGroupItem>
                  </CListGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>


          <CRow className='m-4'>
            <CCol>
              <CCard style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <CCardTitle style={{ height: '100%', display: 'flex', alignItems: 'center' }}> <h1>Contact us:</h1> </CCardTitle>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardBody >
                  We value your feedback and would love to hear from you! If you have any
                  questions, comments, or suggestions, please feel free to reach out to
                  us at
                  <CListGroup flush>
                    <CListGroupItem>adean.colon@upr.edu</CListGroupItem>
                    <CListGroupItem>juan.diaz28@upr.edu</CListGroupItem>
                    <CListGroupItem>lexdyel.mendez@upr.edu</CListGroupItem>

                  </CListGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className='m-4 mb-4'>
            <CCard>
              <CCardBody >
                Join us in our journey to illuminate the economic landscape of Puerto
                Rico and contribute to its growth and development. Welcome to Centro
                Capital.
              </CCardBody>
            </CCard>
          </CRow>

          <CRow className='m-4'></CRow>
          <CRow className='m-4'></CRow>
        </Container>
      </div>
    </div>
  );
};

export default About;