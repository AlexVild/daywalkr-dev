import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArchivePage from "./pages/ArchivePage";
import PostView from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/:postId" element={<PostView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
