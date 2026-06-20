import { Profile } from "./types";

export const INITIAL_PORTFOLIO_DATA: Profile = {
  name: "Kunj Thakor",
  title: "DevOps Engineer — Cloud & Embedded Systems Specialist",
  location: "Ahmedabad, India",
  bio: "Dynamic DevOps Engineer with 4.5 years of experience specializing in Cloud Automation, CI/CD pipeline development, and AI-integrated applications. Proven track record at eInfochips in deploying Azure OpenAI solutions and automating complex data-processing algorithms. Certified AWS Cloud Practitioner with deep expertise in Python, Linux, and Docker, focused on bridging the gap between embedded systems and scalable cloud infrastructure.",
  secondaryBio: "Highly focused on low-level system protocols, software debugging, and hardware automation alongside resilient cloud platforms.",
  statusText: "Currently leading DevOps automation & compliance",
  isAvailableForWork: true,
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200", 
  socials: {
    github: "https://github.com/kunjthakore",
    linkedin: "https://linkedin.com/in/kunjthakore",
    email: "kunjthakore@gmail.com",
    phone: "+91 7874804043",
    twitter: "",
    resumeUrl: "#"
  },
  projects: [
    {
      id: "proj_1",
      title: "Maui Framework Integration",
      description: "Designed and developed a professional user interface using Qt for the QualiPhy 2 application to enhance DSO validation. Ported compliance test cases and functionalities from legacy systems, ensuring seamless migration and performance consistency.",
      tags: ["Python", "Qt", "C++", "DSO Validation"],
      featured: true
    },
    {
      id: "proj_2",
      title: "Meridian Fixture Portal",
      description: "Integrated I2C and UART communication protocols for device interaction and implemented GPIO controls for hardware interfacing. Built a web-based configuration portal using Django for WiFi connectivity setup supporting static and DHCP configurations.",
      tags: ["Linux", "Python", "Django", "I2C", "UART", "GPIO"],
      featured: true
    },
    {
      id: "proj_3",
      title: "IB2 Simulator Unit",
      description: "Enhanced Python scripts for DCM modules, focusing on performance optimizations and reliability improvements. Conducted extensive code and test case reviews and collaborated with cross-functional teams to integrate hardware components.",
      tags: ["Python", "VS Code", "DCM modules", "Quality Review"],
      featured: true
    },
    {
      id: "proj_4",
      title: "Kepler FaceApp Pipeline",
      description: "Developed a Python application capable of receiving messages from Azure Service Bus to trigger complex algorithmic processes. Established a streamlined pipeline in Azure DevOps to optimize life-cycle and integrated push notifications.",
      tags: ["Azure", "Docker", "DevOps", "Service Bus", "APNS"],
      featured: true
    },
    {
      id: "proj_5",
      title: "Sagemaker AUTOML System",
      description: "Created Docker images housing ML models to ensure consistent deployment across various AWS environments. Managed end-to-end model deployment to EC2 via AWS Pipelines incorporating Code Build, Deploy, and Commit stages. Employed AutoML and AutoPilot.",
      tags: ["AWS", "Docker", "ECR", "Sagemaker", "AutoML", "EC2"],
      featured: false
    },
    {
      id: "proj_6",
      title: "Shree Shakti Oil Mill Billing System",
      description: "Designed and developed a streamlined billing and inventory control application for Shree Shakti Oil Mill using Django and Python. Features automated invoice creation, real-time GST computation, secure ledger entries, and daily database backup tasks.",
      tags: ["Django", "Python", "SQLite", "Invoicing Engine", "Ledger Management"],
      featured: true
    },
    {
      id: "proj_7",
      title: "Clothify E-Commerce Platform",
      description: "Built a fully functional e-commerce web application for clothing apparel using Django and Python. Implemented responsive browsing grids, dynamic multi-attribute product filters (size, price, color), session-based shopping cart handling, and interactive administrative reporting.",
      tags: ["Django", "Python", "E-Commerce", "Bootstrap", "Web App"],
      featured: true
    }
  ],
  experience: [
    {
      id: "exp_1",
      role: "Senior Software Engineer - Level 1",
      company: "eInfochips - An Arrow Company",
      duration: "July 2025 – Present",
      description: "Maui Framework project, developing automated Python validation scripts for compliance and measurement requirements. Automating legacy test migrations to modern frameworks, ensuring 100% environment parity and consistency for global testing teams. Utilizing Py-Lint and PDB for automated code quality checks, significantly reducing firmware release cycles.",
      skillsDeveloped: ["Python", "Maui", "Py-Lint", "PDB", "Compliance Scripting", "Validation"]
    },
    {
      id: "exp_2",
      role: "Engineer",
      company: "eInfochips - An Arrow Company",
      duration: "November 2021 – July 2025",
      description: "Architected an AI-driven Web application using Azure OpenAI to provide automated industry data intelligence and responses. Developed Python-based data ingestion pipelines that process device-to-cloud algorithms in real-time for embedded hardware. Established CI/CD workflows in Azure DevOps for seamless testing and deployment of AI and firmware updates. Integrated low-level protocols (I2C, UART) with Django interfaces.",
      skillsDeveloped: ["Azure OpenAI", "Azure DevOps", "Django", "I2C / UART", "CI/CD", "Python"]
    },
    {
      id: "exp_3",
      role: "Assistant Professor",
      company: "Parul University",
      duration: "December 2019 – November 2021",
      description: "Managed departmental academic operations as Faculty Exam Coordinator, overseeing technical curriculum standards. Conceptualized and launched technical courses in the Continuing Education Program (CEP) focused on software engineering.",
      skillsDeveloped: ["Academic Operations", "CEP", "Software Engineering Curriculum", "Teaching"]
    }
  ],
  skills: [
    {
      id: "skill_1",
      category: "Cloud & DevOps",
      skills: ["AWS (EC2, Sagemaker, ECR)", "Azure DevOps", "Azure OpenAI", "CI/CD Pipelines", "Docker", "AWS Code Commit"]
    },
    {
      id: "skill_2",
      category: "Automation & Scripting",
      skills: ["Python (Advanced)", "Shell Scripting", "JavaScript", "API Integration", "Requests library"]
    },
    {
      id: "skill_3",
      category: "Infrastructure & Tools",
      skills: ["Linux (Debian)", "Git", "SVN", "P4V", "Azure Repos", "VS Code", "PyCharm"]
    },
    {
      id: "skill_4",
      category: "System Knowledge",
      skills: ["Raspberry Pi 4", "I2C", "UART", "GPIO", "TCP/IP Socket", "PDB", "Py-Lint"]
    }
  ],
  education: [
    {
      id: "edu_1",
      degree: "M.Tech in Computer Engineering",
      institution: "Parul University",
      year: "2021",
      location: "Gujarat, Vadodara, India"
    },
    {
      id: "edu_2",
      degree: "Bachelor of Engineering - Computer Science and Engineering",
      institution: "Parul University",
      year: "2019",
      location: "Gujarat, Vadodara, India"
    }
  ]
};

