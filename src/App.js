
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";

function App() {
  console.log(window.location)
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/blogAdmin/" element={<Home />} />
          <Route path="/blogAdmin/post/:title" element={<Post/>} />
          <Route path="/blogAdmin/post/new" element={<NewPost/>} />
        </Routes>
      </div>
    </>
  );
}


export default App;
