import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/elements/mode_toggle"
import BlogCard from "./components/Blog_ui/blog_card"
import NavBar from "./components/NavBar/Nav"
import CreateBlog from "./components/page/Create_Blog"
import Post_Page from "./components/page/Post_page"
import { useEffect, useState } from "react"
import axios from "axios"
import {Route,Routes,BrowserRouter}  from "react-router-dom"
import { DashBoard } from "./components/page/Dashbord"


function App() {

  

  

  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Routes>
      <Route element={<CreateBlog />} path={"/CreateBlog"}></Route>
      <Route element={<DashBoard/>} path={"/Dashboard"}></Route>
      <Route element={<Post_Page />} path={"/Post/:id"}></Route>
       
    </Routes>
</ThemeProvider>
    </BrowserRouter>
  )
}
export default App
