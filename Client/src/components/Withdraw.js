import React, { useState } from "react";
import { AuthUserContext } from "./Context";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import { Formik, ErrorMessage, Field, Form } from "formik";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

export const Withdraw = () => {
  const [authUser, setAuthUser] = React.useContext(AuthUserContext);
  const [withdrawBtnState, setWithdrawtBtnState] = useState(true);
  const [diagShow, setDiagShow] = useState(false);
  const [errShow, setErrShow] = useState(false);
  let withdrawHeading = document.getElementById("WithdrawHeading");


  const handleInput = (values) => {

    let currentBalance = authUser.balance;
    let withdrawAmount = (+values.withdraw);

    console.log(currentBalance, withdrawAmount);

    if (currentBalance < withdrawAmount) {
      setErrShow(true);
    } else {

      const newData = {
        currentBalance: currentBalance,
        withdrawAmount: withdrawAmount
      };

      // Send PUT request
      axios
        .put('/account/withdraw', newData)
        .then((res) => {
          // Update Authenticated User Context value
          setAuthUser(res.data.account);
        })
        .catch((err) => {
          console.log(err);
        });

      //Update Balance Heading value
      setDiagShow(true);
      withdrawHeading.useState.textContent = authUser.balance;
    }

  };

  const validateInput = (values) => {
    const errors = {};
    let disableBtnWithdrawValue = false;

    if (!/^[-]?[1-9]?[0-9]*\.?[0-9]+$/.test(values.withdraw)) {
      errors.wihdraw = "Invalid characters";
    } else if (values.withdraw <= 0) {
      errors.withdraw = "Positive values only";
      disableBtnWithdrawValue = true;
    } else if (!values.withdraw) {
      disableBtnWithdrawValue = true;
    }

    setWithdrawtBtnState(disableBtnWithdrawValue);
    return errors;
  };

  return (
    <div className="WithdrawClass  text-secondary">
      <div className="position-absolute top-50 start-50 translate-middle text-center ">
        <React.Fragment>
          <Card bg="dark" variant="secondary" border="secondary" style={{ width: "16rem" }}>
            <Formik
              initialValues={{ withdraw: "" }}
              onSubmit={handleInput}
              validate={validateInput}
            >
              <Form>
                <div>
                  <h2>Withdraw</h2>
                  <h6>Amount:</h6>
                  <Field name="withdraw" type="text" placeholder="0.0" />
                  <ErrorMessage name="withdraw" />
                </div>
                <div><br /></div>
                <Button variant="danger" type="submit" disabled={withdrawBtnState}>
                  <h6>Submit</h6>
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
              </Form>
            </Formik>
            <Card.Body>
              <Card.Header> <h2>Balance</h2> </Card.Header>
              <Card.Text>
                {/* <h4 id="WithdrawHeading"> $ {users[userID].balance} </h4> */}
                <h4 id='WithdrawHeading'> $ {authUser.balance} </h4>
              </Card.Text>
            </Card.Body>
          </Card>
        </React.Fragment>
      </div>
      <Modal show={diagShow} onHide={() => setDiagShow(false)}>
        <Modal.Header>
          <Modal.Title> Withdraw Operation </Modal.Title>
        </Modal.Header>
        <Modal.Body>Transaction completed sucessfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setDiagShow(false)}> Accept </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={errShow} onHide={() => setErrShow(false)}>
        <Modal.Header>
          <Modal.Title> Insuficient funds </Modal.Title>
        </Modal.Header>
        <Modal.Body>Cancelled Operation.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setErrShow(false)}> Accept </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Withdraw;

