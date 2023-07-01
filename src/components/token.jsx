import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function YourComponent() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  let tok= JSON.parse(localStorage.getItem("user-info"));
    const terms = (tok) => {
       let refreshval;

  if ( tok === null || typeof tok === "undefined" ) {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)

const fetchDa = async () => {
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
  let response = await fetch("https://sandbox.prestigedelta.com/getbanklist/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  //localStorage.setItem('user-info', JSON.stringify(tok))

  if (response.status === 401) {
    navigate('/components/login');
  } else {  
  response = await response.json();
  setLoading(false)
  setInfo(response)
    }}
    useEffect(() => {
      fetchDa()
    }, [])

    const handleBank = (selectedOption) => {
      setSelectedOption(selectedOption);
    };
  
    const options = info.map((item) => ({
      label: item.bank_name,
      value: item.bank_code,
    }));
    console.log(selectedOption.value)
if(loading){
  return(
    <div>Loading...</div>
  )
}
  return (
    <div>
      <Select
      onChange={handleBank}
      className="line"
      placeholder="Select Bank"
      options={options}
      isSearchable={true}
      value={selectedOption}
    />
  
    </div>
  );
}

export default YourComponent;
