import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  ShareButton  from './business.jsx'
import Modal from 'react-modal';

const Club = () => {
  const [info, setInfo] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  
  const terms = (tok) => {
    let refreshval;

    if (tok === null || typeof tok === "undefined") {
      refreshval = 0;
    } else {
      refreshval = tok.refresh_token;
    }

    return refreshval;
  };

  let tok = JSON.parse(localStorage.getItem("user-info"));
  const refresh = terms(tok);

  const fetchData = async () => {
    try {
      let item = { refresh };
      let rep = await fetch('https://sandbox.prestigedelta.com/refreshtoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(item)
      });
      rep = await rep.json();
      let bab = rep.access_token;

      let response = await fetch("https://sandbox.prestigedelta.com/members/", {
        method: "GET",
        headers: { 'Authorization': `Bearer ${bab}` },
      });
      response = await response.json();

      localStorage.setItem('user-info', JSON.stringify(tok));
      setUsers(response);
    } catch (error) {
      console.error(error);
      // Handle any error that occurred during fetching data
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(users);

  const fetchDa = async () => {
    try {
      let item = { refresh };
      let rep = await fetch('https://sandbox.prestigedelta.com/refreshtoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(item)
      });

      rep = await rep.json();
      let bab = rep.access_token;

      let response = await fetch("https://sandbox.prestigedelta.com/group/", {
        method: "GET",
        headers: { 'Authorization': `Bearer ${bab}` },
      });

      if (response.status === 401) {
        navigate('/components/login');
      } else if (response.status === 400) {
        navigate('/components/fclub');
      } else {
        response = await response.json();
        setLoading(false)
        setInfo(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDa();
  }, []);
  const openModal = (index) => {
    setSelectedUser(users[index]);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setMessage(null);
    setError(null)
  };
  console.log(selectedUser)
  const blacklist =()=> {
    setMessage('Blacklist this user?')
  }
  async function blacklisted(e){
    e.preventDefault()
    let blacklist = true
    let invite_code =info[0].my_membership.invite_code
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
          console.warn(blacklist, invite_code )
          let ite ={blacklist, invite_code}
          let resut = await fetch ('https://sandbox.prestigedelta.com/blacklistgroup/',{
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
                setMessage(null)}
  }

  if (info.length < 1) {
    return (
      <div>
        <h3 className='head'>Community</h3>
        <p className='cl'>Join or Create a lending group</p>
        <p className='clt'>You have no active plan yet. Click on button to create plan</p>
        <div>
          <Link to='/components/cclub'><button className='but1'>Create Club</button></Link>
          <Link to='/components/joinc'><button className='cut'>Join an existing Club</button></Link>
        </div>
        <footer className='dflex2'>
          <div>
            <Link to='/components/dash'><i className="fa-solid fa-house home"></i></Link>
            <p className='dfp'>Home</p>
          </div>
          <div>
            <Link to='/components/project'><i className="fa-solid fa-layer-group home"></i></Link>
            <p className='dfp'>Project</p>
          </div>
          <div>
            <i className="fa-solid fa-people-group home1"></i>
            <p className='dfp'>Club</p>
          </div>
          <div>
            <Link to='/components/accounts'><i className="fa-solid fa-wallet home"></i></Link>
            <p className='dfp'>Account</p>
          </div>
        </footer>
       
      </div>
    );
  } else {
    return (
      <div>
        <h2 className='head'>Group</h2>

        <div className='pd'>
          <div className='pp'>
            <p className='pn'>Your Progress</p>
            <p className='prog'>On Track</p>
          </div>
          <div className='ppn'>
            <p>Average Total of Project</p>
            <p>{info[0].my_membership.performance * 100}%</p>
          </div>
          <div>
            <div className="progress-b" style={{ width: `${100}%` }}>
              <div className="progress-bar" style={{ width: `${info[0].my_membership.performance * 100}%` }}>
              </div>
            </div>
          </div>
        </div>
        <div>   
  {info[0].my_membership.super_admin === true ? (
    <ShareButton inviteCode={info[0].my_membership.invite_code}/>
   
  ) : null}
</div>
        <p></p>
        <div className='clup'>
          <div className='clu'>
            <p className='clund'>Group Performance</p>
            <h3 className='clun'>{info[0].performance}%</h3>
          </div>
          <div className='clu'>
            <p className='clund'>Number of Users</p>
            <h3 className='clun'>{info[0].members_no}</h3>
          </div>
        </div>
        <div className='clup'>
          <div className='clu'>
            <p className='clund'>Total Number of Projects</p>
            <h3 className='clun'>{info[0].projects_no}</h3>
          </div>
          <div className='clu'>
            <p className='clund'>Group Status</p>
            <h3 className='clun'>{info[0].status}</h3>
          </div>
        </div>
        <h3>Members</h3>
        <div>
          {users.map((obj, index) =>
            <div className='cpp' key={index} onClick={() => openModal(index)}>
              <div className='cprof'>{obj.member.first_name[0]}{obj.member.last_name[0]}</div>
              <div className='cprog'>
                <p className='cpn'>{obj.member.first_name} {obj.member.last_name}</p>
                <div className="progress-b" style={{ width: `${100}%` }}>
                  <div className="progress-bar" style={{ width: `${obj.performance * 100}%` }}>
                  </div>
                </div>
              </div>
              <h3>{obj.performance * 100}%</h3>
            </div>
          )}
        </div>

        <footer className='dflex2'>
          <div>
            <Link to='/components/dash'><i className="fa-solid fa-house home"></i></Link>
            <p className='dfp'>Home</p>
          </div>
          <div>
            <Link to='/components/project'><i className="fa-solid fa-layer-group home"></i></Link>
            <p className='dfp'>Project</p>
          </div>
          <div>
            <i className="fa-solid fa-people-group home1"></i>
            <p className='dfp'>Club</p>
          </div>
          <div>
            <Link to='/components/accounts'><i className="fa-solid fa-wallet home"></i></Link>
            <p className='dfp'>Account</p>
          </div>
        </footer>
        <Modal
            className='trmo'
           isOpen={isOpen}
             onRequestClose={closeModal}
               contentLabel="Example Popup">
               <i class="fa-solid fa-x tx" onClick={closeModal}></i>
              {selectedUser && (

                <div>
                    <div className='blk'>{selectedUser.member.first_name[0]}{selectedUser.member.last_name[0]}</div>
                    <div className='plex'>
                    <h4 className=''>{selectedUser.member.first_name} {selectedUser.member.last_name}</h4>
                    <p className='trk'>On Track</p>
                    </div>

                    <div className='clunm'>
          <div className='clu'>
            <p className='clund'>Project Performance</p>
            <h3 className='clun'>{selectedUser.performance}%</h3>
          </div>
          <div className='clu'>
            <p className='clund'>Project Plans</p>
            <h3 className='clun'>{selectedUser.projects_no}</h3>
          </div>
        </div>
        <div className='since'>
              <p>Member since:{(new Date(selectedUser.join_date)).toLocaleDateString('en-GB')} </p>
             <p>Last Deposit: {(new Date(selectedUser.last_deposit)).toLocaleDateString('en-GB')}</p>
        </div>
        <div>
        {info[0].my_membership.super_admin === true ? (
          <div>
              <h4 className='black' onClick={blacklist}>Add user to Blacklist</h4>
              <div >{message ? <button className="blog" onClick={blacklisted}>{message}</button> : null}</div>
              <div className="message">{error ? <p>{error}</p> : null}</div>
              <p className='l'>Add user to blacklist so to restrict the user from accessing overdraft and project funds</p>
         </div>
     ) : null}
        </div>
        
                </div>
          
        )}
        </Modal>
      </div>
    );
  }
};
// {selectedUser && (
                
//   <div>
//       <div className='blk'>{selectedUser.member.first_name[0]}{selectedUser.member.last_name[0]}</div>
//       <div className='plex'>
//       <h4 className=''>{selectedUser.member.first_name} {selectedUser.member.last_name}</h4>
//       <p className='trk'>On Track</p>
//       </div>

//       <div className='clunm'>
// <div className='clu'>
// <p className='clund'>Project Performance</p>
// <h3 className='clun'>{selectedUser.performance}%</h3>
// </div>
// <div className='clu'>
// <p className='clund'>Project Plans</p>
// <h3 className='clun'>{selectedUser.projects_no}</h3>
// </div>
// </div>
// <div className='since'>
// <p>Member since:{(new Date(selectedUser.join_date)).toLocaleDateString('en-GB')} </p>
// <p>Last Deposit: {(new Date(selectedUser.last_deposit)).toLocaleDateString('en-GB')}</p>
// </div>

//   </div>

// )}

export default Club;
