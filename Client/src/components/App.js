import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photo from "./images/photo.jpg";
import { CreateAccount } from "./CreateAccount";
import { Deposit } from "./Deposit";
import { Withdraw } from "./Withdraw";
import { AllData } from "./AllData";
import { Home } from "./Home";
import { Login } from "./Login";
import { NavigationBar } from "./NavigationBar";
import { AuthContentContext, AuthUserContext, LoginContext } from "./Context";
import { useState } from "react";
import Footer from "./Footer"

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [showAuthContent, setShowAuthContent] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <AuthUserContext.Provider value={[authUser, setAuthUser]}>
        <LoginContext.Provider value ={[showLogin, setShowLogin]}>
          <AuthContentContext.Provider value={[showAuthContent, setShowAuthContent]}>
            <BrowserRouter>
              <NavigationBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/CreateAccount" element={<CreateAccount />} />
                <Route path="/Deposit" element={<Deposit />} />
                <Route path="/Withdraw" element={<Withdraw />} />
                <Route path="/AllData" element={<AllData />} />                
              </Routes>
            </BrowserRouter>
          </AuthContentContext.Provider>
        </LoginContext.Provider>
      </AuthUserContext.Provider>

      <div className="PhotoLogo">
        <img
          src={Photo}
          className="App-logo"
          alt="logo"
          display="flex"
          flex-wrap="wrap"
          justify-content="center"
          align-items="center"
          width="100%"
          height="100%"
          margin="0"
          padding="0"
        />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
