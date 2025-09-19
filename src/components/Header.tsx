import { Link } from "react-router-dom";
import { BlueskyIcon } from "react-share";

export default function Header() {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-8">
      <div className="flex flex-col items-center text-center">
        <img
          src="/pfp.png"
          alt="Profile picture"
          className="size-40 rounded-full object-cover shadow-sm"
        />
        <div className="flex flex-row gap-4 items-center justify-center">
          <h1>daywalkr.dev</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/archive">Archive</Link>
        </nav>
        <div className="mt-4">
          <a
            href="https://bsky.app/profile/daywalkr.bsky.social"
            className="hover:opacity-70 transition-opacity duration-200"
            target="_blank"
            rel="noopener"
          >
            <BlueskyIcon size={32} round />
          </a>
        </div>
      </div>
    </div>
  );
}
