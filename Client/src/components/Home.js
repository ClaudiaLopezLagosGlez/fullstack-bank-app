import React from "react";
import Card from "react-bootstrap/Card";
import logo from "./images/BankLogo.png";

export function Home() {

  return (
    <>
      <div className="CardHome text-secondary text-primary">
        <div className="position-absolute top-50 start-50 translate-middle">
          <Card bg="dark" variant="secondary" border="secondary" style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title>
                <h2>Welcome to the Bank App!</h2>
              </Card.Title>

              <Card.Text>
                <p></p>
                <p>For all your banking needs</p>
                <p></p>
              </Card.Text>
              <div className="ImageLogo">
                <img
                  src={logo}
                  className="App-logo"
                  alt="logo"
                  width="450"
                  height="250"
                />
              </div>
            </Card.Body>
          </Card>
          <br />
        </div>
      </div>
    </>
  );
}

export default Home;
