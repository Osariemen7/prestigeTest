import { useState } from "react"
import { useNavigate } from "react-router-dom";

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
  const term = (tok) => {
    let banes 
    if (typeof tok === 'undefined' || tok === null) {
    
     banes = "";
    } else {
      banes = tok.first_name;;
    }
  
    return banes;
  };
  let bane = term(tok)
  
const PersonalPage =() => {
    const [message, setMessage] = useState("");
    const [gender, setGender] = useState('');
    const [dob1, setDob] = useState('');
    const [bvn, setBvn] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [business_name, setBusinessname] = useState('');
    const [business_type, setBusinesstype] = useState('');
    const [create_anchor_user, setCreateanchoruser] = useState(true);
    const navigate = useNavigate();
    const handleBusiness=(event) =>{
        setBusinessname(event.target.value)
    }
    const handleBusinesstype =(event) => {
        setBusinesstype(event.target.value)
    }
    const handleGender =(event)=>{
        setGender(event.target.value)
  }
    const handleDob =(event)=>{
    setDob(event.target.value)
}
    const handleBvn =(event)=>{
    setBvn(event.target.value)
}
    const handleCity =(event)=>{
    setCity(event.target.value)
}
    const handleState =(event)=>{
    setState(event.target.value)
}
    const handleAddress =(event)=>{
    setAddress(event.target.value)
}
const date = new Date(dob1);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
let dob = `${day}/${month}/${year}`;
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
    
      setCreateanchoruser(create_anchor_user)
      console.warn(gender, address, dob, bvn, city, state, business_name, business_type, create_anchor_user)
      let item = {gender, address, dob, bvn, city, state, business_name, business_type, create_anchor_user};
      let result = await fetch ('https://sandbox.prestigedelta.com/updateuser/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json',
            'Authorization': `Bearer ${bab}`
       },
       body:JSON.stringify(item)
      });
    
      if (result.status !== 200) {
        setMessage("Some error occured");
      } else {
        result = await result.json();
      localStorage.setItem('user-info', JSON.stringify(tok)) 
      navigate('/components/thanks')
      }
    }
 console.log(tok)
    return(
        <div>
            <h2>Enter your pesonal information</h2>
            <p>Please enter your BVN, regulations require us<br/> to verify your identity</p>
            <form>
                <p className='sp'>Gender</p>
                <select onChange={handleGender} className="line">
                    <option></option>
                    <option>Female</option>
                    <option>Male</option>
                </select>
                <p className='sp'>Date of Birth</p>
                <input onChange={handleDob} className="line" type="date" placeholder="Date of Birth" name="birth"/><br/> 
                <p className='sp'>Bank Verification Number</p>
                <input type="text" onChange={handleBvn} className="line" placeholder="BVN" name="BVN"/><br/><br/>
                <h2>Enter your Residential Address</h2>
                <p className='sp'>Residential Address</p>
                <input type="text" onChange={handleAddress} className="line" placeholder="Enter Residential Address"/><br/>
                 <p className='sp'>State</p>
                 <select onChange={handleState} className="line" placeholder="Enter State">
                    <option></option>
                    <option>Abia</option>
                    <option>Adamawa</option>
                    <option>Akwa-ibom</option>
                    <option>Anambra</option>
                    <option>Bauchi</option>
                    <option>Bayelsa</option>
                    <option>Benue</option>
                    <option>Borno</option>
                    <option>Cross-Rivers</option>
                    <option>Delta</option>
                    <option>Ebonyi</option>
                    <option>Edo</option>
                    <option>Ekiti</option>
                    <option>Enugu</option>
                    <option>FCT</option>
                    <option>Gombe</option>
                    <option>Imo</option>
                    <option>Jigawa</option>
                    <option>Kaduna</option>
                    <option>Kano</option>
                    <option>Kastina</option>
                    <option>Kebbi</option>
                    <option>Kogi</option>
                    <option>Kwara</option>
                    <option>Lagos</option>
                    <option>Nasarawa</option>
                    <option>Niger</option>
                    <option>Ogun</option>
                    <option>Ondo</option>
                    <option>Osun</option>
                    <option>Oyo</option>
                    <option>Plateau</option>
                    <option>Rivers</option>
                    <option>Sokoto</option>
                    <option>Taraba</option>
                    <option>Yobe</option>
                    <option>Zamfara</option>

                    </select>
                 <br/>
                 <p className='sp'>City</p>
                 <input className="line" onChange={handleCity} type="text" placeholder="Enter City" /><br/>
                 <h2>Hi {bane}, tell us about<br /> your business</h2>
            <p>Prestige finance is legally required to collect this information</p>
            
                <p className='sp'>Business Name</p>
                <input type="text" onChange={handleBusiness} className="line" />
                <p className='sp'>Type of Business</p>
                <select className="line" onChange={handleBusinesstype}>
                    <option> </option>
                    <option>Agency Banking</option>
                    <option>Fast Food Restuarants</option>
                    <option>Pharmacies</option>
                    <option>Health and Beauty Spas</option>
                    <option>Retail Merchant</option>
                    <option>Barber and Beauty Spas</option>
                    <option>Electrical delivery business</option>
                    <option>Car Washes</option>
                    <option>Stationaries/Office Supplies</option>
                    <option>Others</option>
                </select>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <button className='pog' onClick={bus} type="submit">Next</button>
            </form>
        
        </div>
    )
}
export default PersonalPage