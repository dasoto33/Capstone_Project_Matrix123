import { auth, provider } from "../config/firebase"
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result);
        navigate("/")
    }

    const emailSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="signin">
            <h2>Sign In</h2>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={emailSignIn} className="email-signin">Sign In</button>
            <button onClick={googleSignIn} className="google-signin">Sign In With Google</button>
            <p>Don't have an account? <NavLink to="/Register">Sign Up</NavLink></p>
        </div>
    )
}