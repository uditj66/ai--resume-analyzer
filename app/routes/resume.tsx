import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import Ats from "~/components/Ats";
import Details from "~/components/Details";
export const meta = () => {
  return [
    { title: "Resumind | Review" },
    {
      name: "description",
      content: "Detail Overview of your resume",
    },
  ];
};
const Resume = () => {
  const { kv, auth, isLoading, fs, ai } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const resumeData = JSON.parse(resume);
      // files are returned as Blob from puter cloud storage so we will convert blobs to files E.g. =>image-blob -> image file and pdf-blob -> pdf file

      //Getting resume-blob from cloud storage
      const resumeBlob = await fs.read(resumeData.resumePath);
      if (!resumeBlob) return;

      // getting pdf-blob from resume blob
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });

      // Extracting pdf from pdf-blob
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      // Gettinf image-blob from cloud storage
      const imageBlob = await fs.read(resumeData.imagePath);
      if (!imageBlob) return;

      // getting image from image-blob
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(resumeData.feedback);

      console.log({ imageUrl, resumeUrl, feedback });
    };
    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to={"/"} className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to homepage{" "}
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank">
                <img
                  src={imageUrl}
                  alt="resume-img"
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold"> Resume Review</h2>
          {feedback ? (
            <>
              <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback={feedback} />
                <Ats
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />
              </div>
            </>
          ) : (
            <>
              <img
                src={"/images/resume-scan-2.gif"}
                alt="resume_search"
                className="w-full "
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
