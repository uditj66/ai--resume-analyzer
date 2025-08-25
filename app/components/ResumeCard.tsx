import React from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
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
  return (
    <Link
      className="resume-card animate-in fade-in duration-1000"
      to={`/resume/${id}`}
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={75}></ScoreCircle>
        </div>
      </div>
      <div className=" gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt="resume"
            className="w-full h-[350px] mx:sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
