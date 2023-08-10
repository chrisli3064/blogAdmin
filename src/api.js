import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, query, orderByChild, equalTo,push,set,update,child, key } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDfuyJ3RjzOsuvGUWqnWoDtUg6k4-TAKc",
    authDomain: "blog-f8321.firebaseapp.com",
    databaseURL: "https://blog-f8321-default-rtdb.firebaseio.com",
    projectId: "blog-f8321",
    storageBucket: "blog-f8321.appspot.com",
    messagingSenderId: "800131778252",
    appId: "1:800131778252:web:75a50ec398b7d12c492469"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export const getPosts = async () => {
    try {
        const snapshot = await get(ref(database, 'blog'));
        if (snapshot.exists()) {
            // Convert the data to an array of posts
            const data = snapshot.val();
            const posts = Object.values(data);
            return posts;
        } else {
            // Handle the case when no posts are found
            return [];
        }
    } catch (error) {
        // Handle errors if any occur during the data fetching process
        console.error('Error fetching posts:', error);
        return [];
    }
};

export const getPost = async (field, value) => {
    try {
      // Create a query to search for the post based on the specified field and value
      const postsRef = ref(database, 'blog');
      const queryRef = query(postsRef, orderByChild(field), equalTo(value));
      
      const snapshot = await get(queryRef);
      if (snapshot.exists()) {
        // Return the post data
        return snapshot.val();
      } else {
        // Handle the case when post with the given field and value is not found
        return null;
      }
    } catch (error) {
      // Handle errors if any occur during the data fetching process
      console.error(`Error fetching post with ${field}=${value}:`, error);
      return null;
    }
  };

  

  export const createPost = async (newPostData,postId) => {
    try {
      const postsRef = ref(database, 'blog');

      // Get the post reference by its ID
      const postRef = child(postsRef, postId);
      const snapshot = await get(postRef);
      console.log(postId)
      if (snapshot.exists()) {
        // If a post with the same title exists, update its content
        await update(postsRef, {
          [`${postId}/content`]: newPostData.content,
        });
        await update(postsRef, {
          [`${postId}/title`]: newPostData.title,
        });
        return postId; // Return the existing post's key
      } else {
        // If no post with the same title exists, create a new post
        const newPostRef = push(postsRef);
        await set(newPostRef, {
          title: newPostData.title,
          content: newPostData.content,
        });
        return newPostRef.key; // Return the newly created post's key
      }
    } catch (error) {
      // Handle errors if any occur during the data creation process
      console.error('Error creating/updating post:', error);
      return null;
    }
  };