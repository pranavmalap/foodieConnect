import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { CreateRecipe } from "./pages/CreateRecipe";
import { Aboutus } from "./pages/Aboutus";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Trending } from "./pages/Trending";
import { SavedRecipes } from "./pages/SavedRecipes";
import { Navbar } from "./components/Navbar";
import Upload from "./pages/Upload";
import MyVideos from "./pages/MyVideos";
import UpdateProfile from "./pages/UpdateProfile";
import { UpdateRec } from "./pages/UpdateRec";
import UserVid from "./pages/UserVid";
import { Dashboard } from "./pages/Dashboard";
import Recipereport from "./pages/Recipereport";
import Userreport from "./pages/Userreport";

function App() {
  const loogenIn = window.localStorage.getItem("userID");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            !loogenIn ? (
              <Dashboard />
            ) : loogenIn === "661284bfea94223ebcf41c17" ? (
              <Dashboard />
            ) : (
              <Home />
            )
          }
        ></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/reports/recipereport" element={<Recipereport />}></Route>
        <Route path="/reports/userreport" element={<Userreport />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/myvid" element={<MyVideos />}></Route>
        <Route path="/userprofile/:id" element={<UserVid />}></Route>
        <Route path="/createRecipe" element={<CreateRecipe />}></Route>
        <Route path="/updateProfile/:id" element={<UpdateProfile />}></Route>
        <Route path="/updateRecipe/:id" element={<UpdateRec />}></Route>
        <Route path="/saved-recipes" element={<SavedRecipes />}></Route>
        <Route path="/aboutus" element={<Aboutus />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/trending" element={<Trending />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
