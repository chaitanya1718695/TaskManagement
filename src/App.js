// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from "./Components/Create";
import Update from "./Components/Update";
import Setting from "./Components/Setting";
import Employework from "./Components/Employework";
import View from "./Components/View";
import Contact from "./Components/Contact";
import Admin from "./Components/Admin";
import AssignedTasks from "./Components/AssignedTasks";
import Deals from "./Components/Deals";
import Cotation from "./Components/Cotation";
import Sales from "./Components/Sales";
import Proposal from "./Components/Proposal";


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
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/employework" element={<Employework />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/assigned-tasks/:userId" element={<AssignedTasks />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/cotation" element={<Cotation />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/proposal" element={<Proposal />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
