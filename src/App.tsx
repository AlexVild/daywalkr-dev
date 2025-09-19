import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArchivePage from "./pages/ArchivePage";
import PostView from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
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
