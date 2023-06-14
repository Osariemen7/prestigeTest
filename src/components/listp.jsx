import { useState } from 'react'
import { Link, useNavigate,  useLocation } from 'react-router-dom';
import Modal from 'react-modal';

// let tick= JSON.parse(localStorage.getItem("user-info"));


const ListPage=()=>{
    const [message, setMessage] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [asset_price1, setAssetsprice] = useState([]);
    const [asset_name1, setAssetname] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [is_purchase, setIspurchase] = useState(true)
    const [often, setOften] = useState('');
    const navigate = useNavigate()
    const location = useLocation();
  let tick = location.state.data
  const term = (tick) => {
    let nam;
    if (typeof tick=== 'undefined' || tick === null) {
      nam = "";
    } else {
      nam = tick.name;
    }
    return nam;
  };
  let name = term(tick)
    const handleChange =(event)=> {
      setOften(event.target.value)
    }
       let tota =(asset_price1.reduce((total, to) => {
            return total + parseInt (to);
          }, 0));
    let total = (tota).toLocaleString('en-US')
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
    
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    const handleInputChang = (event) => {
      setInputVal(event.target.value);
      
    };

  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      setAssetname([...asset_name1, inputValue]);
      setInputValue("");
      setAssetsprice([...asset_price1, inputVal]);
      setInputVal();
      closeModal()
    }
     const handleSubmit =(event) => {
      setIspurchase(is_purchase)
        event.preventDefault();
        if (asset_name1.length < 1) {
          setMessage('Please Add items')
        } else {
          let asset_name =(asset_name1.toString())
          let asset_price= (asset_price1.toString())
          let assets = [{asset_name, asset_price, is_purchase}]
          let pro = {assets, name, tota}
          
                navigate('/components/frequent', {state:{pro}})
        }
     }
  console.log(tick)
    return(
        <div>
            <Link to='/components/createp'><i class="fa-solid fa-chevron-left bac" onClick={openModal}></i></Link>
            <h3>What do you intend to purchase<br/> or lease as part of this project?</h3>
            <p className='ptt'>Add a list of resource you will need for this project<br/>eg land for farming, Equipment</p>
            <h1 >₦{total}</h1>
            <p className="listp">Estimated amount needed for your business</p>
            <button onClick={openModal} className="ulbut">Add Item</button>
            <div>
          
            <div className='ul'>
                 <ul className="aul">
                    {asset_name1.map((todo, index) => (
                     <p key={index}>{todo}</p>))}
                 </ul>
                 <ul className="aul">
                     {asset_price1.map((to, index1) => (
                    <p key={index1}>₦{to}</p>
                  ))}
                 </ul>
           </div>
           
            </div>
            <Modal
            className='modal'
            isOpen={isOpen}
             onRequestClose={closeModal}
               contentLabel="Example Popup">
        <i class="fa-solid fa-x mx" onClick={closeModal}></i>
           <h3 className='h4'>Add Item to Project</h3>
            <form >
                <p className='mp'>Item</p>
                <input type="text" className='mine'  onChange={handleInputChange} /><br/>
                <p className='mp'>Estimated cost</p>
                <input type="number" className='mine' onChange={handleInputChang} /><br/>
                   <input type='radio'
                    value='true' 
                    checked={often === 'true'}
                    onChange={handleChange}
                    />
                   <label> On Purchase</label>
            
                   <input type='radio' className='rad'
                    value='false'
                    checked={often === 'false'}
                    onChange={handleChange} />
                   <label>On Lease</label>
                
                <button className='put' onClick={handleFormSubmit}>Continue</button>
            </form>
            </Modal> 
            {message ? <p>{message}</p> : null}
            <button className='but1' onClick={handleSubmit}>Continue</button>
        </div>
    )
}
export default ListPage