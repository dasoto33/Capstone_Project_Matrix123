import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, {
        email: userCredential.user.email,
      })
      console.log('User registered:', userCredential.user)
      navigate('/')
    } catch (error) {
      console.error('Error registering:', error)
    }
  };

  return (
    <div className="register-container">
     <h2>Register</h2>
     <form onSubmit={handleSubmit}>
         <label>
            Email:
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label>
            Password:
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <button type="submit">Register</button>
        </form>
    </div>
  );
};