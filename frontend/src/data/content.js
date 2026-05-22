import { FiGlobe, FiSmartphone, FiCode, FiDatabase, FiEdit3 } from 'react-icons/fi';
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiOpenai,
} from 'react-icons/si';
import { MdDeliveryDining, MdApartment } from 'react-icons/md';

export const personal = {
  name:     'Leonard Kwolesha',
  title:    'Full Stack Developer',
  /* Hero typing animation cycles through these */
  titles: [
    'Full Stack Developer',
    'React Native Developer',
    'MERN Stack Engineer',
    'Backend API Developer',
  ],
  subtitle:   'React · Node.js · Express · MongoDB · React Native',
  bio1: "I'm Leonard Kwolesha, a full stack software developer based in Dar es Salaam. I build complete digital products — from scalable REST APIs with Node.js and Express, to responsive React frontends, to cross-platform mobile apps with React Native. MongoDB is my go-to for flexible, fast data storage.",
  bio2: "I love the challenge of taking an idea from concept to a deployed product. Whether it's a web platform or a mobile application, I write clean, maintainable code that's built to last.",
  email:      'leonardsengoma07@gmail.com',
  github:     'https://github.com/leonardkwolesha/portfolio-LK',
  linkedin:   'https://www.linkedin.com/in/leonard-sengoma-39a337351/',
  location:   'Dar es Salaam, Tanzania',
  photo:      '/ceo_nobg.png',
  aboutPhoto: '/leonard_nobg.png',
};

/* nums are numbers (not strings) so useCountUp can animate them */
export const stats = [
  { num: 10,  suffix: '+', label: 'Completed\nProjects'  },
  { num: 100, suffix: '%', label: 'Client\nSatisfaction' },
  { num: 2,   suffix: '+', label: 'Years of\nExperience' },
];

/* Icon = react-icons component reference */
export const services = [
  { Icon: FiGlobe,      name: 'Web Development' },
  { Icon: FiSmartphone, name: 'App Development' },
  { Icon: FiCode,       name: 'API Development' },
  { Icon: FiDatabase,   name: 'Database Design'  },
];

export const projects = [
  {
    id:          1,
    title:       'Kebite',
    description: "Tanzania's food delivery platform — connects customers, restaurants, and riders in Dar es Salaam with real-time order tracking, live chat, and dedicated mobile apps for all three user types.",
    tags:        ['React', 'React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    Icon:        MdDeliveryDining,
    iconColor:   '#fb923c',
    gradient:    'linear-gradient(135deg, #1a0e00, #2a1800)',
    github:      'https://github.com/leonardkwolesha/kebite',
    live:        '#',
  },
  {
    id:          2,
    title:       'Rent Easy',
    description: 'Full-featured rental property platform with separate tenant and landlord apps, lease management, automated payment generation, maintenance requests, and Cloudinary image uploads.',
    tags:        ['React', 'React Native', 'Node.js', 'MongoDB', 'Express'],
    Icon:        MdApartment,
    iconColor:   '#34d399',
    gradient:    'linear-gradient(135deg, #001a18, #002a22)',
    github:      'https://github.com/leonardkwolesha/rent-easy',
    live:        '#',
  },
  {
    id:          3,
    title:       'BloggerLK',
    description: 'Full-stack MERN blogging platform with JWT authentication, Cloudinary cover image uploads, full-text post search, password reset via email, and a personal content management dashboard.',
    tags:        ['React', 'Node.js', 'MongoDB', 'Express', 'Cloudinary'],
    Icon:        FiEdit3,
    iconColor:   '#c084fc',
    gradient:    'linear-gradient(135deg, #0e0018, #160028)',
    github:      'https://github.com/leonardkwolesha/blog-project',
    live:        'https://blog-project-seven-alpha.vercel.app/',
  },
  {
    id:          4,
    title:       'EduAI OS',
    description: 'AI-powered personalized learning platform with an adaptive curriculum engine, conversational AI tutor, real-time emotion detection, multimodal content delivery, and a React Native mobile app.',
    tags:        ['Next.js', 'FastAPI', 'Python', 'OpenAI', 'Supabase', 'React Native'],
    Icon:        SiOpenai,
    iconColor:   '#60a5fa',
    gradient:    'linear-gradient(135deg, #000e1a, #00162a)',
    github:      'https://github.com/leonardkwolesha/e-learning',
    live:        '#',
  },
];

/* Icon = react-icons component, color = official brand hex */
export const stack = [
  { Icon: SiReact,      name: 'React',        role: 'Frontend',      color: '#61dafb' },
  { Icon: SiNodedotjs,  name: 'Node.js',      role: 'Runtime',       color: '#68a063' },
  { Icon: SiExpress,    name: 'Express',      role: 'API Framework', color: '#cccccc' },
  { Icon: SiMongodb,    name: 'MongoDB',      role: 'Database',      color: '#47a248' },
  { Icon: SiReact,      name: 'React Native', role: 'Mobile',        color: '#61dafb' },
  { Icon: SiJavascript, name: 'JavaScript',   role: 'Language',      color: '#f7df1e' },
];

export const ticker = [
  'React', 'Node.js', 'Express', 'MongoDB',
  'React Native', 'JavaScript', 'REST APIs', 'Git',
];
