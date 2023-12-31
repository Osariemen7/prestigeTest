import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const [ben, setBen] = useState([]);
  const [selected, setSelected] = useState('')
  const navigate = useNavigate();
  const location = useLocation();

  let selectedOptions = location.state.mata.name
  
  console.log(selectedOptions)
  const opt = ben.map((item) => ({
    label: `${item.account_name} 
             (${item.bank_name})`,
    value: item.account_number,
    team:   item.bank_code,
    code: item.bank_name
  }));
   
  const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleBen = (selected) => {
    setSelected(selected);
    // Set the selected bank and account number in their respective fields
    setSelectedOption({ label: selected.code, value: selected.team });
    setNuban(selected.value);
  };
  const handleNote =(event)=>{
    setNarration(event.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    let data ={amount, selectedOption, selectedOptions, nuban, users, narration, pin_id}
    if ( users.account_name === undefined || nuban.length < 1 ||  narration.length < 1 || selectedOption.length < 1 || amount.length < 1){
      setMessage('All Fields must be Filled')
    }
    else {
    
    navigate('/components/getgrp2', {state:{data}})
  }}
 console.log(users.account_name)
  const handleAcct =(event)=> {
    setNuban(event.target.value)
}
const handleAmount=(event)=> {
  setAmount(event.target.value)
}
console.log(narration.length)
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
let respet = await fetch("https://sandbox.prestigedelta.com/beneficiaries/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  respet = await respet.json();
//localStorage.setItem('user-info', JSON.stringify(tok))

if (response.status === 401) {
  navigate('/components/login');
} else { 
 
response = await response.json();
setLoading(false)
setBen(respet)

  }}
  useEffect(() => {
    fetchDap()
  }, [])
console.log(users)
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
// const debit = (selectedOptions) => {
//   let menu
//   if (selectedOptions.value === 'main'){
//       menu = true;
//   }else{
//       menu = false
//   }
//   return menu
// }
// let sub_account = debit(selectedOptions)

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
//  const trim = (selected) => {
//    let pip;
//    if (selected === null  ){
//      pip = 0;
//      else {}
//    }
//  }
   console.log(selectedOptions)
    const teams = (selectedOption) => {
      let ref;

        if ( selectedOption === null || typeof selectedOption === 'undefined') {
           ref = 10;
            }
             else {
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
    
    response = await response.json()
    localStorage.setItem('user-info', JSON.stringify(tok))
  //   if (data.code === 'token_not_valid'){
  //     navigate('/components/token')
  //   } else {
   setUsers(response)
  
    }
  
  useEffect(() => {
  if (selectedOption !== '' && nuban.length=== 10) {
    fetchData();
  }
}, [selectedOption, nuban]);

   console.log(bank_code) 
   

    if(loading) {
      return(
      <p>Loading...</p>)} 

  return(
    <div>
       <Link to='/components/savings'><i class="fa-solid fa-chevron-left bac"></i></Link>
      
            <h3>Send Money</h3>
       <form>
    <p className='sp'>Select Beneficiary</p>
                <Select
      onChange={handleBen}
      className="lne"
      placeholder="Select Beneficiary"
      options={opt}
      isSearchable={true}
      value={selected}
    />
    
    
    <p className='sp'>Select Bank</p>
                
     {selected === '' ?(
      <div>
      <Select
      onChange={handleBank}
      className="lne"
      placeholder="Select Bank"
      options={options}
      isSearchable={true}
      value={selectedOption}
    />
                <p className='sp'>To Account Number</p>
                <input type='number'  onChange={handleAcct} className="line" placeholder="Enter Account Number" name="birth"/><br/> 
                </div>) :(
                  <div> 
                  <input
              onChange={handleBank}
              className="line"
              placeholder="Select Bank"
              value={selected.code}
            />
            <p className='sp'>To Account Number</p>
            <input
              type='number'
              onChange={handleAcct}
              value={selected.value}
              className="line"
              placeholder="Enter Account Number"
            />
                  </div>)}
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
