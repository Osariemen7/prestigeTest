import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { Button, Input  } from "@chakra-ui/react"
import CreatableSelect from 'react-select/creatable';
  
const BuyP =()=>{
  const [info, setInfo] = useState([])
  const [product, setProduct] = useState([])
  const [infos, setInfos] = useState([]);
  const [nuban, setNuban] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [narration, setNarration] = useState('')
  const [pin_id, setPinid] = useState('')
  const [selectedOpt, setSelectedOpt] = useState(null)
  const [selectedValue, setSelectedValue] = useState('');
  const [cost, setCost] = useState('');
    const [quantity, setQuantity] = useState('')
    const [pack_size, setPacksize] = useState(0)
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
  const optio = ['item', 'pack'];
    const opti = optio.map((p) => ({
      label: p,
      value: p,
    }));

    const handleCost = (event)=> {
        setCost(event.target.value)
      }
      const handleQuantity =(e)=>{
        setQuantity(e.target.value)
      }
      const handleType = (selectedValue) => {
          setSelectedValue(selectedValue);
        }; 
        const handlePack =(e)=>{
            setPacksize(e.target.value)
          }
   
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
    let data ={amount, selectedOpt, cost, selectedOption, selectedOptions, nuban, selectedValue, users, pack_size, quantity,  narration, pin_id}
    if (typeof users !=='object' || narration.length < 1 || nuban.length < 1 || selectedOption.length < 1 || selectedValue < 1 || quantity < 1 || selectedOpt < 1 || cost < 1){
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

let respon = await fetch("https://sandbox.prestigedelta.com/productcatalogue/",{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})
  if (response.status === 401) {
    navigate('/components/login');
  } else { 
  response = await response.json();
  respon = await respon.json();
  setLoading(false)
  setInfo(response)
  
  setProduct(respon)
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
   const optiond = [
    ...product.map((item) => ({
      label: item.name,
      value: item.name,
      team:  item.pack_size,
      mony: item.pack_cost,
    }))
  ];
  const handleOptionSelect = (selectedOpt) => {
    // Handle option selection
    setSelectedOpt(selectedOpt);
   
  };
  
  const handleAddProduct = (newValue) => {
  if (newValue && newValue.trim() !== '') {
    const newProduct = { label: newValue, value: newValue };
    setSelectedOpt(newProduct);
  }
};

    if(loading) {
      return(
      <p>Loading...</p>)} 

  return(
    
    <div>
       <Link to='/components/savings'><i class="fa-solid fa-chevron-left bac"></i></Link>
      
            <h3>Send Money</h3>
            <ChakraProvider>
       <form>
                <Select
      onChange={handleBen}
      className="lne"
      placeholder="Select Customer"
      options={opt}
      isSearchable={true}
      value={selected}
    /><br/>
    
     {selected === '' ?(
      <div>
      <Select
      onChange={handleBank}
      className="lne"
      placeholder="Select Bank"
      options={options}
      isSearchable={true}
      value={selectedOption}
    /><br/>
                <Input type='number' width={273} onChange={handleAcct} className="line" placeholder="Enter Account Number" name="birth"/><br/><br/> 
                </div>) :(
                  <div> 
                  <Input width={273}
              onChange={handleBank}
              className="line"
              placeholder="Select Bank"
              value={selected.code}
            /><br/><br/>
            <Input width={273}
              type='number'
              onChange={handleAcct}
              value={selected.value}
              className="line"
              placeholder="Enter Account Number"
            /><br/><br/>
                  </div>)}
                <div className="me">{users ? <p>{users.account_name}</p> : null}</div>
                <Input type="number" className='line' onChange={handleAmount} width={273} placeholder="Enter  Amount" name="BVN"/><br/><br/> 
                <CreatableSelect
        className="lne"
        placeholder="Enter product name"
        options={optiond}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOpt}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="lne"
      placeholder="Quantity Type"
      options={opti}
      isSearchable={true}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton' className='line' size='md' onChange={handlePack} width={273} /><br/>
        <br/></div>): null}

      <Input placeholder='Quantity' size='md' className='line' onChange={handleQuantity} width={273} /><br/><br/>
      <Input placeholder='Cost for a single item/pack' className='line' onChange={handleCost} width={273} /><br/><br/>
     <Input type='text' width={273} onChange={handleNote} placeholder='Add a note' className='line' />
                <Button onClick={handleSubmit} colorScheme='blue' className='tranb'>Next</Button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
      </ChakraProvider>
    </div>
   
  )
    
}
export default BuyP
