import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {AuthContentContext} from "./Context";
import { useEffect } from "react";
import axios from 'axios';

export const AllData = () => {
  
  const [accounts, setAccounts] = React.useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async() => {
    const res = await axios.get('/account/all');
    console.log(res);
    setAccounts(res.data.accounts);
  };

  return (
    <div className="CardDeposit  text-warning">
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <div className="IconPadlockDeposit">
          <Card bg="secondary" variant="warning" border="warning" style={{ width: "50rem" }}>
            <Table  variant="dark" border="warning" striped="columns">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((record, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{record.name}</td>
                    <td>{record.email}</td>
                    <td>{record.password}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};
