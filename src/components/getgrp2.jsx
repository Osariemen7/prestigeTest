import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Modal from 'react-modal';
import OtpInput from 'react-otp-input';
const PostMon=()=> {
    const [pin, setPin] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
     const navigate = useNavigate();
     const location = useLocation();
     let meal = location.state.data
   
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
const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
let refresh = terms(tok)

     async function transfer(e) {
        e.preventDefault();
        let amount = meal.amount
        let pin_id = meal.pin_id.pin_id
        let narration = meal.narration
        let bank_code = meal.selectedOption.value
        let nuban = meal.nuban
        let account_name = meal.users.account_name
        let bank = meal.selectedOption.label
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
          console.warn(amount, pin_id, narration, nuban, account_name, pin, bank_code )
          let ite ={amount, bank, nuban, account_name, pin, bank_code, narration}
          let items = {amount, pin_id, narration, nuban, account_name, pin, bank_code};
          let resut = await fetch ('https://sandbox.prestigedelta.com/banktransfer/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json',
                'Authorization': `Bearer ${bab}`
           },
           body:JSON.stringify(items)
          });
          
          if (resut.status !== 201) {
            setMessage('Invalid Information');
          } else {
            resut = await resut.json();
          localStorage.setItem('user-info', JSON.stringify(resut)) 
          navigate('/components/getrec', {state:{ite}} )
          }
        }
    return(
        <div>
        <Link to='/components/accounts'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
            <h3>Confirm Details</h3>
           <div className="meat">
              <h4>Tranfer ₦{(parseInt(meal.amount)).toLocaleString('en-US')} to<br/> {meal.users.account_name}</h4>
           </div>
           <div className="vasa">
              <p>Account Number</p>
              <p>{meal.nuban}</p>
           </div>
           <div className="vasa1">
               <p>Amount</p>
               <p>₦{meal.amount}</p>
           </div>
           <div className="vasa2">
               <p>Bank</p>
               <p>{meal.selectedOption.label}</p>
           </div>
           <div className="meats">
             <p>Be sure of the account details before sending<br/> funds as this cannot be reversed</p>
           </div> 
           <button onClick={openModal} className="tranb">Proceed</button>
           <Modal
            className='trmo'
           isOpen={isOpen}
             onRequestClose={closeModal}
               contentLabel="Example Popup">
             <i class="fa-solid fa-x tx" onClick={closeModal}></i>
           <OtpInput  
                 value={pin}
                 onChange={setPin}
                  numInputs={4}
                 renderSeparator={<span> </span>}
                 renderInput={(props) => <input {...props }  className='totp' />}
                />
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <button className="logb" onClick={transfer}>Transfer</button>
           </Modal>
        </div>
    )
}
export default PostMon