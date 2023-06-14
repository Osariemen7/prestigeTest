import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Vector from './images/Vector.svg';

let tok= JSON.parse(localStorage.getItem("user-info"));
const term = (tok) => {
  let refval;  
  if (typeof tok === 'undefined' || tok === null) {
    refval = 0;
  } else {
    refval = tok.refresh_token;
  }

  return refval;
}
let refresh = term(tok)
const Select =()=> {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation();
  let pane = location.state.pal
  const terms = (pane) => {
    let nam;  
    if (typeof pane === 'undefined'|| pane === null) {
      nam = 'null';
    } else {
      nam = pane.pan.name;
    }
  
    return nam;
  };
  let name = terms(pane)
  
  const term1 = (pane) => {
    let tots;  
    if (typeof pane === 'undefined' || pane === null) {
      tots = 0;
    } else {
      tots= pane.pan.tota;
    }
  
    return tots;
  }
  let tota = term1(pane)
  let total = (tota).toLocaleString('en-US')
  const term2 = (pane) => {
    let pay;  
    if (pane.length === 0) {
      pay = 0;
    } else {
      pay = pane.clickedItem;
    }
  
    return pay;
  }
  let payment_amount = term2(pane)
  const term3 = (pane) => {
    let pays;  
    if (pane.length === 0) {
      pays = 0;
    } else {
      pays = pane.often;
    }
  
    return pays;
  }
  let payment_frequency = term3(pane)
  const term4 = (pane) => {
    let ast;  
    if (pane.length === 0) {
      ast = 'null';
    } else {
      ast= pane.pan.assets;
    }
  
    return ast;
  }
  let assets = term4(pane)
  let thirty =parseInt(tota)* 30/100
  console.log(thirty)
  let seventy = tota - thirty
  let interest = seventy * 6/100
  const targetAmount = thirty
  const frequentSavings = payment_amount;
  
  const paying = (payment_frequency, targetAmount, frequentSavings) => {
    let repayment_mat;
    const currentDate = new Date();
    const remain = Math.ceil(targetAmount / frequentSavings);
    switch (payment_frequency) {
      case 'Daily':
        let startDat = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        repayment_mat = new Date(startDat.getTime() + remain * 24 * 60 * 60 * 1000);
        break;
  
      case 'Weekly':
        let startDa = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        repayment_mat = new Date(startDa.getTime() + remain * 7 * 24 * 60 * 60 * 1000);
        break;
  
      default:
         let startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1
        );
        repayment_mat = new Date(startDate.setMonth(startDate.getMonth() + remain));
        break;
    }
  
    return repayment_mat;
  };
  
  let funding_dat = paying(payment_frequency, targetAmount, frequentSavings);
  let funding_dates = (funding_dat).toDateString('en-GB')
  let funding_date = (funding_dat).toLocaleDateString('en-GB')
  const pay = (payment_frequency, tota, frequentSavings) => {
    let repayment_mat;
    const currentDate = new Date();
    const remain = Math.ceil(tota / frequentSavings);
    switch (payment_frequency) {
      case 'Daily':
        let startDat = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        repayment_mat = new Date(startDat.getTime() + remain * 24 * 60 * 60 * 1000);
        break;
  
      case 'Weekly':
        let startDa = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        repayment_mat = new Date(startDa.getTime() + remain * 7 * 24 * 60 * 60 * 1000);
        break;
  
      default:
         let startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1
        );
        repayment_mat = new Date(startDate.setMonth(startDate.getMonth() + remain));
        break;
    }
  
    return repayment_mat;
  };
  
  let repayment_mature = pay(payment_frequency, tota, frequentSavings);
  let repayment_maturi = (repayment_mature).toDateString('en-GB')
  let repayment_maturity = (repayment_mature).toLocaleDateString('en-GB')
    
  async function agree(e) {
    e.preventDefault();
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
      console.warn(name, payment_amount, payment_frequency, repayment_maturity, funding_date, assets)
      let project = {name, payment_amount, payment_frequency, repayment_maturity, funding_date, assets};
      let result = await fetch ('https://sandbox.prestigedelta.com/createproject/',{
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${bab}`,
            'Content-Type': 'application/json',
            'accept' : 'application/json'
       },
       body:JSON.stringify(project)
      });
      if (result.status === 400) {
        setMessage("Invalid Information");
      } else if (result.status === 500) { 
        setMessage('Click again!');
      } else {
        result = await result.json();
        navigate('/components/pro', { state: { name } });
      }
      
    }
    console.log(funding_date)
    console.log(name)
    console.log(tota)
   console.log(pane)
 
 
  return(
        <div>
           <Link to='/components/createp'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <h4 className='shi'>{name}</h4>
            <p className='rp'>Estimated Project amount</p>
            <h1 className='rh'>₦{total}</h1>
            <div className='rev'>
                <p>Saving target</p>
             <p className='revp'>₦{thirty}</p>
            </div>
            <div className='rev'>
                <p>Recuring Savings</p>
                <p>₦{payment_amount}/{payment_frequency}</p>
            </div>
            <div className='revd'>
                <p>Amount to be loan</p>
                <p>₦{seventy}</p>
            </div>
            <div className='rev'>
                <p>Interest value</p>
                <p className='revp'>₦{interest}(6%p.a)</p>
            </div>
            <div className='rev'>
                <p>Est. Maturity date</p>
                <p>{funding_dates}</p>
            </div>
            <div className='revd'>
                <p>Est. Repayment date</p>
                <p>{repayment_maturi}</p>
            </div>
            <div className='dflex'>
            <img src={Vector} alt=''/>
                <p className='rp'>Maturity date may depend on your ability to make the payment on schedule</p>
            </div>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <button onClick={agree} className='but1'>Agree & Continue</button>
          <Link to='/components/createp'><button className='but2'>Start over</button></Link>  
        </div>
    )
}
export default Select