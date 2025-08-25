import React, { useEffect, useState } from "react";
import { usePuterStore } from "../lib/puter";
import { useLocation, useNavigate } from "react-router";
export const meta = () => {
  return [
    { title: "Resumind | Auth" },
    {
      name: "description",
      content: "Log-In to your Account",
    },
  ];
};
const auth = () => {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const next = location.search.split("next=")[1];
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);
  return (
    <main className="bg-cover bg-[url('/images/bg-main.svg')] min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 rounded-2xl p-10 bg-white">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Login To Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in ...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Logout</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Login</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
