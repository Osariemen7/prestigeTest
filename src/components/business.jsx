import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GetGroup = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let tok = JSON.parse(localStorage.getItem('user-info'));
      let refresh = tok ? tok.refresh_token : 0;
      let item = { refresh };

      let rep = await fetch('https://sandbox.prestigedelta.com/refreshtoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (rep.status === 401) {
        navigate('/components/login');
        return;
      }

      rep = await rep.json();
      let bab = rep.access_token;

      let response = await fetch('https://sandbox.prestigedelta.com/group/', {
        method: 'GET',
        headers: { Authorization: `Bearer ${bab}` },
      });

      response = await response.json();
      setUsers(response);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once during the initial render

  console.log(users);

  return (
    <div>
       
       <div  className='pd'>
                <div className='pp'>
                <p className='pn' >Your Progress</p>
                    <p className='prog'>On Track</p>
                </div>
                <div className='ppn'>
                    <p >Average Total of Project</p>
                    <p>{info[0].my_membership.performance * 100}% </p>
                </div>
                <div>
                  <div className="progress-b" style={{ width: `${100}%` }}>
                  <div className="progress-bar" style={{ width: `${info[0].my_membership.performance *100}%` }}>
                   </div> </div>
                 
                </div>
       </div>
    </div>
  );
};

export default GetGroup;
