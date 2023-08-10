import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import "@rainbow-me/rainbowkit/styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SendIdImage from './components/SendIdimage';
import SendWAddrImage from './components/SendWAddrImage';
import LogInSignUp from "./components/Auth/LogInSignUp";
import RequireAuth from './hoc/RequireAuth.jsx';
import { AuthProvider } from "./context/AuthContext";
import SaveToDb from "./components/SaveToDb";
import RegisterDomain from "./components/EthName/RegisterDomain";
import GetDomain from "./components/EthName/GetDomain";
import VerifyUserEmail from "./components/Auth/VerifyUserEmail";
import Error404Page from "./components/UI/Error404Page";
import HomePage from "./components/UI/Homepage";
import BaseTemplate from "./components/UI/BaseTemplate";
import { EthNameProvider } from "./context/EthNameContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EthNameProvider>
        <Routes>
          <Route path="/" element={<BaseTemplate/>} errorElement={<Error404Page/>}>
            <Route path="" element={<RequireAuth authLink={"/auth"}><HomePage /></RequireAuth>} />
            <Route path="verify/">
              <Route path="register/" element={<RequireAuth authLink={"/auth"}><RegisterDomain /></RequireAuth>} />
              <Route path="get/" element={<RequireAuth authLink={"/auth"}><GetDomain/></RequireAuth>}/>
              <Route path="id/" element={<RequireAuth authLink={"/auth"}><SendIdImage /></RequireAuth>} />
              <Route path="wallet/" element={<RequireAuth authLink={"/auth"}><SendWAddrImage /></RequireAuth>} />
            </Route>
            <Route path="save/id/" element={<RequireAuth authLink={'/auth'}><SaveToDb /></RequireAuth>}/>
            <Route path='auth/' element={<LogInSignUp />}/>
            <Route path='activate/email/:verifyKey' element={<VerifyUserEmail />}/>
          </Route>
          </Routes>
          </EthNameProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;