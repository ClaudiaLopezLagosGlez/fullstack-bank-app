import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {AuthContentContext, AuthUserContext, LoginContext} from "./Context";
import axios from "axios";

export const Login = () => {
  const [showAuthContent, setShowAuthContent] = React.useContext(AuthContentContext);
  const [authUser, setAuthUser] = React.useContext(AuthUserContext);
  const [showLogin, setShowLogin] = React.useContext(LoginContext);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [btnDisabledState, setBtnDisabledState] = useState(true);

  const authenticate = (values) => {

    //Get email and password from Form
    var loginData = {
      email: values.email,
      password: values.password
    };
    
    
    axios
      .post('/account/login', loginData, {withCredentials: true})
      .then((res) => {
        // Update Authenticated User Context value
        setAuthUser(res.data.account);
        console.log(authUser);

        // Update Authenticated Content Context value
        setShowAuthContent(true);        

        // Hide Login Menu
        setShowLogin(false);
        
        // Swith to Welcome Message Card
        setShowLoginForm(false);                         
      })
      .catch((err) => {
        console.log(err);
        alert('Incorrect credentials');
      });


  };

  const validate = (values) => {
    const errors = {};
    let disableBtnValue = false;

    // Validate Email
    if (!values.email) {
      errors.email = "Required";
      disableBtnValue = true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    
    // Validate Password
    if ((values.password.length < 8) && (values.password.length>0)) {
      errors.password = "Password must be more than 8 characters";
    } else if(!values.password) {
      disableBtnValue = true;
    }

    setBtnDisabledState(disableBtnValue);
    return errors;
  };

  return (
    <div className="CardLogin  text-secondary">
      <div className="position-absolute top-50 start-50 translate-middle text-center ">
        <React.Fragment>
          {showLoginForm ? (
            <Card bg="dark" variant="secondary" border="secondary" style={{ width: "16rem" }}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={authenticate}
                validate={validate}
              >
                <Form>
                  <h2>Login</h2>
                  <div>
                    <h6>Email:</h6>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <h6>Password:</h6>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" />
                  </div>
                  <div><br/></div>
                  <Button variant="warning" type="submit" disabled={btnDisabledState}>Submit</Button>
                </Form>
              </Formik>
            </Card>
          ) : (
            <Card  bg="dark" variant="warning" border="secondary" style={{ width: "16rem" }}>
              <h5>
                Welcome to your account! What transaction would you like to
                make?
              </h5>
              <Link to="/Deposit">
                <Button  variant="success">
                  <h6>.      Deposit    .</h6>
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
                </Button>
              </Link>
              <Link to="/Withdraw">
                <Button  variant="danger" >
                  <h6> Withdraw</h6>
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
                </Button>
              </Link>
            </Card>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

export default Login;
