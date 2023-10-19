import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../product/added-components/NavBar';

function Profile() {
  const [userData, setUserData] = useState({});
  const [newData, setNewData] = useState({
    username: '',
    email: ''
  });

  const [newPassword, setNewPassword] = useState("");
  const [editPass, setEditPass] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/userinfo/', { headers })
      .then((response) => {
        setUserData(response.data);
        setNewData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    axios.put('http://localhost:8000/api/userinfo/update/', newData, { headers })
      .then((response) => {
        axios.get('http://localhost:8000/api/userinfo/', { headers })
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  const passwordForm = () => {
    setEditPass(!editPass);
  };

  const handlePassword = () => {
    axios.put('http://localhost:8000/api/userinfo/update/', { password: newPassword }, { headers })
      .then((response) => {
        console.log('the password updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
    setEditPass(false);
    setNewPassword("");
  };
  
  return (<>
    <NavBar/>
    <div className="container mb-5">
      <div className="row justify-content-center mt-4">
        <div className="col-4">
          <img src="/icon.png" alt={userData.username} className="img-fluid rounded-circle float-end" 
          style={{ width: '110px', height: '110px' }}/>
        </div>
        <div className="col-4">
          <h3 className="mt-4 mb-0">{userData.username}</h3>
          <p className="my-0">{userData.email}</p>
        </div>
      </div>
        <div className="border rounded-3 w-50 mx-auto mt-4">
          <h3 className="mx-3 my-2">profile</h3>
          <hr className='my-0' />
          <form className="mx-3 my-2">
            <div className="mb-3 w-100">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" name="username" 
              value={newData.username} onChange={handleChange} />
            </div>
            <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" 
              value={newData.email} onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Save Changes</button>
          </form>

          {/* change password : ******************************************************************************************************/}
          <div className='mx-3 my-2 mb-3'>
            <p className='my-1'><a className='' onClick={passwordForm} style={{cursor:"pointer"}}>
              Do you want to change your password?</a></p>
            {editPass && (
              <form className='container border rounded-3 p-2 mt-2'>
                <div className="mb-2 w-100">
                  <input type="password" className="form-control p-1 px-2" placeholder="New password" name="newPassword" 
                  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                </div>
                <button type='button' className='btn btn-primary px-2 py-0 fs-6 rounded-5' onClick={handlePassword}>Save</button>
              </form>
            )}
          </div>
        </div>
    </div>
  </>);
}

export default Profile;
