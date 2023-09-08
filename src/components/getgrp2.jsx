import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Modal from 'react-modal';
import OtpInput from 'react-otp-input';
import { click } from "@testing-library/user-event/dist/click";
const PostMon=()=> {
    const [pin, setPin] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [pinExpired, setPinExpired] = useState(false);
    const [user, setUser] = useState('')
    const [buttonVisible, setButtonVisible] = useState(true);
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
  

  useEffect(() => {
    let timer;
    
    if (pin === '') {
      // Start a timer if the input is empty
      timer = setTimeout(() => {
        setPinExpired(true);
      }, 35000); // 30 seconds
    } else {
      // Clear the timer if there's input
      clearTimeout(timer);
      setPinExpired(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [pin]);

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
  let respet = await fetch("https://sandbox.prestigedelta.com/transferpinid/?sms=false",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  respet = await respet.json();
  localStorage.setItem('user-info', JSON.stringify(tok))
//   if (data.code === 'token_not_valid'){
//     navigate('/components/token')
//   } else {
    setUser(respet)
  }
  const fetchDat = async () => {
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
  let respet = await fetch("https://sandbox.prestigedelta.com/transferpinid/?sms=true",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  respet = await respet.json();
  localStorage.setItem('user-info', JSON.stringify(tok))
//   if (data.code === 'token_not_valid'){
//     navigate('/components/token')
//   } else {
  setUser(respet)
  }
let refresh = terms(tok)

     async function transfer(e) {
        e.preventDefault();
        let amount = meal.amount
        const pent =(user, meal)=>{
          let pun
          if(user === ''){
            pun = meal.pin_id.pin_id
          } else{
            pun = user.pin_id
          }
          return pun
        }
        let pin_id = pent(user, meal)
        let narration = meal.narration
        let bank_code = meal.selectedOption.value
        let nuban = meal.nuban
        let account_name = meal.users.account_name
        let bank = meal.selectedOption.label
        let sub_account = meal.selectedOptions
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
          console.warn(amount, pin_id, narration, sub_account, nuban, account_name, pin, bank_code )
          let ite ={amount, bank, nuban, sub_account, account_name, pin, bank_code, narration}
          let items = {amount, pin_id, narration, sub_account, nuban, account_name, pin, bank_code};
          let resut = await fetch ('https://sandbox.prestigedelta.com/banktransfer/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json',
                'Authorization': `Bearer ${bab}`
           },
           body:JSON.stringify(items)
          });
          console.log(items)
                    resut = await resut.json();
          if (resut.status === 201) {
            localStorage.setItem('user-info', JSON.stringify(tok)) 
            setButtonVisible(false)
          navigate('/components/getrec', {state:{ite}} )

          } else {
            setMessage(JSON.stringify(resut.message));
                    }
        }
        console.log(meal)
    return(
        <div>
        <Link to='/components/savings'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
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
               <div><p>₦{meal.amount}</p></div>
            
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
             <p>Enter the 4-digit verification code<br/> sent to your phone number in the boxes below</p>
           <OtpInput  
                 value={pin}
                 onChange={setPin}
                  numInputs={4}
                 renderSeparator={<span> </span>}
                 renderInput={(props) => <input {...props }  className='totp' />}
                />
                {pinExpired === true ? (
  user === '' ? (
    <div>
      <p className="dnc">
        Time out. Resend OTP to{' '}
        <span className="lop" onClick={fetchData}>
          Email?
        </span>{' '}
        or{' '}
        <span className="lop" onClick={fetchDat}>
          Phone Number?
        </span>
      </p>
    </div>
  ) : (
    <div>Done</div>
  )
) : null}

<div className="message">{message ? <p>{message}</p> : null}</div>
      {buttonVisible === true ?  <button className="logb" onClick={transfer}>Transfer</button> : <p>Processing...</p>}
               
           </Modal>
        </div>
    )
}
export default PostMon