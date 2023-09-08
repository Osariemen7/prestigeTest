import { useState, useEffect } from 'react';
import {  useLocation, Link, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import Logo from './images/Logo.png';
import jsPDF from 'jspdf';
import Modal from 'react-modal';


const Credit =()=> {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const [quantity, setQuatity] = useState([]);
    const [price, setPrice] = useState([]);
    const [item, setItem] = useState([])
    const [inputVal, setInputVal] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputVa, setInputVa] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    let meal = location.state.ite

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
const handleFormSubmit = (event) => {
    event.preventDefault();
    setQuatity([...quantity, inputValue]);
    setInputValue("");
    setPrice([...price, inputVal]);
    setInputVal();
    setItem([...item, inputVa]);
    setInputVa();
    closeModal()
  }
  let tota =(price.reduce((total, to) => {
    return total + parseFloat (to);
  }, 0));
  let total = (tota).toLocaleString('en-US')

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChang = (event) => {
    setInputVal(event.target.value);
    
  };
  const handleInputchan = (event) => {
    setInputVa(event.target.value)
  }


let refresh = terms(tok)
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
        pdf.save('Receipt.pdf');
    }
    console.log(meal)
        if(loading) {
          return(
          <p>Loading...</p>)}
    return(
        <div>
        <Link to='/components/accounts'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <main id="main-element">
            <div className='rax'><h4 className='shi'>{list[0].business_name}</h4></div> 
            <p className='ld'>{(new Date(meal.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                 
            <hr className='hr'></hr>
                        <p className='font'>INVOICE</p>
            <hr className='hr'></hr>
            <div className='cule'>
                <h4>Item</h4>
                <h4>Quantity</h4>
                <h4>Amount</h4>
            </div>
    
            <div className='cul'>
                 <ul className="au">
                    {item.map((todo, index) => (
                     <p key={index}>{todo}</p>))}
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
                 </ul></div>
                    <p className='cveh'>Total: ₦{total}</p>
                    <p className='cveh'>Settled</p>
                <div className='cule'>
                <p>Prestige Finance</p>
                <p></p>
                <p>₦{total}</p>
                </div> 
                <p className='font'>Thank you for your Patronage!!!</p>
                <p className='font'>Phone No: {list[0].owner_phone}</p>
                </main>
            {tota ===parseFloat(meal.amount)  ? (<button className='logb' onClick={handleCaptureClick}>Download</button>) : <button className='logb' onClick={openModal}>Add Item</button> }
            <Modal
            className='modal'
            isOpen={isOpen}
             onRequestClose={closeModal}
               contentLabel="Example Popup">
        <i class="fa-solid fa-x mx" onClick={closeModal}></i>
           <h3 className='h4'>Add Items Purchased</h3>
            <form >
                <p className='mp'>Item</p>
                <input type="text" className='mine'  onChange={handleInputchan} /><br/>
                <p className='mp'>Amount</p>
                <input type="number" className='mine' onChange={handleInputChang} /><br/>
                <p className='mp'>Quantity</p>
                   <input type='number' className='mine'
                    onChange={handleInputChange}
                    />
                
                
                <button className='put' onClick={handleFormSubmit}>Continue</button>
            </form>
            </Modal> 
        </div>
    )
}
export default Credit