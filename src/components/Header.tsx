import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-8">
      <div className="flex flex-col items-center text-center">
        <img
          src="/pfp.png"
          alt="Profile picture"
          className="size-40 rounded-full object-cover shadow-sm"
        />
        <h1>daywalkr.dev</h1>
        <nav className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/archive">Archive</Link>
        </nav>
      </div>
    </div>
  );
}
