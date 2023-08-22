import {useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom'
const Display = ()=>{
       const [message, setMessage] = useState('')
       const navigate = useNavigate()
       const location = useLocation()
       let am = location.state.data
       let amount = am.amount
       let sub_account = am.sub_account
       const currentDate = new Date(); // Get the current date

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() + 30)  

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
    
    async function overdraft(e){
        e.preventDefault()
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
              console.warn(amount, sub_account )
              let ited ={amount, sub_account}
              let resut = await fetch ('https://sandbox.prestigedelta.com/overdraftdrawdown/',{
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                    'Authorization': `Bearer ${bab}`
               },
               body:JSON.stringify(ited)
              });
              if (resut.status !== 200) {
                const errorResult = await resut.json();
                setMessage(JSON.stringify(errorResult.message));
              } else {
                 resut =await resut.json();
                 navigate('/components/odip')
                    }
      }
      console.log(am)

    return(
        <div>
        <Link to='/components/savings'><i class="fa-solid fa-chevron-left bac"></i></Link>
        <h4 className='oveh'>Confirm Overdraft</h4>
        <p className='ove'>You are borrowing</p>
        <h1>₦{(parseInt(amount)).toLocaleString('en-US')}</h1>
             <div className='rev'>
                <p>From</p>
                <p>Overdraft Account</p>
             </div>
             <div className='orev'>
                <p>To</p>
                <p>{am.sub_account} Sub Account</p>
             </div>
             <div className='revd'>
                <p>Maturity Date</p>
                <p>{(thirtyDaysBefore).toLocaleDateString('en-GB')}</p>
             </div>
             <div className='rev'>
                <p>Daily Interest Rate</p>
                <p>0.3%</p>
             </div>
             <div className='orev2'>
                <p>Term</p>
                <p>Daily</p>
             </div>
             <div className='orev'>
                <p>Description</p>
                <p>Overdraft</p>
             </div>
             <button className='logb' onClick={overdraft}>Proceed</button>
             <div className="message">{message ? <p>{message}</p> : null}</div>
        </div>
    )
}
export default Display