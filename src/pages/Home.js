import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts();
      setData(posts);
    };

    fetchData();
  }, []);
  return (
    <div>
      {data ? (
        <ul>
          {Object.values(data).map((item) => (
            <li key={item.title}>
              <Link to={`/blogAdmin/post/${item.title}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
      <Link to="/blog/post/new">
        <button>New Post</button>
      </Link>
    </div>
  );
}

export default Home;
