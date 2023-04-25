import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomBar from "../components/CustomBar";
import CustomLine from '../components/CustomLine'
import CustomPie from '../components/CustomPie';
import CustomArea from '../components/CustomArea';
import CustomCompareBar from '../components/CustomCompareBar';

const input = [
  // Daily data
  { name: '01', uv: 4000, pv: 2400, amt: 2400, period: 'daily' },
  { name: '02', uv: 3000, pv: 1398, amt: 2210, period: 'daily' },
  // Weekly data
  { name: 'Week 1', uv: 8000, pv: 4800, amt: 4800, period: 'weekly' },
  { name: 'Week 2', uv: 6000, pv: 2796, amt: 4420, period: 'weekly' },
  // Monthly data
  { name: 'Jan', uv: 24000, pv: 14400, amt: 14400, period: 'monthly' },
  { name: 'Feb', uv: 18000, pv: 8396, amt: 13260, period: 'monthly' },
  // Quarterly data
  { name: 'Q1', uv: 72000, pv: 43200, amt: 43200, period: 'quarterly' },
  // Yearly data
  { name: '2022', uv: 288000, pv: 172800, amt: 172800, period: 'yearly' },
];

const data = [
  {
    "month": "June",
    "gdp": 4000,
    "unemployment": 2400,
    "period": "2014"
  },
  {
    "month": "July",
    "gdp": 3000,
    "unemployment": 1398,
  },
  {
    "month": "August",
    "gdp": 2000,
    "unemployment": 9800,
  },
  {
    "month": "September",
    "gdp": 2780,
    "unemployment": 3908,
  },
  {
    "month": "October",
    "gdp": 1890,
    "unemployment": 4800,
  },
  {
    "month": "November",
    "gdp": 2390,
    "unemployment": 3800,
  },
  {
    "month": "December",
    "gdp": 3490,
    "unemployment": 4300,
  }
]
// function submitForm(ev) {
//   let selectInputs = document.querySelectorAll('select');
//   let res = [];
//   selectInputs.forEach(input => {
//    res.push(input.value)
//   })
//   console.log(res)
//   return res;
// }
// console.log(document.getElementById("submit"))
function handleSubmit(e) {
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);

  // Or you can work with it as a plain object:
  const formJson = Object.fromEntries(formData.entries());
  console.log(Object.keys(formJson).length);
  console.log(document.getElementById("form_name"))
}

const Compare = () => {

    return (   
    <Container id="compareContainer">
      <form name="form_name" id="form_name" onSubmit={handleSubmit}>
      <p>
        Checkbox buttons:
        <label>
        Checkbox 1 : <input type="checkbox" name="check1"/>
        Checkbox 2 : <input type="checkbox" name="check2"/>
        Checkbox 3: <input type="checkbox" name="check3" />
      </label>
      </p>
      <button type="submit">Submit form</button>
      </form>
      {/* <Row className="m-4"> */}
        {/* <Col className="bg-light m-4 rounded"> 
        <CustomCompareBar></CustomCompareBar>
        
        </Col> */}
        {/* <Col className="bg-secondary m-4 rounded"> test</Col> */}
      {/* </Row> */}
      {/* <Row className="m-4">
        <Col className="bg-warning m-4 rounded"> another</Col>
        <Col className="bg-info m-4 rounded"> bingo</Col>
      </Row> */}
    </Container>
    )
  };
  
  export default Compare;

  // function filterData(period) {
//   return allData.filter((data) => data.period === period);
// }

// const Home = () => {

//   const [data, setData] = useState(filterData('daily'));

//   return (
//     <div>
//       <h1>Time Period Bar Chart using Recharts</h1>
//       <div>
//         <button onClick={() => setData(filterData('daily'))}>Daily</button>
//         <button onClick={() => setData(filterData('weekly'))}>Weekly</button>
//         <button onClick={() => setData(filterData('monthly'))}>Monthly</button>
//         <button onClick={() => setData(filterData('quarterly'))}>Quarterly</button>
//         <button onClick={() => setData(filterData('yearly'))}>Yearly</button>
//       </div>
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="pv" fill="#8884d8" />
//         <Bar dataKey="uv" fill="#82ca9d" />
//         {/* <Line dataKey="pv" fill="#8884d8" />
//         <Line dataKey="uv" fill="#82ca9d" /> */}
//       </BarChart>
//     </div>
//   );
// };