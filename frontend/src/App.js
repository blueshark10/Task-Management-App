import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles.css';
import { Header } from './components/Header';
import TasksList from './pages/TasksList';
import SignIn from './pages/SignIn';
import Admin from './pages/admin';

function App() {
  let token = localStorage.getItem("token");
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<TasksList />} />
        <Route exact path="/signIn" element={<SignIn />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
