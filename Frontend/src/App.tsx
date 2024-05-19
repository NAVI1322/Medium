import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/elements/mode_toggle"
import BlogCard from "./components/Blog_ui/blog_card"
import NavBar from "./components/NavBar/Nav"
import CreateBlog from "./components/page/Create_Blog"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <NavBar />
       <CreateBlog />
     
    </ThemeProvider>
  )
}

export default App