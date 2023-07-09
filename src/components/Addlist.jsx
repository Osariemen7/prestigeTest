import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Vector from './images/Vector.svg';
import Modal from 'react-modal';


const Addlist=()=>{
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isOpens, setIsOpens] = useState(false);
  const [tock, setTock] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const location = useLocation();
  let index = location.state.data
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal1 = () => {
    setIsOpens(true);
  };
  const closeModal1 = () => {
    setIsOpens(false);
    
  };
  const close = () => {
    navigate('/components/project')
  }
  
  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };
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
  let response = await fetch("https://sandbox.prestigedelta.com/projectlist/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  //localStorage.setItem('user-info', JSON.stringify(item))
  response = await response.json()
  setInfo(response)
  setLoading(false)
}
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
    console.warn(index.name, amount)
    let project_name = index.name
    let item = {project_name, amount};
  

  try {
    let result = await fetch('https://sandbox.prestigedelta.com/fundproject/', {
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
      setMessage(JSON.stringify(errorResult));
    } else {
       result =await result.json();
      
      closeModal();
    }
  } catch (error) {
    // Handle fetch error
    console.error(error);
  }
;
}
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
        let resut = await fetch ('https://sandbox.prestigedelta.com/closeproject/',{
            method: 'POST',
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
console.log(index)
console.log(info)

if(loading) {
  return(
  <p>Loading</p>)
}
return (
  <div>
    <Link to='/components/project'>
      <i className="fa-solid fa-chevron-left bac"></i>
    </Link>
    
      <div >
        <h4 className="dh3">{index.name}</h4>
        <div className="kd">
          <div className="pp">
            <p>Balance</p>
            <p>In Progress</p>
          </div>
          <h2 className="ah3">₦{(parseInt(index.target) - parseInt(index.equity)).toLocaleString('en-US')}</h2>
          <p key={index}>{ Math.round(((parseInt( index.equity)/parseInt(index.target) * 100) + Number.EPSILON) * 100) / 100}% </p>
          <div className="progress-b" style={{ width: `${100}%` }}>
          <div className="progress-bar" style={{ width: `${parseInt(index.equity) / parseInt(index.target) * 100}%` }}>
          </div> </div>
          
        </div>
        <div className="aflex">
          <button className="pof" onClick={openModal}>Top up</button>
          <Link className="trb" to='/components/transact'>View Transactions</Link>
        </div>
        <div className='dflex'>
          <img src={Vector} alt='' />
          <p className='dfp'>Maturity date may depend on your ability to make the payment on schedule</p>
        </div>
        <div className="adf">
          <div className="asav">
            <p>Savings Target (30%)</p>
            <p>Maturity Date</p>
          </div>
          <div className="asav1">
            <p>₦{(index.target_equity)}</p>
            <p>{(new Date(index.maturity_day)).toLocaleDateString('en-GB')}</p>
          </div>
        </div>
        <div className="adf">
          <div className="asa2">
            <p>Interest Value (6% p.a)</p>
            <p>Repayment Date</p>
          </div>
          <div className="asav1">
            <p>₦{(index.interest_value)}</p>
            <p>{(new Date(index.repayment_day)).toLocaleDateString('en-GB')}</p>
          </div>
        </div>
        <h4 className="prit">Project Resources</h4>
        <p className="prip">List of project resources you will need for this project</p>
        <div>
        {index.assets.map((obj, index) =>
          <div key={index} className="asa">
            <p>{obj.name}</p>

            <p>₦{(obj.price).toLocaleString('en-US')}</p>
          </div>)}
          <div className="asagr">
            <p>Total</p>
            <p>₦{(index.target).toLocaleString('en-US')}</p>
          </div>
        </div>
      </div>
        <button className="plog" onClick={openModal1} >Close Project</button>
    <Modal
      className='modal'
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Popup"
    >
      <i className="fa-solid fa-x mx" onClick={closeModal}></i>
      <h3 className='h4'>Instantly Top Up</h3>
      <form>
        <p className='mp'>Enter Amount</p>
        <input type="text" className='mine' onChange={handleInputChange} /><br />
        <p className='mp'>Payment Method</p>
        <select className="line">
                <option></option>
                <option>Prestige Account</option>
                </select>
                {message ? <p>{message}</p> : null} 
                <button className='logbs' onClick={fproj}>Continue</button>
            </form>
            </Modal> 
            <Modal
      className='prmo'
      isOpen={isOpens}
      onRequestClose={closeModal1}
      contentLabel="Example Popup"
    >
    {tock === '' ? (
      <div>
         <h3>Are you sure you want to close this project?</h3>
        <div  className="aflex">
          <button className="plut" onClick={closeProj}>Yes</button>
          <button className="plut" onClick={closeModal1}>No</button>
        </div>
        <p>Funds will be transfered into main account</p>
      </div>) :
      <div>
          <i class="fa-solid fa-x tx" onClick={close}></i>
          <h4>{tock}</h4>
          <p>{error}</p>
      </div>}
    </Modal>
    </div>
  )
}
export default Addlist