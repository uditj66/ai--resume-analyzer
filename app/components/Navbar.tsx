import React from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();
  const handleSignOut = () => {
    if (auth.isAuthenticated) {
      auth.signOut();
    }
  };
  return (
    <nav className="navbar">
      <div className="flex items-center">
        <Link to="/">
          <p className="text-2xl font-bold text-gradient">RESUMIND</p>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
        <button onClick={handleSignOut} className="primary-button w-fit">
          LogOut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
