import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinesPage=()=>{
    const [business_name, setBusinessname] = useState('');
    const [business_type, setBusinesstype] = useState('');
    const [create_anchor_user, setCreateanchoruser] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    
    let pers =  JSON.parse(localStorage.getItem("user-info"));   
    let re= JSON.parse(localStorage.getItem("user-info"));
        let bane = re.first_name
        let gender =pers.gender
        let dob = pers.dob
        let bvn = pers.bvn
        let address = pers.address
        let city = pers.city
        let state = pers.state
    const handleBusiness=(event) =>{
        setBusinessname(event.target.value)
    }
    const handleBusinesstype =(event) => {
        setBusinesstype(event.target.value)
    }
    async function bus(e) {
        e.preventDefault();
          setCreateanchoruser(create_anchor_user)
          console.warn(gender, address, dob, bvn, city, state, business_name, business_type, create_anchor_user)
          let item = {gender, address, dob, bvn, city, state, business_name, business_type, create_anchor_user};
          let result = await fetch ('https://sandbox.prestigedelta.com/updateuser/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json',
                'Authorization': `Bearer ${access}`
           },
           body:JSON.stringify(item)
          });
          localStorage.setItem('user-info', JSON.stringify(item))
          if (result.status !== 200) {
            setMessage("Some error occured");
          } else {
            result = await result.json();
          localStorage.setItem('user-info', JSON.stringify(result)) 
          navigate('/components/personal')
          }
        }
    return(
        <div>
            <h2>Hi {bane}, tell us about<br /> your business</h2>
            <p>Prestige finance is legally required to collect this information</p>
            <form>
                <p className='sp'>Business Name</p>
                <input type="text" onChange={handleBusiness} className="line" />
                <p className='sp'>Type of Business</p>
                <select className="li" onChange={handleBusinesstype}>
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
                <button className='but' onClick={bus} type="submit">Next</button>
            </form>
        </div>
    )
}
export default BusinesPage