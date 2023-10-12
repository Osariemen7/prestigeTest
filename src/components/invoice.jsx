
 import { useState, useEffect } from 'react';
import {  Link, useNavigate } from "react-router-dom";
import Logo from './images/Logo.png';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ChakraProvider } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { useDisclosure, Input,  Button, Stack, Spinner  } from "@chakra-ui/react"


const Invoice =()=> {
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const [quantity, setQuatity] = useState([]);
    const [price, setPrice] = useState([]);
    const [type, setType] = useState([]);
    const [item, setItem] = useState([])
    const [inputp, setInputp] = useState(0)
    const [inputVal, setInputVal] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputVa, setInputVa] = useState('')
    const [inputV, setInputV] = useState('')
    const [customer, setCustomer] = useState('');
    const [inpu, setInpu] = useState('');
    const [pack_size1, setPacksize] = useState([])
    const [number, setNumber] = useState('')
    const [val, setVal] = useState('')
    const [product, setProduct] = useState([])
    const [payment_method, setPayment] = useState('')
    const [outline, setOutline] = useState('');
    const [message, setMessage] = useState('')
    const [buttonVisible, setButtonVisible] = useState(true);

    const navigate = useNavigate()
    console.log(item)
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


// const opti = [
//   ...acct.map((item) => ({
//     label: `${item.name} 
//     (₦${item.balance.available_balance})`,
//     value: item.name,
//   }))]


const optio = ['item', 'pack'];
    const opt = optio.map((p) => ({
      label: p,
      value: p,
    }));
const handleFormSubmit = (event) => {
    event.preventDefault();
    const newCustomer = customer || inpu;
    const newNumber = number || val
    setQuatity([...quantity, inputValue]);
    setInputValue("");
    setPrice([...price, inputVal]);
    setInputVal('');
    setItem([...item, inputVa]);
    setInputVa('');
    setType([...type, inputV])
    setInputV('');
    setPacksize([...pack_size1, inputp])
    setInputp(0)
    onClose()
  }
//   const options = [
//     ...product.map((item) => ({
//       label: item.name,
//       value: item.name,
//       team:  item.pack_size,
//       mony: item.pack_cost,
//     }))
//   ];
  const options = product.map((item) => ({
    label: `${item.name} 
    (Pack:${item.pack_no}, Item:${item.item_no})`,
      value: item.name,
      team:  item.pack_size,
      mony: item.pack_cost,
  }));
  // let amount = parseFloat(price) * parseFloat(quantity)
  // let tota =(amount.reduce((total, to) => {
  //   return total + parseFloat (to);
  // }, 0));
  const tota = quantity.reduce((total, q, index) => {
  const itemAmount =parseFloat(q) * parseFloat(price[index]);
  return total + itemAmount;
}, 0);
  let total = (tota).toLocaleString('en-US')

  const handlePack =(e)=>{
    setInputp(e.target.value)
  }
 
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChang = (event) => {
    setInputVal(event.target.value);
    
  };
  const handleInputchan = (inputVa) => {
    setInputVa(inputVa)
  }
  const handleInputCha = (inputV) => {
    setInputV(inputV)
  }
  const openModal = (button) => {
    setPayment('CASH')
    setOutline(button)
    
    };
    const openModal1 = (button) => {
      setPayment('POS');
      setOutline(button)
    };
    const openModal2 = (button) => {
      setPayment('TRANSFER');
      setOutline(button)
    };
  function toSentenceCase(inputString) {
    if (!inputString) return inputString; // Handle empty or null input
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
const handleAddProduct = (newValue) => {
    if (newValue && newValue.trim() !== '') {
      const newProduct = { label: newValue, value: newValue };
      setInputVa(newProduct);
    }
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
  let response = await fetch("https://sandbox.prestigedelta.com/productcatalogue/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  //localStorage.setItem('user-info', JSON.stringify(tok))
  
  if (response.status === 401) {
    navigate('/components/login');
  } else { 
   
  response = await response.json();
  setProduct(response)
  
    }}
    useEffect(() => {
      fetchDa()
    }, [])
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
      let response = await fetch("https://sandbox.prestigedelta.com/businessprofile/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      //localStorage.setItem('user-info', JSON.stringify(tok))
      
      if (response.status === 401) {
        navigate('/components/login');
      } else { 
       
      response = await response.json();
      setLoading(false)
      setList(response)
        }}
        useEffect(() => {
          fetchData()
        }, [])
        const handleClick = () => {
          // When the button is clicked, setButtonVisible to false
          setButtonVisible(false);
          setTimeout(() => {
            setButtonVisible(true);
          }, 10000);
        };

    async function sprod(e) {
      e.preventDefault()
      handleClick()
       let items ={refresh}
        let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json'
         },
         body:JSON.stringify(items)
        });
        rep = await rep.json();
        let bab = rep.access_token 
        let product_type = 'PRODUCT'
        let pack_size= pack_size1
        let amount = tota
      
        let quantity_type = type.map(tod => tod.value)
        let name = item.map(todo => todo.value)
        console.log(name, price, quantity, quantity_type, pack_size)
        let itemd = {name, price, quantity, quantity_type, pack_size};
        
        const separatedData = itemd.name.map((_, index) => ({
          name: itemd.name[index],
          price:parseInt( itemd.price[index]),
          quantity:itemd.quantity[index],
          quantity_type:itemd.quantity_type[index],
          pack_size:itemd.pack_size[index],
          product_type: product_type,
          amount: amount
        }));
        let products = separatedData
        let ite = {products, payment_method}
      try {
        let result = await fetch('https://sandbox.prestigedelta.com/sellproducts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(ite)
        });
              if (result.status !== 200) {
          const errorResult = await result.json();
          setMessage(JSON.stringify(errorResult));
        } else {
           result =await result.json();
          setMessage(JSON.stringify(result.message))
        } 
      } catch (error) {
        // Handle fetch error
        console.error(error);
      };
    }
    
    
      console.log(payment_method)
    
        if(loading) {
          return(
          <p>Loading...</p>)}
    return(
        <div>
        <Link to='/components/inventory'><i class="fa-solid fa-chevron-left bac"></i></Link>
        
            <main id="main-element">
            <div className='rax'><h4 className='shi'>{toSentenceCase(list[0].business_name)}</h4></div> 
            <ChakraProvider>
        <div><p>Choose Method of Payment?</p>
    <Stack direction='row' m={2} gap='20px' spacing={3} align='center' justify='center'>        
                 <Button colorScheme='blue' variant={outline  === 'CASH'?'solid' : 'outline'} onClick={() =>openModal('CASH')}>CASH</Button> 
                 <Button colorScheme='blue' variant={outline ==='POS' ? 'solid' : 'outline'} onClick={() =>openModal1('POS')}>POS</Button> 
                 <Button colorScheme='blue' variant={outline ==='TRANSFER' ?'solid' : 'outline'} onClick={() =>openModal2('TRANSFER')}>TRANSFER</Button>
                 </Stack></div></ChakraProvider>
      
            
            <p className='ld'>{(new Date()).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
               
            <hr className='hr'></hr>
                        
          <div className='grn'>
            <div className='cules'>
                <h4>Item</h4>
                <h4>Quantity</h4>
                <h4>Amount</h4>
                <h4>Quantity Type</h4>
            </div>
    
            <div className='culs'>
                 <ul className="au">
                    {(item).map((todo, index) => (
                     <p key={index}>{todo.value}</p>))}
                 </ul>
                 <ul className="aul">
                     {quantity.map((to, index1) => (
                    <p key={index1}>{to}</p>
                  ))}
                 </ul>
                 <ul className="aul">
                     {price.map((t, index1) => (
                    <p key={index1}>₦{parseFloat(t).toLocaleString('en-US')}</p>
                  ))}
                 </ul>
                 <ul className="aul">
                     {type.map((tod, index1) => (
                    <p key={index1}>{tod.value}</p>
                  ))}
                 </ul></div>
                    <p className='cveh'>Total: ₦{total}</p>
                       
                <div className='cules'>
                <p>Expected Payment:</p>
                <p></p>
                <p>₦{(tota).toLocaleString()}</p>
                </div>
                <hr className='hr1'></hr>

                </div> 
                
                <img src={Logo} alt="logo" className="frame3"/>
             
               </main>
               <ChakraProvider>            
                <Stack direction='row' spacing={2} align='center' justify='center'>        
                 <Button colorScheme='blue' variant='solid' onClick={onOpen}>Add Item</Button> 
                 {buttonVisible && ( <Button colorScheme='blue' variant='solid' onClick={sprod}>Save</Button> 
                 )}
      {!buttonVisible && <Spinner />} </Stack>
      <div className="message">{message ? <p>{message}</p> : null}</div>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        
          <ModalHeader>Add Items Sold</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <h3 className='h4'></h3>
            <form >
           
  <CreatableSelect
        className="pne"
        placeholder="Enter product/service"
        options={options}
        isSearchable={true}
        onChange={handleInputchan}
        value={inputVa}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
            
            <Input placeholder='Price of a single item/pack/service' size='md' onChange={handleInputChang} width={273} ml={9}/><br/><br/>
            <Input placeholder='Quantity' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/>
            <Select
      onChange={handleInputCha}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      value={inputV} /><br/>
      {inputV.label !== 'item' || inputVa.label === options ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}   
                                   
                <Button colorScheme='blue' onClick={handleFormSubmit}>Add</Button>
            </form>
            </ModalBody>
            </ModalContent>
      </Modal>

      </ChakraProvider>
        </div>
    )
}
export default Invoice