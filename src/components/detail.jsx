import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Select from 'react-select';
import good from './images/good.svg'


const Detail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState('');
    const [info, setInfo] = useState([])
    const [isOpned, setIsOpned] = useState(false);
    const [fin, setFin] = useState('')
    const [fun, setFun] = useState('')
    const [amount, setAmount] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [loading, setLoading] = useState(true)
    const [isOpens, setIsOpens] = useState(false);
    const [error, setError] = useState('');
    const [tock, setTock] = useState('');
    const [list, setList] = useState([])
    const [expense_budget, setExpense] = useState('');
    const [auto, setAuto] = useState('');
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

const openModal1 = () => {
    setIsOpens(true);
  };
  const closeModal1 = () => {
    setIsOpens(false); 
  };
  const openModals = () => {
    setIsOpned(true);
  };
  const closeModals = () => {
    setIsOpned(false); 
  };
  const close = () => {
    navigate('/components/savings')
  }

const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleAmount=(event)=> {
    setAmount(event.target.value)
  }
  const handleInputChange = (event) => {
    setExpense(event.target.value);
  };
  
  const debit = (selectedOption) => {
    let menu
    if (selectedOption.value === 'main'){
        menu = true;
    }else{
        menu = false
    }
    return menu
  }
  let debit_main = debit(selectedOption)

  const fetchInfo = async () => {
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
  let response = await fetch(`https://sandbox.prestigedelta.com/subtransactions/?start_date=01/31/2022&end_date=${(new Date()).toLocaleDateString('en-US')}&name=${index.name}`,{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  let result =  await fetch("https://sandbox.prestigedelta.com/autosort/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    result = await result.json();
  if (response.status === 401) {
    navigate('/components/login');
  } else {  
  response = await response.json();}

  setList(response)
  setAuto(result)

  }
  useEffect(() => {
    fetchInfo()
    }, [])
    async function fproj(e) {
      e.preventDefault();
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
        let account_type = 'EXPENSE'
        let sub_account = index.name
        console.warn(sub_account, expense_budget, account_type)
        let item = {sub_account, expense_budget, account_type};
      
    
      try {
        let result = await fetch('https://sandbox.prestigedelta.com/setsubbudget/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(item)
        });
    
        if (result.status === 400) {
          const errorResult = await result.json();
          setMessages(JSON.stringify(errorResult.message));
        } else {
           result =await result.json();
           setFin(JSON.stringify(result))
        }
      } catch (error) {
        // Handle fetch error
        console.error(error);
      }
    ;
    }

  async function fsav(e) {
    e.preventDefault();
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
      let receiver = index.name
      let funder = selectedOption.value
      console.warn(funder, debit_main, amount, receiver)
      let item = {funder, debit_main, amount, receiver};
    
  
    try {
      let result = await fetch('https://sandbox.prestigedelta.com/fundsubaccount/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${bab}`
        },
        body: JSON.stringify(item)
      });
  
      if (result.status !== 200) {
        const errorResult = await result.json();
        setMessage(JSON.stringify(errorResult.message));
      } else {
         result =await result.json();
         setFun(JSON.stringify(result))
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
    };
  }
  async function dauto() {
    
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
      const love =(index) =>{
        let sort
      if (index.auto_fund === true){
        sort = false
      } else {
        sort = true
      }
      return sort
    }
      let auto_sort= love(index)
      let name = index.name
      console.warn(auto_sort, name)
      let item = {auto_sort, name};
    
    try {
      let result = await fetch('https://sandbox.prestigedelta.com/autosort/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${bab}`
        },
        body: JSON.stringify(item)
      });
      result =await result.json();
        fetchDa()
    
    } catch (error) {
      // Handle fetch error
      console.error(error);
    };
  }
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
  let response = await fetch("https://sandbox.prestigedelta.com/subaccount/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  //localStorage.setItem('user-info', JSON.stringify(tok))
  
  if (response.status === 401) {
    navigate('/components/login');
  } else { 
   
  response = await response.json();
  setLoading(false)
  setInfo(response)
  
    }}
    useEffect(() => {
      fetchDa()
    }, [])

    async function closeProj(e){
        e.preventDefault()
        let project_name = index.name;
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
              console.warn(project_name )
              let ite ={project_name}
              let resut = await fetch (`https://sandbox.prestigedelta.com/subaccount/${index.name}/`,{
                  method: 'DELETE',
                  headers:{
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                    'Authorization': `Bearer ${bab}`
               },
               body:JSON.stringify(ite)
              });
              if (resut.status !== 200) {
                const errorResult = await resut.json();
                setError(JSON.stringify(errorResult));
              } else {
                 resut =await resut.json();
                    setTock(JSON.stringify(resut))}
      }
  const options = [
    ...info.map((item) => ({
      label: item.name,
      value: item.name,
    })),
    {
      value: 'main',
      label: 'MAIN ACCOUNT',
    },
  ];
  const overdraft= ()=>{
    const data = index
       navigate('/components/overdraft', {state:{data}})
  }
  if(loading) {
    return(
    <p>Loading...</p>)} 

    return(
        <div>
            <Link to='/components/savings'>
                 <i className="fa-solid fa-chevron-left bac"></i>
             </Link>
             <h4 className="cpn">{index.name} SUB ACCOUNT</h4>
             <div className="dash">
                <p className="dp">Balance</p>
                <h2 className="h2">₦{(index.balance.available_balance).toLocaleString('en-Us')}</h2> 
            <div className="act">
                 <button className="dogb" onClick={openModal}>Fund</button>  
                <button className="dogb" onClick={openModals}>Edit Budget</button>  
                <button onClick={() => overdraft()} className='dogb'>Overdraft</button>
            </div>
                
                             
             </div>
             <div className="asx">
                <p>Monthly Budget</p>
                <h4 className="sco">₦{(index.budget).toLocaleString('en-US')}</h4>
             </div>
             <div className="sev">
                <p>Amount Spent</p>
                <h4 className="sco">₦{(index.spent).toLocaleString('en-US')}</h4>
             </div>
          
             <div className="dax">
             
             {index.auto_fund === false ?(
             <button onClick={dauto} className="logb">Enable Auto Fund</button>):(
              <button onClick={dauto} className="logb">Disable Auto Fund</button>
             )}
             </div>
            
             <h4 className="saed">Activity</h4>
             {list.map((obj, index) => 
                  <div className='td'>
                  <div className='pax'>
                  <p className="tm" key={index}>{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                       <h4 className="tm" key={index}>₦{obj.amount}</h4>
                  </div>
                  <div className='tg'>
                       <p  key={index}>{obj.status}</p>
                  </div>
                       <p className='tm' key={index}>{obj.narration}</p>
                  </div>
                       )}
             <button className="plog" onClick={openModal1} >Close Sub Account</button>
             <Modal
      className='modal'
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Popup"
    >
      {fun === '' ? (
      <div>
      <i className="fa-solid fa-x mx" onClick={closeModal}></i>
      <h3 className='h4'>Fund {index.name }</h3>
      <form>
        
       <Select
      onChange={handleBank}
      className="pne"
      placeholder="Transfer From"
      options={options}
      isSearchable={true}
      value={selectedOption}
    />
                <p className='sp'>Enter Amount</p>
                <input type="number" onChange={handleAmount} className="line" placeholder="₦0.00" name="BVN"/><br/><br/>
                <p className='sp'>Add a Note</p>
                <input type='text' placeholder='Add a note' className='line' />
                <button onClick={fsav} className='logbs'>Fund</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
            </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={closeModal}></i>
          <img src={good} alt="" />
          <h4 className="hoo">Sub-Account Successfully Funded!</h4>  
      </div>}
            </Modal>
            <Modal
      className='prmo'
      isOpen={isOpens}
      onRequestClose={closeModal1}
      contentLabel="Example Popup"
    >
    {tock === '' ? (
      <div>
         <h3>Are you sure you want to close this Sub Account?</h3>
        <div  className="aflex">
          <button className="plut" onClick={closeProj}>Yes</button>
          <button className="plut" onClick={closeModal1}>No</button>
        </div>
        <p>Funds will be transfered into main account</p>
        {error ? <p>{error}</p> : null}
      </div>) :
      <div>
          <i class="fa-solid fa-x tx" onClick={close}></i>
          <img className="goo" src={good} alt="" />
          <h4 className="hoo">Sub account Closed Successfully</h4>  
      </div>}
    </Modal>
    <Modal
      className='svmo'
      isOpen={isOpned}
      onRequestClose={closeModals}
      contentLabel="Example Popup"
    >
      {fin === '' ? (
      <div>
      <i className="fa-solid fa-x mx" onClick={closeModals}></i>
      <h4 className='h4'>Set Monthly Amount for {index.name}</h4>
      <form>
        
      
        
        <input type="number" className='mine' onChange={handleInputChange}  placeholder='Enter New Amount'/><br />
                {messages ? <p>{messages}</p> : null} 
                <button className='logbs' onClick={fproj}>Save</button>
            </form>
            </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={closeModals}></i>
          <img src={good} alt="" />
          <h4 className="hoo">Sub Account Updated!</h4>  
      </div>}
            </Modal>
        </div>
    )
}

export default Detail