import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { UserInfo } from './user-info';
import { ProfileUpdate } from './profile-update';
import FavoriteMovies from './favorite-movies';
console.log(FavoriteMovies);
console.log(favoriteMovies);

// export const ProfileView = ({favoriteMovies, user, token, updatedUser, onLoggedOut}) => {
//   const ProfileDelete = () => {
//     fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${user.Username}`, 
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//     }
//     ).then((response) => {
//       console.log(response);
//       if (response.ok) {
//         console.log("Account deleted successfully!");
//         onLoggedOut();
//       } else {
//         alert("Failed to delete account");
//       }
//     })
//   }

export const ProfileView = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (!username) {
          console.error('No username found in local storage');
            return;
        }
        console.log(`Fetching data for user: ${username}`);
        const response = await fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${user.Username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Fetched user data:', data);
        setUser(data);
        setFavoriteMovies(data.FavoriteMovies || []); // Ensure the data structure matches
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log('favoriteMovies state updated:', favoriteMovies);
  }, [favoriteMovies]);

  if (!user) return <div>Loading...</div>;

  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Header>
              <FavoriteMovies 
                favoriteMovies={favoriteMovies}
              />
            </Card.Header>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <UserInfo 
                email={JSON.parse(user).Email}
                name={JSON.parse(user).Username} />
            </Card.Header>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Body>
            <ProfileUpdate
              user={user}
              token={token}
              updatedUser={updatedUser}
            />
            </Card.Body>
            <Card.Body>
              <Button
                variant="danger"
                onClick={() => {
                  ProfileDelete();
                }}>
                  Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default ProfileView;
