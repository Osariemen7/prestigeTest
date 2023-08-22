import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Overdraft = () => {
    const navigate = useNavigate()
    const location = useLocation();
     let index = location.state.data

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
    let refresh = terms(tok)

    const currentDate = new Date(); // Get the current date

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() - 30)  

  
  const overdraft= ()=>{
    const data = index.name
       navigate('/components/overd', {state:{data}})
  }
    return(
        <div>
            <Link to='/components/savings'><i class="fa-solid fa-chevron-left bac"></i></Link>
             <h4 className="oveh">Overdraft</h4>
             <h5 className="ove">Overdraft Balance</h5>
             <h1 className="oveh">₦{(index.overdraft.balance).toLocaleString('en-US')}</h1>
            <button onClick={overdraft} className="logbd">Quick Credit</button>
             <div className="pd">
               <div className="ovp">
                  <p>Overdraft Limit</p>
                  <h4>₦{(index.overdraft.limit).toLocaleString('en-US')}</h4>
               </div> 
               <div className="ovpi">
                    <p>Tenure</p>
                    <h4>30 days</h4>
               </div>
               <div className="opp">
                   <p>Daily Interest</p>
                   <p>0.1%</p>
               </div>
             </div>
             <p className="ov">The fees will be applied only after you borrow from your loan account</p>
        </div>
    )
}
export default Overdraft