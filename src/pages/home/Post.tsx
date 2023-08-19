import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { Post as Postable } from "./Home"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"

interface Props {
    post : Postable
}

interface Like {
   likeId: string
   userId : string
}


export const Post = (props : Props) => {
   const { post } = props
   const [user] = useAuthState(auth)

   const [likes, setLikes] = useState<Like[] | null>(null)

   const likeRef = collection(db, "likes")

   const likeDoc = query(likeRef, where("postId", "==", post.id)) // where function takes in field, operation, and data being passed

   const getLikes = async () => {
      const data = await getDocs(likeDoc)
      setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
   }

   const newLike = async (): Promise<void> => {
      try { // use try catch to avoid failure 
         const newDoc = await addDoc(likeRef, { userId : user?.uid, postId : post.id}) 
         if (user) {
            setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] 
            : [{ userId: user.uid, likeId: newDoc.id }]
            )
         }
      } catch (error) {
         console.log(error);
      }
   }

   const unLike = async (): Promise<void> => {
      try {
         const likeQueryRemoval = query(
            likeRef, 
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
         )

         const likeDataRemoval = await getDocs(likeQueryRemoval)

         const likeId = likeDataRemoval.docs[0].id

         const likeRemoval = doc(db, "likes", likeId)

         await deleteDoc(likeRemoval) 
         if (user) {
            setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
         }
      } catch (error) {
         console.log(error);
      }
   }

   const likeStatus = likes?.find((like) => like.userId === user?.uid) // find loops through array

   useEffect( () => {
      getLikes()
   }, [])
   
   return (
      <div className="post-container"> 
         <div className="title">
            <h1> {post.title} </h1>
         </div> 
         <div>
            <p> {post.description} </p>
         </div>

         <div className="footer">
            <p> {post.username} </p> 
            <button onClick={likeStatus ? unLike : newLike}> {likeStatus ? <>&#10006;</> : <>&#10004;</>}{" "}</button>
            {likes && <p> Likes: { likes?.length } </p>}
         </div>
      </div>
   )
}