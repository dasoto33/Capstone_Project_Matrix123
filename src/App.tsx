import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import { Home } from "./pages/Home"
import { SignIn } from "./pages/Signin"
import { Navbar } from "./components/Navbar"
import { NewPost } from './pages/posts/Post';
import { Events } from './pages/Events';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Signin" element={<SignIn />} />
          <Route path="Post" element={<NewPost />} />
          <Route path="Events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
