import { NavLink } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"

export const Navbar = () => {
   const [user] = useAuthState(auth)

   const logout = async () => {
      await signOut(auth)
   }
    return (
      <div className="navbar">
         <div className="links">
            <NavLink to="/"> Wonky </NavLink>
            <NavLink to="Events"> Events </NavLink>
            {!user ? (
               <NavLink to="Signin"> Sign In </NavLink>
            ) : (
               <NavLink to="Post"> New Post </NavLink>
            )}
         </div>
        <div className="user">
         {user && (
            <>
            <p> {user?.displayName} </p>
            <img src={user?.photoURL || ""} width="45" height="45" />
            <button onClick={logout} className="logout-button"> Log Out </button>
            </>
         )}
        </div>
      </div>

    )
}