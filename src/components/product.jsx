import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Card, CardHeader, Stack, CardBody, Button, Heading, Text } from '@chakra-ui/react'
import { useDisclosure, Input,  Spinner  } from "@chakra-ui/react"
import good from './images/good.svg';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const Product = () => {
  const [message, setMessage] = useState('')
  const [messag, setMessag] = useState('')
    const [info, setInfo] = useState('');
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState('');
    const [cost, setCost] = useState('');
    const [selectedOption, setSelectedOption] = useState(null)
    const [quantity, setQuantity] = useState('')
    const [pack_size, setPacksize] = useState(0)
    const [fun, setFun] = useState('')
    const navigate = useNavigate()
    const [buttonVisible, setButtonVisible] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const [fin, setFin] = useState('');
    const [select, setSelect] = useState('');

    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const optio = ['item', 'pack'];
    const opt = optio.map((p) => ({
      label: p,
      value: p,
    }));
    const menu = ['Product', 'Service'];
    const op = menu.map((p) => ({
      label: p,
      value: p,
    }));
    const closeModal = () => {
      modal2.onClose() 
    };
         
  const handleCost = (event)=> {
    setCost(event.target.value)
  }
  const handleQuantity =(e)=>{
    setQuantity(e.target.value)
  }
  const handleType = (selectedValue) => {
      setSelectedValue(selectedValue);
    }; 
    const selectType = (select) => {
      setSelect(select);
    };
    const handlePack =(e)=>{
      setPacksize(e.target.value)
    }
    const closeModals = () => {
       modal1.onClose()
      fetchData() 
      setFun('')
    };
    const show=(index)=>{
      const data = info[0].products[index]
       navigate('/components/prodet', {state:{data}})
    }
    const handleClick = () => {
      // When the button is clicked, setButtonVisible to false
      setButtonVisible(false);
      setTimeout(() => {
        setButtonVisible(true);
      }, 20000);
    };
    let tok= JSON.parse(localStorage.getItem("user-info"));
    const terms = (tok) => {
      let refreshval;
    
      if (tok === null || typeof tok === 'undefined') {
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
    let refresh = terms(tok)
    async function aprod(e) {
      
      e.preventDefault();
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
        let quantity_type = selectedValue.value
        let name = selectedOption.value
        console.warn(name, cost, quantity, quantity_type, pack_size)
        let item = [{name, cost, quantity,  product_type , quantity_type, pack_size}];
      
      try {
        let result = await fetch('https://sandbox.prestigedelta.com/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(item)
        });
              if (result.status !== 200) {
          const errorResult = await result.json();
          setMessag('All fields must be filled');
        } else {
           result =await result.json();
           setFun(result)
        } 
      } catch (error) {
        // Handle fetch error
        console.error(error);
      };
    }
    async function sprod(e) {
      
      e.preventDefault();
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
        let quantity_type = selectedValue.value
        let name = selectedOption.value
        let price = cost
        console.warn(name, price, quantity, quantity_type, pack_size)
        let item = [{name, price, quantity,  product_type , quantity_type, pack_size}];
      
      try {
        let result = await fetch('https://sandbox.prestigedelta.com/sellproducts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(item)
        });
              if (result.status !== 200) {
          const errorResult = await result.json();
          setMessage('All fields must be filled');
        } else {
           result =await result.json();
           setFin(result)
        } 
      } catch (error) {
        // Handle fetch error
        console.error(error);
      };
    }
    
 let total =parseFloat( cost) * parseFloat(quantity)
    
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
console.log(info)
console.log(selectedOption)
 
    const options = [
      ...product.map((item) => ({
        label: item.name,
        value: item.name,
        team:  item.pack_size,
        mony: item.pack_cost,
      }))
    ];
    const handleOptionSelect = (selectedOption) => {
      // Handle option selection
      setSelectedOption(selectedOption);
     
    };
    
    const handleAddProduct = (newValue) => {
    if (newValue && newValue.trim() !== '') {
      const newProduct = { label: newValue, value: newValue };
      setSelectedOption(newProduct);
    }
  };
  const transfer= ()=>{
    
       navigate('/components/before')
  }
    if(loading) {
        return(
        <p>Loading...</p>)} 
    
    return(
        <ChakraProvider>
        <div>
        <Link to='/components/inventory'>
                 <i className="fa-solid fa-chevron-left bac"></i>
             </Link>
<Stack direction='row' spacing={1} align='center' justify='center'>
  <Button colorScheme='blue' variant='outline' onClick={transfer}>
    Buy Product
  </Button>
</Stack>
<Heading size='md' m={5} mb={0}>Product List</Heading>
        { info.length > 0 && typeof info[0].products[0] === 'object' ? (
      <div>
      {info[0].products.map((obj, index) =>

        <Card key={index} onClick={() => show(index)} m={3} >
  <CardBody padding={2}>
   <Heading size='xs'>{obj.name}</Heading>
    <Text>Total Sales: {obj.total_sales}</Text>
    <i class="fa-solid fa-arrow-right"></i>
  </CardBody>
</Card> )}</div> ): null }
<Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fun === '' ? (
  <div>

          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Select
      onChange={selectType}
      className="pne"
      placeholder="Product/Service"
      options={op}
      isSearchable={true}
      value={select} /><br/>
{select.label ==='Service' ? (
  <div>
  <CreatableSelect
        className="pne"
        placeholder="Enter Service name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='No of persons rendered service' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Cost for a single person' size='md' onChange={handleCost} width={273} ml={9} />
      </div>):(<div><CreatableSelect
        className="pne"
        placeholder="Enter product name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      isSearchable={true}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='Quantity' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Cost for a single item/pack' size='md' onChange={handleCost} width={273} ml={9} /></div>)} </ModalBody>
         {total? <Text ml={5}>Total cost is ₦{(total).toLocaleString('en-US')}</Text>: null}
          <ModalFooter>
          <div className="message">{messag ? <p>{messag}</p> : null}</div>
          {buttonVisible && ( <Button colorScheme='blue' mr={3} onClick={aprod}>
              Add
            </Button>
            )}
      {!buttonVisible && <Spinner />}
          </ModalFooter>
          </div>): 
        <ModalBody>
        <div>
          <i class="fa-solid fa-x tx" onClick={closeModals}></i>
          <img src={good} alt="" className='nig'/>
          <h4 className="nig">Product Added!</h4>  
      </div></ModalBody>}
        </ModalContent> 
      </Modal>
      <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fin === '' ? (
  <div>
          <ModalHeader>Update Inventory</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Select
      onChange={selectType}
      className="pne"
      placeholder="Product/Service"
      options={op}
      isSearchable={true}
      value={select} /><br/>
{select.label ==='Service' ? (
  <div>
  <CreatableSelect
        className="pne"
        placeholder="Enter Service name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='No of persons rendered service' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Cost for a single person' size='md' onChange={handleCost} width={273} ml={9} />
      </div>):(<div><CreatableSelect
        className="pne"
        placeholder="Enter product name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      isSearchable={true}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='Quantity' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Price for a single item/pack' size='md' onChange={handleCost} width={273} ml={9} /></div>)} </ModalBody>
      {total? <Text ml={5}>Total Sales is ₦{(total).toLocaleString('en-US')}</Text>: null}
          <ModalFooter>
          <div className="message">{message ? <p>{message}</p> : null}</div>
          {buttonVisible && ( <Button colorScheme='blue' mr={3} onClick={sprod}>
              Update
            </Button>
            )}
      {!buttonVisible && <Spinner />}
          </ModalFooter>
          </div>): 
        <div>
          <i class="fa-solid fa-x tx" onClick={closeModal}></i>
          <img src={good} alt="" className='nig'/>
          <h4 className="nig">Product Updated!</h4>  
      </div>}
        </ModalContent> 
      </Modal>
        </div>
        </ChakraProvider>
    )
}
export default Product