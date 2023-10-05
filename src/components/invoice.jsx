import { useState, useEffect } from 'react';
import {  useLocation, Link, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import Logo from './images/Logo.png';
import jsPDF from 'jspdf';
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
  import { useDisclosure, Input,  Button  } from "@chakra-ui/react"


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
    const location = useLocation()
    const navigate = useNavigate()
    let meal = location.state.item
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
    setCustomer(newCustomer)
    setInpu('')
    setNumber(newNumber)
    setVal('')
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
    label: item.name,
      value: item.name,
      team:  item.pack_size,
      mony: item.pack_cost,
  }));
  let tota =(price.reduce((total, to) => {
    return total + parseFloat (to);
  }, 0));
  let total = (tota).toLocaleString('en-US')

  const handlePack =(e)=>{
    setInputp(e.target.value)
  }
  const handleCust = (event) =>{
    setInpu(event.target.value)
  }
   const handlePhone =(event) => {
    setVal(event.target.value)
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

    async function sprod() {

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
          product_type: product_type
        }));
        let ite = separatedData
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
    
        } else {
           result =await result.json();
    
        } 
      } catch (error) {
        // Handle fetch error
        console.error(error);
      };
    }
    
    useEffect(() => {
     if (tota ===parseFloat(meal.amount)){
      sprod()}
      }, [tota, meal])

        const handleCaptureClick = async () => {
            const mainElement = document.getElementById('main-element');
            const canvas = await html2canvas(mainElement);
            const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for page size
    
        // Calculate the width and height to fit the whole canvas on the PDF
        const imgWidth = 210; // A4 page width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
        // Add the captured image to the PDF
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
    
        // Save the PDF
        pdf.save(`${(new Date()).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}.pdf`);
    }
    console.log(meal)
        if(loading) {
          return(
          <p>Loading...</p>)}
    return(
        <div>
        <Link to='/components/inventory'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <main id="main-element">
            <div className='rax'><h4 className='shi'>{toSentenceCase(list[0].business_name)}</h4></div> 
            <h5 className='invo'>INVOICE</h5> 
            <h6 className='saed'>Bill To: {customer} -<span> {number}</span></h6>
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
                <p>Received:</p>
                <p></p>
                <p>₦{(meal.amount).toLocaleString()}</p>
                </div>
                <hr className='hr1'></hr>

                </div> 
                <p className='font'>Thank you for your Patronage!!!</p>
                <p className='font'>Phone No: {list[0].owner_phone}</p>
                <p className='font'>{list[0].owner_email}</p>
                <p className='font'>{list[0].address}</p>
                <img src={Logo} alt="logo" className="frame3"/>
             
               </main>
               <ChakraProvider>
            {tota ===parseFloat(meal.amount)  ? (<button className='logb' onClick={handleCaptureClick}>Download</button>) : <button className='logb' onClick={onOpen}>Add Item</button> }
            
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        
          <ModalHeader>Add Items Purchased</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <h3 className='h4'></h3>
            <form >
            {customer === ''? (<div><Input  size='md' placeholder='Customer Name' onChange={handleCust} width={273} ml={9}/><br/><br/></div>): null}
            {number === ''? (<div><Input  size='md' placeholder='Customer Number' onChange={handlePhone} width={273} ml={9}/><br/><br/></div>): null}
           
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
            
            <Input placeholder='Amount' size='md' onChange={handleInputChang} width={273} ml={9}/><br/><br/>
            <Input placeholder='Quantity' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/>
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
export default Invoice