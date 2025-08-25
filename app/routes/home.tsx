import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Get your resume analyzed by AI" },
  ];
}

export default function Home() {
  const { auth, fs, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLodingResumes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLodingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );
      console.log(parsedResumes);

      setResumes(parsedResumes);
      setLodingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main className="bg-cover bg-[url('/images/bg-main.svg')] min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Application and Resume Ratings </h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>No Resumes Found -First Upload Resume To Get FeedBack</h2>
          ) : (
            <h2>Review Your Submissions and Ai powered Feedback</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col justify-center items-center">
            <img
              src="/images/resume-scan-2.gif"
              alt="resume-scan"
              className="w-[200px]"
            />
          </div>
        )}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to={"/"}
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
