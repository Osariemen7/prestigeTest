import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, Heading, Button, Stack, SimpleGrid, Text } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2';
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend, ChartDataLabels);



const Dashboard =()=>{
  const [users, setUsers] = useState('');
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      y: {
        display: false, // Remove y-axis labels
      },
    },
  };
  
  const data = {
labels: ["Day", "Week", "Month"],
    datasets: [
      {
        label: "Current",
        data: [ users.today_expense, users.wk_expense, users.mn_expense],
        backgroundColor: "#6179cc",
        barThickness: 20
      },
      {
        label:'Previous',
        data:[users.yesterday_expense,users.last_wk_expense, users.last_mn_expense],
        backgroundColor:'#111a37',
        barThickness: 20
      },
  
    ],
  
  };
  options.plugins.datalabels = {
    display: true,
    color: "black",
    formatter: Math.round,
    anchor: "end",
    offset: -20,
    align: "start",
  };
  const option = {
    responsive: true,
    plugins: {
      legend: { position: "left" },
      title: {
        display: true,
        text: "Performance Chart",
      },
    },
    scales: {
      y: {
        display: false, // Remove y-axis labels
      },
    },
  };
  
  const dat = {
labels: ["Day", "Week", "Month"],
    datasets: [
      {
        label: "Current",
        data: [ users.daily_revenue, users.wk_revenue, users.mn_revenue],
        backgroundColor: "#6179cc",
        barThickness: 20
      },
      {
        label:'Previous',
        data:[users.yesterday_revenue,users.last_wk_revenue,users.last_mn_revenue],
        backgroundColor:'#111a37',
        barThickness: 20
      },
      {
        label: 'Target',
        data: [users.daily_rev_target,users.wk_rev_target, users.mn_rev_target],
        backgroundColor:'#8870B9',
        barThickness: 20        
      }
  
  
    ],
  
  };
  option.plugins.datalabels = {
    display: true,
    color: "black",
    formatter: Math.round,
    anchor: "end",
    offset: -20,
    align: "start",
  };

  const optio = {
    responsive: true,
    plugins: {
      legend: { position: 'chartArea'
  },
      title: {
        display: true,
        text: "Performance Chart",
      },
    },
    scales: {
      y: {
        display: false, // Remove y-axis labels
      },
    },
  };
  
  const da = {
labels: ["Day", "Week", "Month"],
    datasets: [
      {
        label: "Current",
        data: [ users.today_sales, users.wk_sales, users.mn_sales],
        backgroundColor: "#6179cc",
        barThickness: 20
      },
      {
        label:'Previous',
        data:[users.yesterday_sales,users.last_wk_sales,users.last_mn_sales],
        backgroundColor:'#111a37',
        barThickness: 20
      },
      
    ],
  
  };
  optio.plugins.datalabels = {
    display: true,
    color: "black",
    formatter: Math.round,
    anchor: "end",
    offset: -20,
    align: "start",
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
      let response = await fetch("https://sandbox.prestigedelta.com/analytics/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      let respon = await fetch("https://sandbox.prestigedelta.com/businessprofile/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      respon = await respon.json()
      response = await response.json()
      localStorage.setItem('user-info', JSON.stringify(tok))
      if (response.status === 401){
        navigate('/components/login')
      } else {
        setLoading(false)
     setUsers(response)
     setInfo(respon)
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [])
    
    console.log(info)
    
    
//   useEffect(() => {
//     fetch('https://sandbox.prestigedelta.com/accounts/')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error(error));
//     }, []);
//     let wark = JSON.stringify(data)
let wark =users[0]

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
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <p className='dfp'>Log Out</p></Link>
                    </li>    
                </ul>
            </nav>
           
            <div>
            <Button colorScheme='black' variant='outline'>{info[0].business_name}</Button>
            <Heading size='md' >Analytics</Heading>
            </div>
            <Card backgroundColor='#eff1fa' m={3} >
                <Heading size='sm'>Sales</Heading>
               <Bar data={da} options={optio} />
               <Text fontSize='12px'>Today's Revenue Per Sales - ₦{parseFloat(users.today_rps).toLocaleString('en-US')}</Text>
               <Text fontSize='12px'>This Week's Revenue Per Sales - ₦{parseFloat(users.wk_rps).toLocaleString('en-US')}</Text>
               <Text fontSize='12px'>This Month's Revenue Per Sales - ₦{parseFloat(users.mn_rpc).toLocaleString('en-US')}</Text>
            </Card>
            <Card backgroundColor='#eff1fa' m={3} >
                <Heading size='sm'>Revenue</Heading>
               
               <Bar data={dat} options={option} />
            </Card>
      
            <Card backgroundColor='#eff1fa' m={3} >
                <Heading size='sm'>Expense</Heading>
               
               <Bar data={data} options={options} />
            </Card>
            
            <Card backgroundColor='#eff1fa' m={3} p={2}>
              <SimpleGrid m={2} spacing={4} templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
                <Card backgroundColor=' #c9d4f5' p={2}>
                  <Heading fontSize='12px'>No of Customers Today</Heading>
                  <Text fontSize='14px'>{users.today_customer_count}</Text>
                <Text fontSize='12px'>No of new Customers today - {users.today_new_customer}</Text>
                </Card>
                <Card backgroundColor=' #c9d4f5' p={2}>
                  <Heading fontSize='12px'>No of Customers for the Week</Heading>
                  <Text fontSize='14px'>{users.wk_customer_count}</Text>
                <Text fontSize='12px'>No of new Customers for the Week - {users.wk_new_customer}</Text>
                </Card>
                <Card backgroundColor=' #c9d4f5' p={2}>
                <Heading fontSize='12px'>No of Customers for the Month</Heading>
                  <Text fontSize='14px'>{users.mn_customer_count}</Text>
                <Text fontSize='12px'>No of new Customers for the Month - {users.mn_new_customer}</Text>
                </Card>
                <Card backgroundColor=' #c9d4f5' p={2} >
                  <Heading fontSize='12px'>Today's Revenue Per Customer- ₦{parseFloat(users.today_rpc).toLocaleString('en-US')}</Heading>
                  <Text fontSize='12px'>Weekly Revenue Per Customer - ₦{parseFloat(users.wk_rpc).toLocaleString('en-US')}</Text>
                  <Text fontSize='12px'>Monthly Revenue Per Customer -₦{parseFloat(users.mn_rpc).toLocaleString('en-US')}</Text>
                </Card>
              </SimpleGrid>
            </Card>
            </ChakraProvider>   
        </div>
    )
}
export default Dashboard