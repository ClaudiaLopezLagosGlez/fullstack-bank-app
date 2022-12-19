import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { AuthContentContext, AuthUserContext, LoginContext } from "./Context";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export const NavigationBar = () => {
  const [authUser, ] = React.useContext(AuthUserContext);
  const [showAuthContent, setShowAuthContent] = React.useContext(AuthContentContext);
  const [showLogin, setShowLogin] = React.useContext(LoginContext);
  const [diagShow, setDiagShow] = React.useState(false);
  //let userID = users.findIndex(record => record.signedIn === true);

  const logoutHandler = (selectedItem) => {
    if(selectedItem === 'LogoutKey') {

      // Send GET request
      axios
        .get('/account/logout')
        .then((res) => {
          setDiagShow(true);
          setShowAuthContent(false);
          setShowLogin(true);        
        })
        .catch((err) => {
          console.log(err);
        });      
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#BankApp">Bank App</Navbar.Brand>

          <Nav className="position-absolute top-50 start-50 translate-middle" onSelect={logoutHandler}>

            <Nav.Link as={Link} to="/" data-tip data-for="HomeTip">
              <div className="IconHome">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-bank"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z" />
                </svg>
              </div>
            </Nav.Link>

            {showLogin && (
              <Nav.Link
                as={Link}
                to="/CreateAccount"
                data-tip
                data-for="CreateAccountTip"
              >
                <div className="IconCreateAccount">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-person-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{" "}
                    <path
                      fill-rule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </div>
              </Nav.Link>
            )}

            {showLogin && (
              <Nav.Link as={Link} to="/Login" data-tip data-for="LoginTip">
                <div className="IconLogin">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-person-check-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path
                      fill-rule="evenodd"
                      d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />{" "}
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
              </Nav.Link>
            )}

            {showAuthContent && (
              <Nav.Link as={Link} to="/Deposit" data-tip data-for="DepositTip">
                <div className="IconDeposit">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-piggy-bank-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595Zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199Zm-8.999-.65a.5.5 0 1 1-.276-.96A7.613 7.613 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.602 6.602 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </div>
              </Nav.Link>
            )}

            {showAuthContent && (
              <Nav.Link
                as={Link}
                to="/Withdraw"
                data-tip
                data-for="WithdrawTip"
              >
                <div className="IconWithdraw">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-cash-coin"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path
                      fill-rule="evenodd"
                      d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                    />
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />{" "}
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                  </svg>
                </div>
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/AllData" data-tip data-for="AllDataTip">
              <div className="IconAllData">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-list-stars"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
                  />
                  <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z" />
                </svg>
              </div>
            </Nav.Link>

            {showAuthContent && (
              <Nav.Link as={Link} to="/" data-tip data-for="LogoutTip" eventKey="LogoutKey">
                <div className="Logout">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-up-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                    />
                  </svg>
                </div>
              </Nav.Link>
            )}
          </Nav>

          <Nav className="justify-content-end">
            {showAuthContent && (
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>Welcome {authUser.name}!!</Navbar.Text>
              </Navbar.Collapse>
            )}
          </Nav>
        </Container>
      </Navbar>

      <ReactTooltip id="HomeTip" place="top" effect="solid">
        Home
      </ReactTooltip>

      {showLogin && (
        <ReactTooltip id="CreateAccountTip" place="top" effect="solid">
          Create Account
        </ReactTooltip>
      )}

      {showLogin && (
        <ReactTooltip id="LoginTip" place="top" effect="solid">
          Login
        </ReactTooltip>
      )}

      {showAuthContent && (
        <ReactTooltip id="DepositTip" place="top" effect="solid">
          Deposit
        </ReactTooltip>
      )}

      {showAuthContent && (
        <ReactTooltip id="WithdrawTip" place="top" effect="solid">
          Withdraw
        </ReactTooltip>
      )}

      <ReactTooltip id="AllDataTip" place="top" effect="solid">
        All Data
      </ReactTooltip>

      {authUser && (
        <ReactTooltip id="LogoutTip" place="top" effect="solid">
          Logout
        </ReactTooltip>
      )}

      <Modal show={diagShow} onHide={() => setDiagShow(false)}>
        <Modal.Header>
          <Modal.Title> Bank App </Modal.Title>
        </Modal.Header>
        <Modal.Body>The session has been closed!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setDiagShow(false)}> Accept </Button>
        </Modal.Footer>
      </Modal>      
    </>
  );
};
export default NavigationBar;
