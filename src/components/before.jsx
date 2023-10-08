import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { Button, Stack, Input, Heading, useDisclosure,Card, CardBody  } from "@chakra-ui/react"
import CreatableSelect from 'react-select/creatable';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
  
const BuyP =()=>{
  const { isOpen, onOpen,  onClose } = useDisclosure()
  const [messag, setMessag] = useState([])
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
  const [outline, setOutline] = useState('');
  const [outline1, setOutline1] = useState('')
  const [outline2 , setOutline2] = useState('')
  const [pack_size1, setPacksize] = useState([])
  const [product, setProduct] = useState([])
  const [payment_method, setPayment] = useState('')
  const [info, setInfo] = useState([])

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
let response = await fetch("https://sandbox.prestigedelta.com/products/",{
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
    fetchData()
  }, [])
  // const fetchDal = async () => {
  //   let item ={refresh}
  //   let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
  //       method: 'POST',
  //       headers:{
  //         'Content-Type': 'application/json',
  //         'accept' : 'application/json'
  //    },
  //    body:JSON.stringify(item)
  //   });
    
  //   rep = await rep.json();
  //   let bab = rep.access_token
  // let response = await fetch("https://sandbox.prestigedelta.com/subaccount/",{
  // method: "GET",
  // headers:{'Authorization': `Bearer ${bab}`},
  // })
  // //localStorage.setItem('user-info', JSON.stringify(tok))
  
  // if (response.status === 401) {
  //   navigate('/components/login');
  // } else { 
   
  // response = await response.json();
  // setAcct(response)
  
  //   }}
  //   useEffect(() => {
  //     fetchDal()
  //   }, [])


const optio = ['item', 'pack'];
  const opt = optio.map((p) => ({
    label: p,
    value: p,
  }));
const handleFormSubmit = (event) => {
  event.preventDefault();
  
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
const options = product.map((item) => ({
  label: item.name,
    value: item.name,
    team:  item.pack_size,
    mony: item.pack_cost,
}));
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
      async function aprod() {
      
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
          cost:parseInt( itemd.price[index]),
          quantity:itemd.quantity[index],
          quantity_type:itemd.quantity_type[index],
          pack_size:itemd.pack_size[index],
          product_type: product_type,
          amount:amount
        }));
        let products = separatedData
        let ite = {products, payment_method}
        try {
          let result = await fetch('https://sandbox.prestigedelta.com/products/', {
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
            setMessag('All fields must be filled');
          } else {
             result =await result.json();
            
          } 
        } catch (error) {
          // Handle fetch error
          console.error(error);
        };
      }
      const openModal = () => {
      setPayment('CASH')
      setOutline(!outline)
      
      };
      const openModal1 = () => {
        setPayment('POS');
        setOutline1(!outline1)
      };
      const openModal2 = () => {
        setPayment('TRANSFER');
        setOutline2(!outline2)
      };
      const next = () => {
        aprod()
        navigate('/components/product')
      }
      const conti = () => {
        aprod()
        const mata = info[0].sub_account
        navigate('/components/getgroup', {state:{mata}})
      }
      console.log(payment_method)
      if(loading) {
        return(
        <p>Loading...</p>)} 
    
  return(
    <div>
    <Link to='/components/product'>
                 <i className="fa-solid fa-chevron-left bac"></i>
             </Link>
    <ChakraProvider>
    <Heading size='md' mb={2}>Buy Product</Heading>
    <div><p>Choose Method of Payment?</p>
    <Stack direction='row' mt={2} gap='20px' spacing={3} align='center' justify='center'>        
                 <Button colorScheme='blue' variant={outline ?'solid' : 'outline'} onClick={openModal}>CASH</Button> 
                 <Button colorScheme='blue' variant={outline1 ?'solid' : 'outline'} onClick={openModal1}>POS</Button> 
                 <Button colorScheme='blue' variant={outline2 ?'solid' : 'outline'} onClick={openModal2}>TRANSFER</Button>
                 </Stack></div>
                 
      <Card m={2} backgroundColor='gainsboro'>
      
      <Stack direction='row'mb={2} gap='30px' mt={3} spacing={4} align='center' justify='center'>
                <Heading size='xs'>Item</Heading>
                <Heading size='xs'>Quantity</Heading>
                <Heading size='xs'>Amount</Heading>
                <Heading size='xs'>Quantity Type</Heading>
      </Stack>
      <CardBody>
      <div className='culb'>
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
                 </CardBody>
                 <p >Total Amount: ₦{total}</p>

                 </Card>  
                 <div className="message">{messag ? <p>{messag}</p> : null}</div>
                 <br></br>
                 <Stack direction='row' mt={2} spacing={2} align='center' justify='center'>
                 {total !== '0'  ? (<Button colorScheme='blue' variant='solid' m={2} onClick={onOpen}>Add More Items</Button>) : <Button m={2} colorScheme='blue' variant='solid' onClick={onOpen}>Add Item</Button> }
                 {payment_method !== 'TRANSFER' ? (<Button colorScheme='blue' variant='solid' onClick={next}>Save</Button>) : <Button colorScheme='blue' variant='solid' onClick={conti}>Continue</Button>}
                 </Stack>
                 <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        
          <ModalHeader>Add Items Purchased</ModalHeader>
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
            <Input placeholder='Quantity Bought' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/>
            <Select
      onChange={handleInputCha}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      value={inputV} /><br/>
      {inputV.label !== 'item' ? (
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
export default BuyP
