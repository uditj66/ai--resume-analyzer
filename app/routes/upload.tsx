// import React, { type FormEvent } from "react";
// import Navbar from "~/components/Navbar";
// import { useState } from "react";
// import FileUploader from "~/components/FileUploader";
// import { usePuterStore } from "~/lib/puter";
// import { useNavigate } from "react-router";
// import { convertPdfToImage } from "~/lib/pdftoImage";
// import { generateUUID } from "~/lib/utils";
// import { prepareInstructions } from "../../constants";
// const upload = () => {
//   const { kv, ai, fs, isLoading, error, auth } = usePuterStore();

//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusText, setStatusText] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   //Yahan ulta chal rha hai ,mujhe FileUploader componenet se file mil rhi ha ,naki ma fileUploader componenet ko prop pass kar rha hu.
//   const handleFileSelect = (file: File | null) => {
//     setFile(file);
//   };
//   const handleAnalyse = async ({
//     companyName,
//     jobTitle,
//     jobDescription,
//     file,
//   }: {
//     companyName: string;
//     jobTitle: string;
//     jobDescription: string;
//     file: File;
//   }) => {
//     setIsProcessing(true);
//     setStatusText("Uplaoding the file ....");
//     const uploadedFile = await fs.upload([file]);
//     if (!uploadedFile)
//       return setStatusText("Error:Failed to upload the file 👎");
//     setStatusText("Converting to image ...");
//     const imageToPdf = await convertPdfToImage(file);
//     if (!imageToPdf.file)
//       return setStatusText("Error:Failed to convert Pdf To Image👎");
//     setStatusText("Uploading The Image....");
//     const uploadedImage = await fs.upload([imageToPdf.file]);
//     if (!uploadedImage) return setStatusText("Error:Failed to upload Image👎");

//     setStatusText("Preparing the data...");
//     const uuid = generateUUID();
//     const data = {
//       id: uuid,
//       resumePath: uploadedFile.path,
//       imagePath: uploadedImage.path,
//       CompanyName: companyName,
//       JobTitle: jobTitle,
//       JobDescription: jobDescription,
//       File: file,
//       feedback: "",
//     };

//     await kv.set(`resume:${uuid}`, JSON.stringify(data));

//     setStatusText("Analysing...... please Wait");
//     const AIResponseFormat = `
//         interface Feedback {
//         overallScore: number; //max 100
//         ATS: {
//           score: number; //rate based on ATS suitability
//           tips: {
//             type: "good" | "improve";
//             tip: string; //give 3-4 tips
//           }[];
//         };
//         toneAndStyle: {
//           score: number; //max 100
//           tips: {
//             type: "good" | "improve";
//             tip: string; //make it a short "title" for the actual explanation
//             explanation: string; //explain in detail here
//           }[]; //give 3-4 tips
//         };
//         content: {
//           score: number; //max 100
//           tips: {
//             type: "good" | "improve";
//             tip: string; //make it a short "title" for the actual explanation
//             explanation: string; //explain in detail here
//           }[]; //give 3-4 tips
//         };
//         structure: {
//           score: number; //max 100
//           tips: {
//             type: "good" | "improve";
//             tip: string; //make it a short "title" for the actual explanation
//             explanation: string; //explain in detail here
//           }[]; //give 3-4 tips
//         };
//         skills: {
//           score: number; //max 100
//           tips: {
//             type: "good" | "improve";
//             tip: string; //make it a short "title" for the actual explanation
//             explanation: string; //explain in detail here
//           }[]; //give 3-4 tips
//         };
//       }`;

//     const feedback = await ai.feedback(
//       uploadedFile.path,
//       prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
//     );
//     if (!feedback) return setStatusText("Error: Failed to analyse resume ");

//     const feedbackText =
//       typeof feedback.message.content === "string"
//         ? feedback.message.content
//         : feedback.message.content[0].text;

//     data.feedback = JSON.parse(feedbackText);
//     await kv.set(`resume${uuid}`, JSON.stringify(data));
//     setStatusText("Analysis Completed ....");
//   };
//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget.closest("form");
//     if (!form) return;
//     const formData = new FormData(form);
//     const companyName = formData.get("company-name") as string;
//     const jobTitle = formData.get("job-title") as string;
//     const jobDescription = formData.get("job-description") as string;
//     if (!file) return;

//     handleAnalyse({ companyName, jobDescription, jobTitle, file });
//   };
//   return (
//     <main className="bg-cover bg-[url('/images/bg-main.svg')] min-h-screen">
//       <Navbar />
//       <section className="main-section">
//         <div className="page-heading py-16">
//           <h1>Smart FeedBack For Your Job</h1>
//           {isProcessing ? (
//             <>
//               <h2>{statusText}</h2>
//               <img
//                 src={"images/resume-scan.gif"}
//                 alt="searching"
//                 className="w-full"
//               />
//             </>
//           ) : (
//             <>
//               <h2>Drop your resume for ATS and improvement</h2>
//             </>
//           )}
//           {!isProcessing && (
//             <>
//               <form
//                 className="flex flex-col gap-4 mt-8"
//                 action="submit"
//                 onSubmit={handleSubmit}
//                 id="upload-form"
//               >
//                 <div className="form-div">
//                   <label htmlFor="company-name">Company Name</label>
//                   <input
//                     type="text"
//                     name="company-name"
//                     id="company-name"
//                     placeholder="Company Name"
//                   />
//                 </div>
//                 <div className="form-div">
//                   <label htmlFor="job-title">Job Title</label>
//                   <input
//                     type="text"
//                     name="job-title"
//                     id="job-title"
//                     placeholder="Job Title"
//                   />
//                 </div>
//                 <div className="form-div">
//                   <label htmlFor="job-description">Job Description</label>
//                   <textarea
//                     rows={5}
//                     name="job-description"
//                     id="job-description"
//                     placeholder="Job Description"
//                   />
//                 </div>
//                 <div className="form-div">
//                   <label htmlFor="uploader">Upload Resume</label>
//                   <FileUploader onFileSelect={handleFileSelect} />
//                 </div>

//                 <button className="primary-button" type="submit">
//                   Analyse Resume
//                 </button>
//               </form>
//             </>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default upload;
import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdftoImage";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
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

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file 👎");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText(
        `Error: Failed to convert PDF to image 👎  ${imageFile.error ? ` - ${imageFile.error}` : ""}`
      );

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage)
      return setStatusText(`Error: Failed to upload image 👎`);

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");
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
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    console.log(data);
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

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
export default Upload;
