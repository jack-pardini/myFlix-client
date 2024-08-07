import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { UserInfo } from './user-info';
import { ProfileUpdate } from './profile-update';
import { FavoriteMovies } from './favorite-movies';

export const ProfileView = ({user, token, updatedUser, onLoggedOut}) => {
  const ProfileDelete = () => {
    fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${user.Username}`, 
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }
    ).then((response) => {
      console.log(response);
      if (response.ok) {
        console.log("Account deleted successfully!");
        onLoggedOut();
      } else {
        alert("Failed to delete account");
      }
    })
  }

  return (
    <Container>
      <Row className="justify-content-center">
        {/* <Col>
          <Card>
            <Card.Header>
              <FavoriteMovies 
                // favoriteMovies={}
              />
            </Card.Header>
          </Card>
        </Col> */}
        <Col>
          <Card>
            <Card.Header>
              <UserInfo 
                email={user.Email}
                name={user.Username} />
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