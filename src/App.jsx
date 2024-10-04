import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav";
import Search from "./component/Search";
import { SearchProvider } from "./context/SearchContext";
import About from "./component/About";
import Contact from "./component/Contact";
import { DarkModeProvider } from "./context/dorkModeContext";

export default function App() {
  return (
    <>
      <DarkModeProvider>
        <SearchProvider>
          <Search />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />

          </Routes>
        </SearchProvider>
      </DarkModeProvider>
    </>
  )
}