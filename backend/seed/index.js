import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import About from '../models/About.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Achievement from '../models/Achievement.js';
import Certification from '../models/Certification.js';
import Research from '../models/Research.js';
import Seo from '../models/Seo.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Seeding...');

    // Admin
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
      if (!exists) {
        await User.create({ name: process.env.ADMIN_NAME || 'Aditi Singh', email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
        console.log('Admin created:', process.env.ADMIN_EMAIL);
      } else console.log('Admin already exists');
    }

    await Profile.deleteMany({});
    await Profile.create({
      name: 'Aditi Singh',
      tagline: 'CSE Undergrad • Full-Stack & AI/IoT Developer',
      roles: ['Full-Stack Developer', 'AI/IoT Enthusiast', 'React & Node.js', 'Hackathon Winner'],
      avatar: '',
      resumeUrl: '',
      phone: '+91 6264434150',
      email: '2903singhaditi@gmail.com',
      location: 'Bhilai / Raipur, Chhattisgarh, India',
      summary: 'CSE Undergrad with strong knowledge of React, Django, JavaScript, IoT systems, and teamwork. Built award-winning Smart Waste Management System (BinSense) and contributed to AI-driven projects like Tiger Detection using YOLOv8. Skilled in Canva design, PPT making, and communication.',
      socials: [
        { label: 'LinkedIn', url: '', icon: 'linkedin' },
        { label: 'GitHub', url: '', icon: 'github' },
        { label: 'Twitter', url: '', icon: 'twitter' },
      ],
      cpi: '8.34',
    });

    await About.deleteMany({});
    await About.create({
      heading: 'About Me',
      paragraphs: [
        'I am Aditi Singh, a Computer Science & Engineering undergraduate at Bhilai Institute of Technology, Durg, passionate about building end-to-end software systems — from IoT sensor networks to AI-driven computer-vision applications.',
        'I love turning ideas into shippable products: designing robust backends, crafting clean React frontends, and pushing ML models to the edge. My award-winning work spans smart-city IoT, sign-language translation, and assistive AI.',
        'Beyond code, I enjoy design, presentations, and leading hackathon teams to winning solutions.',
      ],
      image: '',
      highlights: [
        'SIH 2025 Winner (Hardware Edition)',
        '1st Prize - Code of the Phoenix Hackathon',
        'CPI 8.34 / B.Tech CSE',
      ],
      stats: [
        { label: 'CPI', value: '8.34' },
        { label: 'Hackathon Wins', value: '4+' },
        { label: 'Projects', value: '4+' },
        { label: 'ISL accuracy', value: '99.89%' },
      ],
    });

    await Skill.deleteMany({});
    const skills = [
      { category: 'Languages', items: ['Python', 'C', 'JavaScript'], order: 0, published: true },
      { category: 'Frameworks / Backend', items: ['Node.js', 'Firebase', 'Django'], order: 1, published: true },
      { category: 'Frontend', items: ['React', 'HTML', 'CSS', 'Tailwind', 'Bootstrap'], order: 2, published: true },
      { category: 'Database', items: ['MongoDB', 'SQLite'], order: 3, published: true },
      { category: 'IoT', items: ['ThingSpeak', 'Arduino', 'ESP8266', 'Sensors'], order: 4, published: true },
      { category: 'Tools', items: ['Git', 'Canva', 'MS PowerPoint'], order: 5, published: true },
    ];
    await Skill.create(skills);

    await Project.deleteMany({});
    await Project.create([
      {
        title: 'BinSense',
        subtitle: 'IoT Smart Waste Management System',
        description: 'IoT sensor network streaming real-time dustbin fill-level telemetry to Firebase with automated municipal alerts.',
        longDescription: [
          'Designed an IoT sensor network across 10 dustbin units that streams real-time fill-level telemetry to Firebase, triggering automated alerts to municipal authorities on threshold breach.',
          'Built a ThingSpeak + Firebase data pipeline for continuous logging and a live monitoring dashboard, enabling city-level waste status visibility from a single interface.',
          'Developed a waste-pattern analytics module estimating a 65% reduction in redundant collection trips. Won 1st Prize, Code of the Phoenix Hackathon (IIIT Naya Raipur, 2024).',
        ],
        techStack: ['NodeMCU', 'IoT Sensors', 'Firebase', 'JavaScript', 'Leaflet.js'],
        links: { github: '', live: '', video: '', demo: '' },
        image: '',
        featured: true,
        order: 0,
        published: true,
      },
      {
        title: 'SHRUTI AI',
        subtitle: 'Offline Sign Language Translation on Raspberry Pi',
        description: 'Edge-deployed ISL-to-English translation system using MediaPipe and TensorFlow with 99.89% accuracy.',
        longDescription: [
          'Engineered an offline, edge-deployed sign language translation system on Raspberry Pi - no internet dependency - converting ISL gestures into English sentences in real time using MediaPipe hand landmark extraction.',
          'Trained a deep neural network on 70 ISL signs on a self-curated dataset of 1,38,216 datapoints using MediaPipe landmark features, achieving 99.89% test accuracy (loss: 0.0037) with 2ms per-sample inference speed.',
          'Bridged model output to a React + Node.js interface rendering translated text with sub-second display refresh. Won Smart India Hackathon 2025 - Hardware Edition (PSID 25247).',
        ],
        techStack: ['Raspberry Pi', 'MediaPipe', 'TensorFlow', 'React', 'Node.js'],
        links: { github: '', live: '', video: '', demo: '' },
        image: '',
        featured: true,
        order: 1,
        published: true,
      },
      {
        title: 'Medical Report System (MRS)',
        subtitle: 'AI Medical Report Summarizer',
        description: 'AI-based Medical Report Summarizer with OCR + Groq LLM for condition detection and diet recommendations.',
        longDescription: [
          'Built an AI-based Medical Report Summarizer using React, Node.js, Express.js, and MongoDB to simplify medical reports.',
          'Integrated Tesseract OCR and Groq LLM for text extraction, report summarization, condition detection, and diet recommendations.',
          'Implemented JWT authentication, report storage, recommendation system, and REST APIs with MongoDB and Mongoose.',
        ],
        techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tesseract OCR', 'Groq LLM'],
        links: { github: '', live: '', video: '', demo: '' },
        image: '',
        featured: true,
        order: 2,
        published: true,
      },
      {
        title: 'Tiger Detection System',
        subtitle: 'Real-time AI Wildlife Detection',
        description: 'Real-time AI-powered system to detect tigers from live camera feeds with remote alerts for forest officials.',
        longDescription: [
          'Developed a real-time AI-powered system to detect tigers from live camera feeds.',
          'Deployed YOLOv8 for high-accuracy object detection, reducing false positives.',
          'Enabled remote alerts via SMS/Email for forest officials, enhancing wildlife conservation efforts.',
        ],
        techStack: ['YOLOv8', 'OpenCV', 'Python'],
        links: { github: '', live: '', video: '', demo: '' },
        image: '',
        featured: false,
        order: 3,
        published: true,
      },
    ]);

    await Experience.deleteMany({});
    await Experience.create([
      { role: 'Hackathon Winner - Smart India Hackathon 2025', organization: 'Government of India (PSID 25247)', startDate: '2025', endDate: '2025', type: 'hackathon', description: ['Developed SHRUTI-AI, a real-time sign language recognition and communication system using computer vision and full-stack web technologies to bridge communication gaps.'], order: 0, published: true },
    ]);

    await Education.deleteMany({});
    await Education.create([
      { institution: 'Bhilai Institute of Technology, Durg', degree: 'B.Tech', field: 'Computer Science & Engineering', startDate: 'Aug 2023', endDate: 'Aug 2027', score: '8.34', scoreType: 'CPI', description: ['CPI: 8.34'], order: 0, published: true },
      { institution: 'Holy Cross Higher Secondary School, Bayron Bazar, Raipur', degree: 'Higher Secondary', field: 'PCM + Informatic Practices', startDate: '', endDate: 'Jul 2022', score: '81%', scoreType: 'Percentage', description: ['Percentage: 81%'], order: 1, published: true },
    ]);

    await Achievement.deleteMany({});
    await Achievement.create([
      { title: 'SIH Winner 2025 (PS ID - 25247)', issuer: 'Smart India Hackathon - Hardware Edition', date: '2025', description: 'Developed SHRUTI-AI, a real-time sign language recognition and communication system using computer vision and full-stack web technologies to bridge communication gaps.', rank: 'Winner', order: 0, published: true },
      { title: '1st Place - Code of Phoenix Hackathon', issuer: 'E-Cell IIIT Naya Raipur', date: '2024', description: 'BinSense smart waste management system.', rank: '1st', order: 1, published: true },
      { title: '1st Place - Business Plan Pitching Competition', issuer: 'Innovation Club, IIC & Dept. of CSE, BIT Durg', date: '', description: '', rank: '1st', order: 2, published: true },
      { title: '4th Position - Hack-BIOS', issuer: 'Shri Shankaracharya Technical Campus, Durg', date: '2025', description: 'Developed AksharDhara, an AI powered translation model for local dialects to natural languages.', rank: '4th', order: 3, published: true },
      { title: '1st Prize - Tech X Survival', issuer: 'IEEE Student Branch BIT Durg - Women in Engineering (WIE)', date: '', description: 'Idea pitching competition.', rank: '1st', order: 4, published: true },
    ]);

    await Certification.deleteMany({});
    await Certification.create([]);

    await Research.deleteMany({});
    await Research.create([]);

    await Seo.deleteMany({});
    await Seo.create({
      title: 'Aditi Singh - Full-Stack & AI/IoT Developer | Portfolio',
      description: 'Portfolio of Aditi Singh - CSE undergrad, React/Node.js full-stack developer, IoT & AI builder. SIH 2025 Winner, 1st Place Code of the Phoenix Hackathon.',
      keywords: ['Aditi Singh', 'Portfolio', 'Full-Stack Developer', 'React', 'Node.js', 'IoT', 'AI', 'Django', 'Hackathon Winner', 'Sign Language Translation'],
      ogTitle: 'Aditi Singh - Full-Stack & AI/IoT Developer',
      ogDescription: 'Award-winning full-stack and AI/IoT developer. Explore projects, achievements and experience.',
      twitterCard: 'summary_large_image',
    });

    console.log('Seed complete.');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
run();
