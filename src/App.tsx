import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import { Home } from "./pages/home/Home"
import { SignIn } from "./pages/Signin"
import { Navbar } from "./components/Navbar"
import { NewPost } from './pages/posts/MakePost';
import { Events } from './pages/Events';
import { Profile } from "./pages/Profile"
import { Register } from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Post" element={<NewPost />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
