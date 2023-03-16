import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Bookmarks from "./pages/Bookmarks";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MyPosts from "./pages/MyPosts";
import Profile from "./pages/Profile";
import Read from "./pages/Read";
import NavigationBars from "./components/navigation/NavigationBars";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import MyProfile from "./pages/MyProfile";
import SearchResults from "./pages/SearchResults";


function App() {

  const email = useSelector((state) => state.auth.email);


  return (
    <>
      <Routes>
        <Route path={email ? "/640fc3f0a9ba8474bd6" : "/"} element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route element={<NavigationBars />}>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
          <Route path="/read/:id" element={<Read />} />
          {/* <Route path="/read/:id" element={<ProtectedRoute><Read /></ProtectedRoute>} /> */}
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/myprofile/:uid" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path="/myposts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
          <Route path="/createpost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/results/:query" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
