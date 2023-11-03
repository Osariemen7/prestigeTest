import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Select from "react-select";

const BarChart = () => {
  const [loading, setLoading] = useState('')
  const [users, setUsers] = useState([])
  const [infos, setInfos] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  const [mon, setMon] = useState([])
  const navigate = useNavigate()
  
  console.log(users)

  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
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
  let respons = await fetch("https://sandbox.prestigedelta.com/analytics/?duration=WEEKLY",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    let respon = await fetch("https://sandbox.prestigedelta.com/analytics/?duration=MONTHLY",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    
   respon = await respon.json()
   respons = await respons.json()
  response = await response.json()
  localStorage.setItem('user-info', JSON.stringify(tok))
  if (response.status === 401){
    navigate('/components/login')
  } else {
    setLoading(false)
 setUsers(response)

  setInfos(respons)
  setMon(respon)

  }
}

useEffect(() => {
  fetchData()
}, [])

console.log(selectedValue)
 // Declare data variable
 const mont = ['Daily', 'Weekly', 'Monthly'];
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
const lastSeven = sure.slice(-7);
const lastSeve = sure.slice(-7);
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
    data: lastSevenUsers.map((user) => user.revenue),
  });
  sata.datasets.push({
    label: "Revenue Target",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
    data: lastSevenUsers.map((user) => user.rev_target),
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
      data: users.map((user) => user.new_customers),
    });
    cata.datasets.push({
      label: "No of customers",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      data: users.map((user) => user.customer_count),
    });
  }
      const optio = {
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
  if(loading) {
    return(
    <p>Loading...</p>)}   
  
  return (
    <div>
    <Select
      onChange={handleType}
      className="pne"
      placeholder="Daily"
      options={opt}
      isSearchable={true}
      value={selectedValue} />
      <h2>Sales and Revenue for the Last Seven Days</h2>
      <Bar data={data}  options={options} />
      <h2>Sales and Revenue for the Last Seven Days</h2>
      <Bar data={sata}  options={option} />
      <h2>Sales and Revenue for the Last Seven Days</h2>
      <Bar data={cata}  options={optio} />
      <h2>Sales and Revenue for the Last Seven Days</h2>
      <Bar data={ata}  options={opti} />
    </div>
  );
};

export default BarChart;
