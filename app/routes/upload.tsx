import { useEffect, type FormEvent } from "react";
import Navbar from "~/components/Navbar";
import { useState } from "react";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdftoImage";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import { useNavigate } from "react-router";

const Upload = () => {
  const navigate = useNavigate();
  const { kv, ai, fs, isLoading, error, auth } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [auth.isAuthenticated]);
  //Yahan ulta chal rha hai ,mujhe FileUploader componenet se file mil rhi ha ,naki ma fileUploader componenet ko prop pass kar rha hu.
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyse = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uplaoding the file ....");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile)
      return setStatusText("Error:Failed to upload the file 👎");
    setStatusText("Converting to image ...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText(
        `Error: Failed to convert PDF to image 👎  ${imageFile.error ? ` - ${imageFile.error}` : ""}`
      );
    setStatusText("Uploading The Image....");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error:Failed to upload Image👎");

    setStatusText("Preparing the data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      CompanyName: companyName,
      JobTitle: jobTitle,
      JobDescription: jobDescription,
      File: file,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analysing...... please Wait");
    const AIResponseFormat = `
        interface Feedback {
        overallScore: number; //max 100
        ATS: {
          score: number; //rate based on ATS suitability
          tips: {
            type: "good" | "improve";
            tip: string; //give 3-4 tips
          }[];
        };
        toneAndStyle: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        content: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        structure: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        skills: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
      }`;

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
    );
    if (!feedback) return setStatusText("Error: Failed to analyse resume ");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis Completed ....");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return;

    handleAnalyse({ companyName, jobDescription, jobTitle, file });
  };
  return (
    <main className="bg-cover bg-[url('/images/bg-main.svg')] min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className={`page-heading ${isProcessing ? "py-8" : "py-16"}`}>
          <h1>Smart FeedBack For Your Job</h1>
          {isProcessing ? (
            <>
              <h2 className="mb-3">{statusText}</h2>
              <img
                src={"images/resume-scan.gif"}
                alt="searching"
                className="mx-auto max-w-xs sm:max-w-sm md:max-w-md w-full mt-2"
              />
            </>
          ) : (
            <>
              <h2>Drop your resume for ATS and improvement</h2>
            </>
          )}
          {!isProcessing && (
            <>
              <form
                className="flex flex-col gap-4 mt-8"
                action="submit"
                onSubmit={handleSubmit}
                id="upload-form"
              >
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    placeholder="Job Title"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea
                    rows={5}
                    name="job-description"
                    id="job-description"
                    placeholder="Job Description"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="uploader">Upload Resume</label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>

                <button className="primary-button" type="submit">
                  Analyse Resume
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
