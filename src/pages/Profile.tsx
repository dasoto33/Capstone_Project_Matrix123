import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Post } from './home/Home';
import { Post as Posty} from './home/Post'

export const Profile = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const user = auth.currentUser;

  const fetchUserPosts = async () => {
    if (user) {
      const postsRef = collection(db, 'posts');
      const userPostsQuery = query(postsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(userPostsQuery);
      const postsData = querySnapshot.docs.map((doc) => ({       
      id: doc.id,
      userId: doc.data().userId,
      title: doc.data().title,
      username: doc.data().username,
      description: doc.data().description, 
 }));
      setUserPosts(postsData);
    }
  };

  const handleDeletePost = async (postId: string) => {
    // Delete post from database
    await deleteDoc(doc(db, 'posts', postId));

    // Update the userPosts state by filtering out the deleted post
    setUserPosts((prevUserPosts) => prevUserPosts.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div className='user-profile'>
      <h2>User Profile</h2>
      <p>Welcome, {user?.displayName}!</p>
      <div className="user-posts">
        {userPosts.map((post) => (
          <div key={post.id}>
            <Posty post={post} />
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};