import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

  
const GetGroup =()=>{
  const [info, setInfo] = useState([])
  const [infos, setInfos] = useState([]);
  const [nuban, setNuban] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [narration, setNarration] = useState('')
  const [pin_id, setPinid] = useState('')
  const [message, setMessage] = useState('')
  const [selectedOptions, setSelectedOptions] = useState('')
  const navigate = useNavigate();
  
  const option = [
    ...infos.map((item) => ({
      label: item.name,
      value: item.name,
    })),
    {
      value: 'main',
      label: 'Main Account',
    },
  ];
  const handleBanks = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
   
  const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleNote =(event)=>{
    setNarration(event.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    let data ={amount, selectedOption, sub_account, nuban, users, narration, pin_id}
    if (typeof users !=='object' || narration.length < 1 || users.length < 1 || amount.length < 1 || sub_account < 1){
      setMessage('All Fields must be Filled')
    }
    else {
    
    navigate('/components/getgrp2', {state:{data}})
  }}

  const handleAcct =(event)=> {
    setNuban(event.target.value)
}
const handleAmount=(event)=> {
  setAmount(event.target.value)
}

const fetchDap = async () => {
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
let response = await fetch("https://sandbox.prestigedelta.com/subaccount/",{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})
//localStorage.setItem('user-info', JSON.stringify(tok))

if (response.status === 401) {
  navigate('/components/login');
} else { 
 
response = await response.json();
setLoading(false)
setInfos(response)

  }}
  useEffect(() => {
    fetchDap()
  }, [])

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
const debit = (selectedOptions) => {
  let menu
  if (selectedOptions.value === 'main'){
      menu = true;
  }else{
      menu = false
  }
  return menu
}
let sub_account = debit(selectedOptions)

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
    const options = info.map((item) => ({
      label: item.bank_name,
      value: item.bank_code,
    }));
   
    const teams = (selectedOption) => {
      let ref;

        if ( selectedOption=== null || typeof selectedOption=== "undefined" ) {
           ref = 0;
            } else {
           ref= selectedOption.value;
         }
          return ref}
       let bank_code = teams(selectedOption)

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
    let response = await fetch(`https://sandbox.prestigedelta.com/banktransfer/?bank_code=${bank_code}&nuban=${nuban}`,{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    let respet = await fetch("https://sandbox.prestigedelta.com/transferpinid/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    respet = await respet.json();
    response = await response.json()
    localStorage.setItem('user-info', JSON.stringify(tok))
  //   if (data.code === 'token_not_valid'){
  //     navigate('/components/token')
  //   } else {
   setUsers(response)
   setPinid(respet)
    }
  
  useEffect(() => {
  if (selectedOption !== '' && nuban.length=== 10) {
    fetchData();
  }
}, [selectedOption, nuban]);

   console.log(bank_code) 
   

    if(loading) {
      return(
      <p>Loading</p>)} 

  return(
    <div>
       <Link to='/components/accounts'><i class="fa-solid fa-chevron-left bac"></i></Link>
      
            <h3>Send Money</h3>
       <form>
       <p className='sp'>Select Account</p>
       <Select
      onChange={handleBanks}
      className="lne"
      placeholder="Select Account"
      options={option}
      isSearchable={true}
      value={selectedOptions}
    />
                <p className='sp'>Select Bank</p>
                <Select
      onChange={handleBank}
      className="lne"
      placeholder="Select Bank"
      options={options}
      isSearchable={true}
      value={selectedOption}
    />
                <p className='sp'>Account Number</p>
                <input type='number' onChange={handleAcct} className="line" placeholder="Enter Account Number" name="birth"/><br/> 
                <div className="me">{users ? <p>{users.account_name}</p> : null}</div>
                <p className='sp'>Enter Amount</p>
                <input type="number" onChange={handleAmount} className="line" placeholder="0.00" name="BVN"/><br/><br/>
                <p className='sp'>Add a Note</p>
                <input type='text' onChange={handleNote} placeholder='Add a note' className='line' />
                <button onClick={handleSubmit} className='tranb'>Next</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
    
}
export default GetGroup