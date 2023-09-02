import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Resident =()=>{
    const [message, setMessage] = useState("");
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const location = useLocation()

    const pers = location.state.data
    const handleCity =(event)=>{
        setCity(event.target.value)
    }
        const handleState =(event)=>{
        setState(event.target.value)
    }
        const handleAddress =(event)=>{
        setAddress(event.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        let data ={city, state, address, pers}
        if ( city.length < 1 || state.length < 1 || address.length < 1){
          setMessage('All Fields must be Filled')
        }
        else {
        
        navigate('/components/rebout', {state:{data}})
      }}
    return(

        <div>
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
                 <div className="message">{message ? <p>{message}</p> : null}</div>
                <button className='pog' onClick={handleSubmit} type="submit">Next</button>
        </div>
    )
}
export default Resident