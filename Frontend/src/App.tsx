import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "./components/NavBar/Nav";
import CreateBlog from "./components/page/Create_Blog";
import Post_Page from "./components/page/Post_page";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { DashBoard } from "./components/page/Dashbord";
import ProfilePage from "./components/page/Profile";
import AboutProfile from "./components/page/Profile_about";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <NavBar />
        <div className="p-4">
          <Routes>
            <Route path="/CreateBlog" element={<CreateBlog />} />
            <Route path="/Dashboard" element={<DashBoard />} />
            <Route path="/Post/:id" element={<Post_Page />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutProfile />} />
            <Route path="/" element={<DashBoard />} /> {/* Assuming DashBoard is the default page */}
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;