import React, { useState, useEffect } from 'react';
import add from './images/bud.svg'
import pic from './images/v.svg';
import Modal from 'react-modal';
import good from './images/good.svg'
import { Link, useNavigate } from 'react-router-dom';

const Savings = () =>{
    const [total, setTotal] = useState([]);
    const [budget, setBudget] = useState('');
    const [nam, setNam] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [fun, setFun] = useState('')
    const [loading, setLoading]= useState(true)
    const navigate = useNavigate()
    const [sidebar, setSidebar] = useState('')

    const showSidebar = () => setSidebar(!sidebar)
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
let refresh = terms(tok)

   
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
    const handleInputChange = (event) => {
      setBudget(event.target.value);
    };
    const handleName =(event) => {
      setNam(event.target.value)
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
    setTotal(response)
      }}
      useEffect(() => {
        fetchDa()
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
        let name = nam.toUpperCase()
        console.warn(name, budget, account_type)
        let item = {name, budget, account_type};
      
    
      try {
        let result = await fetch('https://sandbox.prestigedelta.com/createsubaccount/', {
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
          setMessage(JSON.stringify(errorResult.message));
        } else {
           result =await result.json();
           setFun(JSON.stringify(result))
        }
      } catch (error) {
        // Handle fetch error
        console.error(error);
      }
    ;
    }
    const show=(index)=>{
      const data = total[index]
       navigate('/components/detail', {state:{data}})
    }
    console.log(total)
    if(loading) {
      return(
      <p>Loading...</p>)} 

    return(
        <div>
         <i onClick={showSidebar} class="fa-solid fa-bars bac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-house"></i>
                    <span className='dfp'>Home</span></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <span className='dfp'>Account</span></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/savings' className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <span className='dfp'>Sub-Account</span></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                  <span className='dfp'>Project</span></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/club' className='nav-text'><i class="fa-solid fa-people-group home"></i>
                     <span className='dfp'>Club</span></Link>
                    </li>
                    <li className='nav-list'>
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <span className='dfp'>Log Out</span></Link>
                    </li>
                </ul>
            </nav>
           
           <h3 className='saed'>Budget</h3>
           <div className='svin'>
              <p>Create sub-account and manage your cash flow</p>
              <img className=''  src={pic} alt='' onClick={openModal}/>
           </div>
           
           {total.map((obj, index) => (
  <div key={index} className='spt' onClick={() => show(index)}>
    <div className='bfle'>
      <img src={add} alt='' className='wad' />
      <span>{obj.name}</span>
    </div>
    {obj.budget !== 0 ? (
      <div>
        <div className='asx'>
          <p className='clun' key={index}>
            {Math.round(((parseInt(obj.spent) / parseInt(obj.budget)) * 100 + Number.EPSILON) * 100) / 100}%
          </p>
          <p className='clun'>₦{obj.spent.toLocaleString('en-US')} / ₦{obj.budget.toLocaleString('en-US')}</p>
        </div>
        <div className="progress-b" style={{ width: '100%' }}>
          <div className="progress-bi" style={{ width: `${(parseInt(obj.spent) / parseInt(obj.budget)) * 100}%` }}>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className='bfle'>
          <p className='clun' key={index}>0%</p>
          <p className='clun'>₦{obj.spent.toLocaleString('en-US')} / ₦{obj.budget.toLocaleString('en-US')}</p>
        </div>
        <div className="progress-b" style={{ width: '100%' }}>
          <div className="progress-bi" style={{ width: '0%' }}>
          </div>
        </div>
      </div>
    )}
  </div>
))}

           <Modal
      className='svmo'
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Popup"
    >
      {fun === '' ? (
      <div>
      <i className="fa-solid fa-x mx" onClick={closeModal}></i>
      <h3 className='h4'>Budget</h3>
      <form>
            <input type='text' placeholder='Name of Category' className='mine' onChange={handleName}/><br />
        <input type="number" className='mine' onChange={handleInputChange}  placeholder='Enter Monthly Budget Amount'/><br />
                {message ? <p>{message}</p> : null} 
                <button className='logbs' onClick={fproj}>Add</button>
            </form>
            </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={closeModal}></i>
          <img src={good} alt="" />
          <h4 className="hoo">Budget Successfully created!</h4>  
      </div>}
            </Modal> 
        </div>
    )

}
export default Savings