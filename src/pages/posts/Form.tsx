import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import {addDoc, collection } from "firebase/firestore"
import { db, auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

interface NewFormData {
    description : string
  }


export const NewForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        description: yup.string().required("Add description"),
    })

    const { register, handleSubmit, formState:{ errors }, } = useForm<NewFormData>({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db, "post")

    const onNewPost = async (data: NewFormData) => {
        await addDoc(postRef, {
            description : data.description,
            username : user?.displayName,
            userId : user?.uid,
        })

        navigate("/")

 
    }

    return (
        <form onSubmit={handleSubmit(onNewPost)} >
            <input placeholder="New Post" {...register("description")}/>
            <p style={{ color: "red" }}> {errors.description?.message} </p>
            <input type="submit" className="form-submit"/>
        </form>
    )
}