import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, Heading, Button, Stack, SimpleGrid, Text } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2';
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Select from "react-select";


ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend, ChartDataLabels);



const Dashboard =()=>{
  const [users, setUsers] = useState([])
  const [infos, setInfos] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  const [mon, setMon] = useState([])
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)
  const mont = ['DAILY', 'WEEKLY', 'MONTHLY'];
 const opt = mont.map((p) => ({
   label: p,
   value: p,
 }))

 const term = (selectedValue, users, infos, mon) => {
  let val;

  if (selectedValue.label === 'Weekly') {
    val = infos ;
  }else if(selectedValue.label === 'Monthly'){
    val = mon
  }
   else {
    val = users;
  }

  return val;
};
let sure = term(selectedValue, users, infos, mon)
const lastSeven = sure.slice(-7)
let data = {
  labels: lastSeven.map((user) => user.start_day),
  datasets: [],
};

if (sure.length >= 7) {
  const lastSevenUsers = sure.slice(-7);

  data.datasets.push({
    label: "Revenue",
    backgroundColor: "#00d2ff",
    borderColor: "#6179cc",
    borderWidth: 1,
    data: lastSevenUsers.map((user) => user.revenue),
  });
  data.datasets.push({
    label: "Revenue Target",
    backgroundColor: "#ADD8E6",
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 1,
    data: lastSevenUsers.map((user) => user.rev_target),
  });
} else {
  // Use default data if there are not enough data points in the users array
  data.datasets.push({
    label: "Revenue",
    backgroundColor: "#00d2ff",
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 1,
    data: sure.map((user) => user.revenue),
  });
  data.datasets.push({
    label: "Revenue Target",
    backgroundColor: "#ADD8E6",
    borderColor: "#6179cc",
    borderWidth: 1,
    data: sure.map((user) => user.rev_target),
  });
}
// Use the 'data' variable in the chart component

console.log(sure)
// Use the 'data' variable in the chart component

  const options = {
    scales: {
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };

 
  let sata = {

    labels: lastSeven.map((user) => user.start_day),
  datasets: [],
};
if (users.length >= 7) {
  const lastSevenUsers = sure.slice(-7);

  sata.datasets.push({
    label: "Revenue",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 1,
    data: lastSevenUsers.map((user) => user.expense),
  });
  sata.datasets.push({
    label: "Revenue Target",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
    data: lastSevenUsers.map((user) => user.expense_target),
  });
} else {
  // Use default data if there are not enough data points in the users array
  sata.datasets.push({
    label: "Expense",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 1,
    data: sure.map((user) => user.expense),
  });
  sata.datasets.push({
    label: "Expense Target",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
    data: sure.map((user) => user.expense_target),
  });
}
  
  // Use the 'data' variable in the chart component
  
  console.log(sure)
  // Use the 'data' variable in the chart component
  
    const option = {
      scales: {
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    };
    let cata = {
      labels: lastSeven.map((user) => user.start_day),
    datasets: [],
  };
  if (sure.length >= 7) {
    const lastSevenUsers = sure.slice(-7);
  
    cata.datasets.push({
      label: "New Customers",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: lastSevenUsers.map((user) => user.new_customers),
    });
    cata.datasets.push({
      label: "No of Customers",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      data: lastSevenUsers.map((user) => user.customer_count),
    });
  } else {
    // Use default data if there are not enough data points in the users array
    cata.datasets.push({
      label: "New Customers",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: sure.map((user) => user.new_customers),
    });
    cata.datasets.push({
      label: "No of customers",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      data: sure.map((user) => user.customer_count),
    });
  }
      const optio = {
        plugins: {
          title: {
            display: true,
            text: "Performance Chart",
          },
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
        },
      };
  
 let ata = {
        labels: lastSeven.map((user) => user.start_day),
      datasets: [],
    };
    if (sure.length >= 7) {
      const lastSevenUsers = sure.slice(-7);
    
      ata.datasets.push({
        label: "Sales",
        backgroundColor: "#50e0ff",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: lastSevenUsers.map((user) => user.sales),
      });
      
    } else {
      // Use default data if there are not enough data points in the users array
      ata.datasets.push({
        label: "Sales",
        backgroundColor: "#50e0ff",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: sure.map((user) => user.sales)
      });
      
    }
        const opti = {
          scales: {
            y: {
              display: false,
              beginAtZero: true,
            },
          },
        };
      
      const handleType = (selectedValue) => {
        setSelectedValue(selectedValue);
      };
 
  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
  let name = tok.user
  
  useEffect(() => {
    const handlePopstate = () => {
      // Navigate to the login page when a popstate event occurs
      navigate('/components/login');
    };
  
    // Add an event listener for popstate events
    window.addEventListener('popstate', handlePopstate);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [navigate]);

    
  const fetchData = async () => {
    let item ={refresh}
    let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(item)
    });
    rep = await rep.json();
    let bab = rep.access_token
  let response = await fetch("https://sandbox.prestigedelta.com/analytics/?duration=DAILY",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  let respons = await fetch("https://sandbox.prestigedelta.com/analytics/?duration=WEEKLY",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    let respon = await fetch("https://sandbox.prestigedelta.com/analytics/?duration=MONTHLY",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    let respo = await fetch("https://sandbox.prestigedelta.com/businessprofile/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      respo = await respo.json()
   respon = await respon.json()
   respons = await respons.json()
  response = await response.json()
  localStorage.setItem('user-info', JSON.stringify(tok))
  if (response.status === 401){
    navigate('/components/login')
  } else {
    setLoading(false)
 setUsers(response)
 setInfo(respo)
  setInfos(respons)
  setMon(respon)

  }
}
const daily=()=>{
  let rata
  if (selectedValue.value ==='WEEKLY'){
     rata = infos
  } else if(selectedValue.value === 'MONTHLY'){
    rata = mon
  } else{
    rata = users
  }
   data = {rata, selectedValue}
  
  
   navigate('/components/dashboard', {state:{data}})
}
const revenue=()=>{
  let rata
  if (selectedValue.value ==='WEEKLY'){
     rata = infos
  } else if(selectedValue.value === 'MONTHLY'){
    rata = mon
  } else{
    rata = users
  }
   data = {rata, selectedValue}
  
  
   navigate('/components/revenue', {state:{data}})
}
const expense=()=>{
  let rata
  if (selectedValue.value ==='WEEKLY'){
     rata = infos
  } else if(selectedValue.value === 'MONTHLY'){
    rata = mon
  } else{
    rata = users
  }
   data = {rata, selectedValue}
  
  
   navigate('/components/expense', {state:{data}})
}
const people=()=>{
  let rata
  if (selectedValue.value ==='WEEKLY'){
     rata = infos
  } else if(selectedValue.value === 'MONTHLY'){
    rata = mon
  } else{
    rata = users
  }
   data = {rata, selectedValue}
  
  
   navigate('/components/people', {state:{data}})
}
useEffect(() => {
  fetchData()
}, [])
//   useEffect(() => {
//     fetch('https://sandbox.prestigedelta.com/accounts/')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error(error));
//     }, []);
//     let wark = JSON.stringify(data)
let wark =users[0]

console.log(mon) 
console.log(users)

if(loading) {
  return(
  <p>Loading...</p>)}   
        
    return(
        <div>
        <ChakraProvider>
            <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    
                    <li className='nav-list'>
                    <Link to='/components/inventory' className='nav-text'><i class="fa-solid fa-house"></i>
                      <p className='dfp'>Home</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <p className='dfp'>Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/savings' className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <p className='dfp'>Sub-Account</p></Link>
                    </li>  
                    <li className='nav-list'>
                    <Link to='/components/customer' className='nav-text'><i class="fa-solid fa-people-roof"></i>
                      <p className='dfp'>Customers</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-chart-line"></i>
                    <p className='dfp'>Analytics</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                  <p className='dfp'>Project</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/chat' className='nav-text'><i class="fa-solid fa-user-tie"></i>
                  <p className='dfp'>Assistant</p></Link>
                    </li>

                    <li className='nav-list'>
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <p className='dfp'>Log Out</p></Link>
                    </li>    
                </ul>
            </nav>
           
            <div>
            <Button colorScheme='black' variant='outline'>{info[0].business_name}</Button>
            <Heading size='md' >Analytics</Heading>
            </div>
            <Card mt={2}>
            <Select 
      onChange={handleType}
      className="pnes"
      placeholder="Select Duration"
      options={opt}
      isSearchable={true}
      value={selectedValue} />
            <Card backgroundColor='#eff1fa' m={2} >
                <Heading size='sm'>Sales</Heading>
                <Bar data={ata}  options={opti} />
                <div>
                <Button mb={2} mt={1} colorScheme='blue' onClick={daily} variant='solid'>Report on Analytics</Button>
                </div>
            </Card>
            <Card backgroundColor='#eff1fa' m={3} >
                <Heading size='sm'>Revenue</Heading>
                <Bar data={data} options={options} />
                <Text fontSize='12px'> Revenue Per Sales - ₦{parseFloat(sure[0].rps).toLocaleString('en-US')}</Text>
               <Text fontSize='12px'>Revenue Per Customer - ₦{parseFloat(sure[0].rpc).toLocaleString('en-US')}</Text>
           <div><Button mb={2} mt={1} colorScheme='blue' onClick={revenue} variant='outline' >Report on Analytics</Button>
           </div></Card>
      
            <Card backgroundColor='#eff1fa' m={3} >
                <Heading size='sm'>Expense</Heading>
                <Bar data={sata}  options={option} /><div>
                <Button mb={2} mt={1} colorScheme='blue' onClick={expense} variant='solid'>Report on Analytics</Button>
                </div></Card>
            <Card backgroundColor='#eff1fa' m={3} >
                <Heading size='sm'>Customers</Heading>
                <Bar data={cata}  options={optio} />
               <div> <Button mb={2} mt={1} colorScheme='blue' onClick={people} variant='outline'>Report on Analytics</Button>
               </div>
            </Card>
            
            </Card>
           
            </ChakraProvider>   
        </div>
    )
}
export default Dashboard