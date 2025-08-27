# 🤖 AI Resume Analyzer

<div align="center">

![Resume Analysis](https://img.shields.io/badge/AI-Powered%20Analysis-blue?style=for-the-badge&logo=openai)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**An intelligent resume analysis platform powered by AI that provides comprehensive feedback on your resume's ATS compatibility, content quality, structure, and more.**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🎯 Project Overview](#-project-overview)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📖 Usage Guide](#-usage-guide)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **🤖 AI-Powered Analysis**: Advanced AI analysis of resumes using Puter's AI services
- **📊 ATS Compatibility Scoring**: Evaluate how well your resume performs with Applicant Tracking Systems
- **📈 Comprehensive Scoring**: Detailed scoring across multiple dimensions:
  - Overall Score (0-100)
  - ATS Compatibility
  - Tone & Style
  - Content Quality
  - Structure & Layout
  - Skills Assessment

### 📱 User Experience
- **🎨 Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **📱 Mobile-First**: Optimized for all device sizes
- **⚡ Real-time Processing**: Instant feedback and analysis
- **📁 File Management**: Secure cloud storage with Puter
- **🔄 Resume Tracking**: Track multiple resume submissions and their feedback

### 🔧 Technical Features
- **🔐 Authentication**: Secure user authentication system
- **☁️ Cloud Storage**: Integrated cloud file storage and management
- **📄 PDF Processing**: Convert PDF resumes to images for AI analysis
- **🎯 Job-Specific Analysis**: Tailored feedback based on job descriptions
- **📊 Detailed Feedback**: Actionable tips and improvement suggestions

---

## 🛠️ Technologies Used

### Frontend Technologies
- ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react) **React 19.1.0** - Modern UI framework
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript) **TypeScript 5.8.3** - Type-safe JavaScript
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.4-38B2AC?style=flat&logo=tailwind-css) **Tailwind CSS 4.1.4** - Utility-first CSS framework
- ![React Router](https://img.shields.io/badge/React%20Router-7.7.1-CA4245?style=flat&logo=react-router) **React Router 7.7.1** - Client-side routing

### Backend & Services
- ![Puter](https://img.shields.io/badge/Puter-Cloud%20Platform-00A3FF?style=flat) **Puter Cloud Platform** - Backend-as-a-Service
  - Authentication services
  - File storage and management
  - AI/ML services for resume analysis
  - Key-value storage

### Development Tools
- ![Vite](https://img.shields.io/badge/Vite-6.3.3-646CFF?style=flat&logo=vite) **Vite 6.3.3** - Build tool and dev server
- ![Zustand](https://img.shields.io/badge/Zustand-5.0.8-764ABC?style=flat) **Zustand 5.0.8** - State management
- ![React Dropzone](https://img.shields.io/badge/React%20Dropzone-14.3.8-0084FF?style=flat) **React Dropzone 14.3.8** - File upload handling
- ![PDF.js](https://img.shields.io/badge/PDF.js-5.4.54-F40F02?style=flat&logo=pdf) **PDF.js 5.4.54** - PDF processing

### Additional Libraries
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind CSS class merging
- **isbot** - Bot detection

---

## 🎯 Project Overview

The AI Resume Analyzer is a comprehensive web application that helps job seekers optimize their resumes for better job application success. The platform leverages advanced AI technology to provide detailed analysis and actionable feedback on resume quality, ATS compatibility, and overall effectiveness.

### Key Components

1. **📤 Upload System**: Drag-and-drop file upload with PDF support
2. **🤖 AI Analysis Engine**: Powered by Puter's AI services for comprehensive resume evaluation
3. **📊 Feedback Dashboard**: Detailed scoring and improvement suggestions
4. **📁 Resume Management**: Track and manage multiple resume submissions
5. **🎨 Modern Interface**: Intuitive, responsive design for optimal user experience

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js) **Node.js 18+**
- ![npm](https://img.shields.io/badge/npm-9+-CB3837?style=flat&logo=npm) **npm 9+** or ![Yarn](https://img.shields.io/badge/Yarn-1.22+-2C8EBB?style=flat&logo=yarn) **Yarn 1.22+**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Puter (Optional)**
   The project uses Puter's cloud platform for backend services. If you need to configure specific Puter settings, you can do so through their dashboard. For local development, the default configuration should work out of the box.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm start

# Type checking
npm run typecheck
```

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── 📁 app/                          # Main application code
│   ├── 📁 components/               # Reusable UI components
│   │   ├── Accordion.tsx           # Collapsible content sections
│   │   ├── Ats.tsx                 # ATS compatibility component
│   │   ├── Details.tsx             # Detailed feedback display
│   │   ├── FileUploader.tsx        # File upload interface
│   │   ├── Navbar.tsx              # Navigation component
│   │   ├── ResumeCard.tsx          # Resume preview cards
│   │   ├── ScoreCircle.tsx         # Score visualization
│   │   ├── ScoreGuage.tsx          # Gauge chart component
│   │   └── Summary.tsx             # Summary dashboard
│   ├── 📁 lib/                      # Utility libraries
│   │   ├── pdftoImage.ts           # PDF to image conversion
│   │   ├── puter.ts                # Puter cloud service integration
│   │   └── utils.ts                # Helper functions
│   ├── 📁 routes/                   # Application routes
│   │   ├── auth.tsx                # Authentication page
│   │   ├── home.tsx                # Dashboard/home page
│   │   ├── resume.tsx              # Resume analysis view
│   │   ├── upload.tsx              # File upload page
│   │   └── wipe.tsx                # Data cleanup utility
│   ├── 📁 types/                    # TypeScript type definitions
│   │   ├── index.d.ts              # Main type definitions
│   │   └── puter.d.ts              # Puter-specific types
│   ├── app.css                     # Global styles
│   ├── root.tsx                    # Root component
│   └── routes.ts                   # Route configuration
├── 📁 constants/                    # Application constants
│   └── index.ts                    # AI response formats and data
├── 📁 public/                       # Static assets
│   ├── 📁 icons/                    # SVG icons
│   ├── 📁 images/                   # Images and graphics
│   └── pdf.worker.min.mjs          # PDF.js worker
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
└── README.md                        # Project documentation
```

---

## 🔧 Configuration

### Puter Cloud Services

The application relies on Puter's cloud platform for:
- **Authentication**: User sign-in/sign-out functionality
- **File Storage**: Secure cloud storage for resumes and images
- **AI Services**: Resume analysis and feedback generation
- **Key-Value Storage**: Data persistence for resume metadata

### Environment Setup

The project uses Puter's cloud platform which handles all backend services automatically. No additional environment configuration is required for local development. The Puter SDK provides:
- File upload and storage
- AI service access
- Key-value storage operations
- User authentication

---

## 📖 Usage Guide

### 1. Getting Started
1. **Sign In**: Use your Puter account to authenticate
2. **Upload Resume**: Drag and drop your PDF resume
3. **Provide Job Details**: Enter company name, job title, and description
4. **Analyze**: Let AI analyze your resume

### 2. Understanding Your Results

#### 📊 Overall Score
- **90-100**: Excellent resume, ready for applications
- **70-89**: Good resume with minor improvements needed
- **50-69**: Needs significant improvements
- **Below 50**: Major revisions required

#### 🎯 ATS Compatibility
- Evaluates how well your resume performs with Applicant Tracking Systems
- Checks for proper formatting, keywords, and structure
- Provides specific tips for optimization

#### 📝 Content Analysis
- Reviews the quality and relevance of your content
- Suggests improvements for impact and clarity
- Identifies missing or weak sections

#### 🎨 Style & Structure
- Analyzes visual presentation and organization
- Recommends layout improvements
- Ensures professional appearance

### 3. Making Improvements
- Review all feedback sections
- Implement suggested changes
- Re-upload for re-analysis
- Track your progress over time

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add appropriate tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Puter Cloud Platform** for providing the backend infrastructure
- **React Router** team for the excellent routing solution
- **Tailwind CSS** for the beautiful styling framework
- **OpenAI** for the AI capabilities that power the analysis

---

<div align="center">

**Made with ❤️ by the AI Resume Analyzer Team**

[⭐ Star this repo](#) • [🐛 Report an issue](#) • [📧 Contact us](#)

</div>
