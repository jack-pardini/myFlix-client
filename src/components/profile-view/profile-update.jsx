import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

export const ProfileUpdate = ({ user, updatedUser }) => {
  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // Initialize state with the current user's data
  const [username, setUsername] = useState(user.Username || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email || '');
  // Format the birthday date properly
  const formattedBirthday = user.Birthday ? user.Birthday.split('T')[0] : ''; // Use only the date part
  const [birthday, setBirthday] = useState(formattedBirthday);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    // Only include the password in the payload if it has been changed
    if (password) {
      data.Password = password;
    }

    fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error('Error: ', text);
            throw new Error(text);
          });
        }
        return response.json(); // Return user data from the response
      })
      .then((data) => {
        if (data && data.Username) {
          updatedUser(data);
          //Update localStorage with the new user data
          localStorage.setItem('user', JSON.stringify(data));

          // Optionally log the user out and force a login with the new credentials:
          // localStorage.removeItem('token');
          // window.location.href = '/login';

          // Update the form with the new data
          setUsername(data.Username);
          setEmail(data.Email);
          setBirthday(data.Birthday.split('T')[0]);
          // Remove reload to update the state immediately
          window.location.reload();
        } else {
          console.error('User data is null or malformed');
        }
      })
      .catch((e) => {
        console.log('Error: ', e);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Update Info</h2>
      <Form.Group controlId='formUsername' className='mb-4'>
        <Form.Control
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='5'
        />
      </Form.Group>

      <Form.Group controlId='formPassword' className='mb-4'>
        <Form.Control type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formEmail' className='mb-4'>
        <Form.Control type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId='formBirthday' className='mb-4'>
        <Form.Control type='date' placeholder='Birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </Form.Group>
      <br />
      <div className='d-grid gap-2'>
        <Button variant='secondary' type='submit' style={{width: '25%', padding: '10px 0'}}>
          Edit Profile
        </Button>
      </div>
    </Form>
  );
};

ProfileUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  updatedUser: PropTypes.func.isRequired,
};