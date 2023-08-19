import { getDocs, collection, doc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Post } from "./Post"


export interface Post {
  id : string
  userId : string
  title : string
  username : string
  description : string
}

export const Home = () => {
  const [postList, setPostList] = useState<Post[] | null>(null)
  const postRef = collection(db, "post")

  const getPosts = async () => {
    const data = await getDocs(postRef)
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  }

  useEffect( () => {
    getPosts()

  }, [])


  return (
    <div>
      {postList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}