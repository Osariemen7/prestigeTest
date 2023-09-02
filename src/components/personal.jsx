import { useState } from "react"
import { useNavigate } from "react-router-dom";

  
const PersonalPage =() => {
    const [message, setMessage] = useState("");
    const [gender, setGender] = useState('');
    const [dob1, setDob] = useState('');
    const [bvn, setBvn] = useState('');
    const navigate = useNavigate();
    
    const handleGender =(event)=>{
        setGender(event.target.value)
  }
    const handleDob =(event)=>{
    setDob(event.target.value)
}
    const handleBvn =(event)=>{
    setBvn(event.target.value)
}
   
const date = new Date(dob1);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
let dob = `${day}/${month}/${year}`;

const handleSubmit=(e)=>{
  e.preventDefault()
  let data ={dob, bvn, gender}
  if ( dob.length < 1 || bvn.length < 1 || gender.length < 1){
    setMessage('All Fields must be Filled')
  }
  else {
  
  navigate('/components/resident', {state:{data}})
}}
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
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <button className='pog' onClick={handleSubmit} type="submit">Next</button>
            </form>
        
        </div>
    )
}
export default PersonalPage