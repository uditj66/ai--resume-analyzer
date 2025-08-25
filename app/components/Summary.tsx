import React from "react";
import ScoreGuage from "./ScoreGuage";

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor =
    score > 69
      ? "bg-badge-green"
      : score > 49
        ? "bg-badge-yellow"
        : "bg-badge-red";
  const textColor =
    score > 69
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";
  const badgeText =
    score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

  return (
    <div className={`score-badge ${badgeColor}`}>
      <p className={`text-xs {textColor} font-semibold`}>{badgeText}</p>
    </div>
  );
};
const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";
  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
        </div>
        <p className="text-2xl">
          <span className={textColor}>{score}/100</span>
        </p>
      </div>
    </div>
  );
};
const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-col items-center p-4 gap-8">
        <ScoreGuage score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <ScoreBadge score={feedback.overallScore} />
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This Score is Calculated Based on Parameters listed Below
          </p>
        </div>
      </div>
      <Category title={"Tone And Style"} score={feedback.toneAndStyle.score} />
      <Category title={"Content"} score={feedback.content.score} />
      <Category title={"Structure"} score={feedback.structure.score} />
      <Category title={"Skills"} score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
