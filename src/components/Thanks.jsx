import tick from './images/tick.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ThankPage=()=>{
     const [monthly_revenue, setMonthly] = useState(100000)
     const [message, setMessage] = useState("");
     const navigate= useNavigate()
    
     let tok= JSON.parse(localStorage.getItem("user-info"));
     const terms = (tok) => {
      let refreshval;
    
      if (tok.length === 0) {
        refreshval = 0;
      } else {
        refreshval = tok.refresh_token;
      }
    
      return refreshval;
    };
    let refresh = terms(tok)
     async function create(e) {
        e.preventDefault();
        let ite ={refresh}
    let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(ite)
    });
    rep = await rep.json();
    let bab = rep.access_token
        setMonthly(monthly_revenue)
          console.warn(monthly_revenue)
          let item = {monthly_revenue};
          let result = await fetch ('https://sandbox.prestigedelta.com/createaccount/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json',
                'Authorization': `Bearer ${bab}`
           },
           body:JSON.stringify(item)
          });
          if (result.status !== 201) {
            setMessage("Some error occured");
          } else {
            result = await result.json();
          localStorage.setItem('user-info', JSON.stringify(result)) 
          navigate('/components/login')
          }
          
       }
    return(
        <div className='tha'>
           <div className=''>
              <img src={tick} alt=''/>
              <h2 className='tp'>Successful</h2>
              <p className='tp'>Click next to continue</p>
              <div className="message">{message ? <p>{message}</p> : null}</div>
              <button className='tbut' onClick={create}>Next</button>
           </div>
            
        </div>
    )
}
export default ThankPage