// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from "./Components/Create";
import Update from "./Components/Update";
import Setting from "./Components/Setting";
import View from "./Components/View";
import Contact from "./Components/Contact";
import Admin from "./Components/Admin";
import AssignedTasks from  "./Components/AssignedTasks";
import Deals from "./Components/Deals";
import Cotation from "./Components/Cotation";
import Sales from "./Components/Sales";
import Proposal from "./Components/Proposal";
import EmpData from "./Components/EmpData";
import EmployeeLogin from "./Login/EmployeeLogin";
import Task from "./Login/Task";
import Home from "./Components/Home";
import OcrComponent from "./Components/OcrComponent";



const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '20px', marginLeft: '50px' }}>
        {children}
      </main>
    </div>
  );
};

function App() {
  const [employee, setEmployee] = useState(false);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {employee ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/employeelogin" element={<EmployeeLogin />} />
              <Route path="/task" element={<Task />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Admin />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Update />} />
              <Route path="/view/:id" element={<View />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/assigned-tasks/:userId" element={<AssignedTasks />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/cotation" element={<Cotation />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/proposal" element={<Proposal />} />
              <Route path="/empdata" element={<EmpData />} />
              <Route path="/ocrcomponent" element={<OcrComponent />} />
              
            </>
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
