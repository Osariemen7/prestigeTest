import tick from './images/tick.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankPage=()=>{
     const [monthly_revenue, setMonthly] = useState(100000)
     const [message, setMessage] = useState("");
     const navigate= useNavigate()
    //  useEffect(() => {
    //   const reloadCount = sessionStorage.getItem('reloadCount');
    
    //   if (!reloadCount || parseInt(reloadCount) < 1) {
    //     const updatedReloadCount = reloadCount ? parseInt(reloadCount) + 1 : 1;
    //     sessionStorage.setItem('reloadCount', String(updatedReloadCount));
    //     if (!reloadCount) {
    //       window.location.reload();
    //     }
    //   } else {
    //     sessionStorage.removeItem('reloadCount');
    //   }
    // }, []);
    
     let tok= JSON.parse(localStorage.getItem("user-info"));
     const term = (tok) => {
      let refval;  
      if (tok === null || typeof tok === 'undefined') {
        refval = 0;
      } else {
        refval = tok.refresh_token;
      }
    
      return refval;
    }
    let refresh = term(tok)
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
            setMessage(JSON.stringify(result.response));
          } else {
            result = await result.json();
          localStorage.setItem('user-info', JSON.stringify(result)) 
          navigate('/components/login')
          }
        }
        console.log(tok)
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