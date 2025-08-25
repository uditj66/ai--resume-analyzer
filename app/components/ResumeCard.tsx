import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";
import { useState, useEffect } from "react";
/*
Notes:-
 Inline typing (done inside the function).
 1.Here, the type is written right next to the function parameter.
 2.We say:
 "This component takes a prop called resume, and its type is Resume."
 3.You don’t need to create a separate type elsewhere.
 ✅ Good for quick typing when the props are simple or used only in this one place.
*/
const ResumeCard = ({
  resume: { id, jobTitle, imagePath, resumePath, companyName, feedback },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  useEffect(() => {
    const loadresume = async () => {
      const imageBlob = await fs.read(imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setResumeUrl(imageUrl);
    };
    loadresume();
  }, [imagePath]);

  return (
    <Link
      className="resume-card animate-in fade-in duration-1000"
      to={`/resume/${id}`}
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="text-black font-bold break-words">{companyName}</h2>
          )}

          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="text-black font-bold">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore}></ScoreCircle>
        </div>
      </div>
      <div className=" gradient-border animate-in fade-in duration-1000">
        {resumeUrl && (
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] mx:sm:h-[200px] object-cover object-top"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ResumeCard;
