import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Bud=()=>{
    const [message, setMessage] = useState('');
    const [budget1, setBudget1] = useState(0);
    const [budget2, setBudget2] = useState(0);
    const [budget4, setBudget4] = useState(0)
    const [budget, setBudget] = useState(0)
    const [profit, setProfit] = useState(0);
    const [rev, setRevenue] = useState(0)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    const optio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const opt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const option = optio.map((p) => ({
      label: `${p}%`,
      value: p,
    }));
    const opti = opt.map((p) => ({
      label: `${p}%`,
      value: p,
    }));
    let tok = JSON.parse(localStorage.getItem("user-info"));
    const terms = (tok) => {
        let refreshval;
      
        if ( typeof tok ==='undefined' || tok === null) {
          refreshval = 0;
        } else {
          refreshval = tok.refresh_token;
        }
      
        return refreshval;
      };
      let refresh = terms(tok)

    const handleBuget1 =(event)=> {
        setBudget1(event.target.value)
    
    }
    const handleProfit =(profit)=> {
      setProfit(profit)
   }
   const handleRevenue =(rev)=> {
    setRevenue(rev)
}
    const handleBuget=(event)=> {
      setBudget(event.target.value)
  }
    const handleBuget2 =(event)=> {
        setBudget2(event.target.value)
    }
    
    const handleBuget4 =(event)=> {
        setBudget4(event.target.value)
         }
   
        const newTotal=parseFloat(budget1) + (parseFloat(budget2)  + parseFloat(budget4)) ;
         
      
console.log(parseFloat(budget2)  + parseFloat(budget4))
    async function bus(e) {
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
          let profit_growth = parseFloat(budget4) * parseFloat(profit.value)/100
          let revenue_growth = newTotal * rev.value/100 
          
          let item = {profit_growth, revenue_growth,
            sub_accounts: [
                {
                  name: "GENERAL EXPENSE",
                  account_type: "EXPENSE",
                  budget: budget1, // Replace with the actual state variable for buget1
                },
                {
                  name: "SALARIES",
                  account_type: "EXPENSE",
                  budget: budget2, // Replace with the actual state variable for buget2
                },
                  {
                    name: "PROFIT",
                    account_type: "EXPENSE",
                    budget: budget4, // Replace with the actual state variable for buget4
                  },
                ],
              
          };
          let result = await fetch ('https://sandbox.prestigedelta.com/createaccount/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json',
                'Authorization': `Bearer ${bab}`
           },
           body:JSON.stringify(item)
          });
          if (result.status !== 201 || newTotal !== budget) {
            result = await result.json()
            setMessage(JSON.stringify(result.message));
          } else {
            result = await result.json();
          localStorage.setItem('user-info', JSON.stringify(tok)) 
          navigate('/components/review', {state:{item}})
          }
        }

    return(
        <div>
        <h2>Set your Monthly Budget</h2>
        <form>
        <p className="sp">What is your intended revenue for the Month?</p>
            <input className="line" type='number' onChange={handleBuget} /><br/><br/>
            <p className="sp">what is you intended Monthly revenue growth?</p>
            <Select
      onChange={handleRevenue}
      className="lne"
      placeholder=""
      options={option}
      isSearchable={true}
      value={rev}
    />
    { rev !== 0 ? (<div>
            <p className="sp">What is your intended monthly profit target?</p>
            <input className="line" type='number' onChange={handleBuget1} /><br/><br/>
            <p className="sp">what is you intended Monthly profit growth</p>
            <Select
      onChange={handleProfit}
      className="lne"
      placeholder=""
      options={opti}
      isSearchable={true}
      value={profit}
    />
            <p className="sp">How much are you spending on salaries <br/>monthly?</p>
            <input className="line" type='number' onChange={handleBuget2} /><br/><br/> 
            <p className="sp">How much do spend on other expenses per month?</p>
            <input className="line" type='number' onChange={handleBuget4} /><br/><br/>
            <p className="ld">Note: The total of your profits, salaries, and general expenses should align with your revenue target</p> </div>): null}<div className="message">{message ? <p>{message}</p> : null}</div>
           <h4 >Your target Monthly revenue is:<br/>₦{(newTotal).toLocaleString('en-Us')}</h4> 
            
        <button className='pog' onClick={bus} type="submit">Next</button>    
        </form>

        </div>
    )
}
export default Bud