import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Get your resume analyzed by AI" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-cover bg-[url('/images/bg-main.svg')] min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Application and Resume Ratings </h1>
          <h2>Review Your Submissions and Ai powered Feedback</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
