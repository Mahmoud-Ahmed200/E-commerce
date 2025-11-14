import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Account.css';

axios.defaults.withCredentials = true;

const defaultAvatar = "https://i.imgur.com/6VBx3io.png";

const Account = ({ user: userProp, setUser: setUserProp }) => {
  const [user, setUser] = useState(userProp);
  const [fullName, setFullName] = useState('');
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  const [infoNotify, setInfoNotify] = useState({ message: '', type: '' });
  const [passNotify, setPassNotify] = useState({ message: '', type: '' });
  const [photoNotify, setPhotoNotify] = useState({ message: '', type: '' });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/user/profile');
        console.log('Profile data:', res.data);
        setUser(res.data.user);
        setFullName(res.data.user.fullName);
        if (setUserProp) {
          setUserProp(res.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error.response?.data?.message || error.message);
      }
    };

    if (userProp) {
      setUser(userProp);
      setFullName(userProp.fullName);
    } 
    else {
      fetchProfile();
    }
  }, [userProp, setUserProp]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setInfoNotify({ message: 'Updating...', type: 'loading' });

    try {
      const res = await axios.patch('http://localhost:3000/api/v1/user/editProfile', { fullName });
      setUser(res.data.user);
      if (setUserProp) {
        setUserProp(res.data.user);
      }
      setInfoNotify({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred.';
      setInfoNotify({ message: message, type: 'error' });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassNotify({ message: 'Updating...', type: 'loading' });

    try {
      const res = await axios.patch('http://localhost:3000/api/v1/user/changePassword', passwords);
      setPassNotify({ message: res.data.message, type: 'success' });
      setPasswords({ oldPassword: '', newPassword: '', newPasswordConfirmation: '' });
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred.';
      setPassNotify({ message: message, type: 'error' });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoNotify({ message: 'Uploading...', type: 'loading' });
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/profile-photo', formData);
      console.log('Photo upload response:', res.data);
      
      const updatedUser = { ...user, profilePhoto: res.data.profilePhoto };
      setUser(updatedUser);
      if (setUserProp) {
        setUserProp(updatedUser);
      }
      setPhotoNotify({ message: 'Photo updated!', type: 'success' });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred.';
      setPhotoNotify({ message: message, type: 'error' });
    }
  };

  const handleDeletePhoto = async () => {
    if (!user.profilePhoto) return;
    setPhotoNotify({ message: 'Deleting...', type: 'loading' });

    try {
      const res = await axios.delete('http://localhost:3000/api/v1/user/profile-photo');
      const updatedUser = { ...user, profilePhoto: null };
      setUser(updatedUser);
      if (setUserProp) {
        setUserProp(updatedUser);
      }
      setPhotoNotify({ message: res.data.message, type: 'success' });
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred.';
      setPhotoNotify({ message: message, type: 'error' });
    }
  };

  const Notification = ({ notify }) => {
    if (!notify.message) return null;
    return <div className={`notification ${notify.type}`}>{notify.message}</div>;
  };

  const getProfilePhotoUrl = () => {
    if (!user.profilePhoto) return defaultAvatar;
    
    if (typeof user.profilePhoto === 'object' && user.profilePhoto.url) {
      return user.profilePhoto.url;
    }
    
    if (typeof user.profilePhoto === 'string') {
      return user.profilePhoto;
    }
    
    return defaultAvatar;
  };

  if (!user) {
    return (
      <div className="account-container">
        <p style={{ textAlign: 'center' }}>Please Login</p>
      </div>
    );
  }

  return (
    <div className="account-container">
      <section className="account-section">
        <h2>Account</h2>
        <p>View and edit your personal info below.</p>
      </section>

      <hr className="section-divider" />

      <section className="profile-section">
        <h3>Profile photo</h3>
        <div className="profile-photo-area">
          <img
            src={getProfilePhotoUrl()}
            alt="Profile"
            className="profile-avatar"
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.src = defaultAvatar;
            }}
          />
          <div className="profile-photo-actions">
            <p>A high-quality, square photo is recommended.</p>
            <div className="profile-photo-buttons">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="btn-change"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleDeletePhoto}
                disabled={!user.profilePhoto}
                className="btn-danger"
              >
                Remove
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <Notification notify={photoNotify} />
      </section>

      <section className="personal-info-section">
        <h3>Personal info</h3>
        <p>Update your personal information.</p>

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="full-name">Full name</label>
            <input
              type="text"
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <Notification notify={infoNotify} />
          <button type="submit" className="btn btn-primary">
            Update Info
          </button>
        </form>
      </section>

      <section className="login-info-section">
        <h3>Login info</h3>
        <p>View and update your login email and password.</p>
        <div className="login-details">
          <p className="login-email">Login email:</p>
          <p>{user.email}</p>
        </div>

        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label htmlFor="old-password">Old password</label>
            <input
              type="password"
              id="old-password"
              value={passwords.oldPassword}
              onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
            />
          </div>
          <div className="password-grid">
            <div className="form-group">
              <label htmlFor="new-password">New password</label>
              <input
                type="password"
                id="new-password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm new password</label>
              <input
                type="password"
                id="confirm-password"
                value={passwords.newPasswordConfirmation}
                onChange={(e) => setPasswords({ ...passwords, newPasswordConfirmation: e.target.value })}
              />
            </div>
          </div>
          <Notification notify={passNotify} />
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </section>
    </div>
  );
};

export default Account;