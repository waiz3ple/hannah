/**
 * All website copy lives here so it can be edited without touching layout code.
 *
 * Status notes from the working document are kept as comments:
 *   TO CONFIRM — direction agreed, factual detail to be checked before launch
 *   TO PROVIDE — asset / figure / link still required
 *
 * To add a photo to a project, drop the file in `src/site/assets/` and import it
 * into the `image` field — the placeholder artwork is replaced automatically.
 */

import portrait from "../assets/hannah-portrait_400x400.jpg";

export const profile = {
  name: "Hannah Esan Oyawoye",
  shortName: "Hannah Oyawoye",
  title: "Live Production Manager | Creative Project Manager | Event Curator",
  roles: ["Live Production Manager", "Creative Project Manager", "Event Curator"],
  brandStatement: "Delivering the systems, people and production behind memorable live experiences.",
  heroStatement:
    "I manage the people, systems, logistics and creative processes behind live experiences. From pre-production planning to on-site delivery, I work across production, operations, teams and audience experience to turn ambitious ideas into organised and memorable events.",
  location: "UK-based", // TO CONFIRM wording
  portrait,
  // TO PROVIDE: stable URL to the downloadable profile / CV PDF. The "Download Profile" button appears once set.
  profileUrl: "",
};

export const contact = {
  // Shown on the contact page and footer; enquiries from the contact form are delivered here.
  email: "info@hannahoyawoye.com",
  linkedin: "https://www.linkedin.com/in/hannah-esan-oyawoye-59b46b428",
  // TO CONFIRM: preferred professional/social handle.
  instagram: "raddyhan",
  // Enquiries are delivered to `email` via FormSubmit (formsubmit.co). After activation, set
  // VITE_CONTACT_ENDPOINT to the FormSubmit alias URL (https://formsubmit.co/ajax/<alias>) to hide the address.
  formEndpoint:
    (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || "https://formsubmit.co/ajax/info@hannahoyawoye.com",
  enquiryTypes: [
    "Live Production",
    "Creative Project",
    "Event Operations",
    "Event Consultation",
    "Speaking Invitation",
    "Collaboration",
    "Media Enquiry",
    "General Enquiry",
  ],
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Expertise", to: "/expertise" },
  { label: "Behind the Programme", to: "/behind-the-programme" },
  { label: "Media", to: "/media" },
  { label: "Contact", to: "/contact" },
];

// Only figures supported by the portfolio below. TO CONFIRM: audience reach, team sizes, delegate countries.
export const metrics = [
  { value: "2", label: "Productions at OVO Arena Wembley" },
  { value: "3", label: "UK cities — London, Newcastle, Manchester" },
  { value: "5", label: "Flagship live programmes delivered" },
  { value: "MSc", label: "IT Project Management, Teesside University" },
];

export const philosophy = [
  { word: "People", line: "Every experience is delivered by a team that knows its role." },
  { word: "Systems", line: "Good processes make the complex feel effortless." },
  { word: "Preparation", line: "Great events are built long before event day." },
  { word: "Excellence", line: "The details the audience never notices still matter." },
  { word: "Adaptability", line: "Plans hold, but people on the ground respond." },
];

/** Show-day running order used as the homepage signature element. */
export const runningOrder = [
  { time: "T–12 wks", cue: "Pre-production", note: "Scope, budget, stakeholders, timeline" },
  { time: "T–4 wks", cue: "Systems", note: "Registration, access, volunteers, vendors" },
  { time: "Load-in", cue: "Venue & build", note: "Production, staging, hospitality" },
  { time: "Doors", cue: "Audience experience", note: "Access, movement, welcome" },
  { time: "Show", cue: "Live delivery", note: "Programme, cues, contingencies" },
  { time: "T+1 wk", cue: "Debrief", note: "Reporting, lessons, improvements" },
];

export type ExpertiseArea = { title: string; description: string };

export const expertiseGroups: { name: string; intro: string; areas: ExpertiseArea[] }[] = [
  {
    name: "Production & Delivery",
    intro: "Taking a programme from first plan to live moment.",
    areas: [
      {
        title: "Live Production Management",
        description: "Planning and coordinating production activities from pre-production through live delivery.",
      },
      {
        title: "Creative Project Management",
        description:
          "Managing timelines, teams, stakeholders, priorities and deliverables across complex creative projects.",
      },
      {
        title: "Event Curation",
        description:
          "Helping shape programmes, experiences and event environments around clear objectives and audience needs.",
      },
      {
        title: "Programme Coordination",
        description: "Managing schedules, speakers and artists, production teams and programme requirements.",
      },
    ],
  },
  {
    name: "Operations & People",
    intro: "The systems and teams that make a live event run.",
    areas: [
      {
        title: "Event Operations",
        description:
          "Building the operational systems required for smooth event delivery, including logistics, access, staffing, venue coordination and audience movement.",
      },
      {
        title: "Volunteer & Workforce Management",
        description: "Recruiting, structuring, communicating with and coordinating teams across operational departments.",
      },
      {
        title: "Registration & Access Management",
        description: "Designing attendee registration, ticketing, accreditation and access-control processes.",
      },
      {
        title: "Venue & Stakeholder Coordination",
        description:
          "Working across venue, supplier, production and internal teams to resolve requirements and keep delivery aligned.",
      },
      {
        title: "Risk & Issue Management",
        description:
          "Anticipating what could go wrong, planning contingencies and staying calm and decisive when issues arise live.",
      },
    ],
  },
  {
    name: "Audience, Brand & Insight",
    intro: "How people find, feel and remember the event.",
    areas: [
      {
        title: "Audience Experience",
        description:
          "Connecting registration, access, hospitality, communication and programme delivery into a smooth attendee journey.",
      },
      {
        title: "Merchandise & Event Branding",
        description:
          "Developing merchandise and visual assets that strengthen event identity, support audience engagement and generate additional revenue.",
      },
      {
        title: "Email Marketing & Publicity",
        description:
          "Contributing to email campaigns, publicity and promotional communications that build awareness, drive attendance and keep messaging consistent.",
      },
      {
        title: "Post-Event Reporting",
        description:
          "Reviewing attendance, operations, outcomes, lessons learned and opportunities for improvement.",
      },
    ],
  },
];

export const education = [
  { award: "MSc IT Project Management", institution: "Teesside University" },
  { award: "BSc Business Administration", institution: "Caleb University" },
  { award: "BTech Management Information Technology", institution: "Abubakar Tafawa Balewa University" },
];

export const certifications = [
  "Project Management",
  "ISO/IEC 27001 Information Security Management Systems Awareness",
  "Google Data Analytics",
  "Management Training",
  "21st Century Sales Forces",
];

export const journey = [
  {
    stage: "Fintech & Payments",
    text: "Built professional foundations in fast-paced fintech and payments environments, where accuracy, process and accountability are non-negotiable.",
  },
  {
    stage: "Technology & Project Delivery",
    text: "Managed projects and coordinated multidisciplinary teams across technology and business operations, solving operational problems under pressure.",
  },
  {
    stage: "MSc IT Project Management",
    text: "Formalised that experience at Teesside University — planning, risk, stakeholder engagement, delivery and continuous improvement.",
  },
  {
    stage: "Live Production & Creative Industries",
    text: "Now brings that structure to live production — managing operations, teams, branding and audience experience for arena-scale programmes across the UK.",
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  venue: string;
  city: string;
  date: string;
  role: string;
  disciplines: string[];
  summary: string;
  overview: string;
  scale: { label: string; value: string }[];
  responsibilities: string[];
  challenge: string;
  approach: string[];
  outcome: string;
  /** Accent used by the placeholder artwork until photography is supplied. */
  tone: "bronze" | "ember" | "gold" | "violet" | "teal";
  image?: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "victory-sounds-sinach-live",
    title: "Victory Sounds",
    subtitle: "Sinach Live in Concert",
    venue: "OVO Arena Wembley",
    city: "London",
    date: "6 July 2024",
    role: "Live Production Manager",
    disciplines: ["Live concert production", "Venue operations", "Artist environment", "Audience experience"],
    summary:
      "An arena concert production at OVO Arena Wembley, coordinating production, venue and front-of-house teams around a headline artist.",
    overview:
      "Victory Sounds brought Sinach to the stage at OVO Arena Wembley for a live concert. The production brought together the artist and their team, the venue, technical production and front-of-house operations — all working to a single show-day timeline.",
    scale: [
      { label: "Venue", value: "OVO Arena Wembley" },
      { label: "Format", value: "Arena concert" },
      { label: "Date", value: "6 July 2024" },
      { label: "Role", value: "Live Production Manager" },
    ],
    // TO CONFIRM: final responsibilities, audience figure, approved images and outcome statement.
    responsibilities: [
      "Coordinating production activity from pre-production planning through to live delivery",
      "Working within large-venue operating requirements, schedules and regulations",
      "Supporting the artist production environment and backstage flow",
      "Coordinating teams across production, operations and front of house",
      "Keeping audience experience at the centre of operational decisions",
    ],
    challenge:
      "Arena concerts leave little margin: fixed load-in windows, venue regulations, artist requirements and a large audience arriving within a narrow window all have to line up on one day.",
    approach: [
      "Built the production plan backwards from doors and show time, so every department knew its deadlines.",
      "Kept a single line of communication between the artist team, venue and production crew.",
      "Planned the audience journey — arrival, access, seating and exit — alongside the technical schedule, not after it.",
    ],
    outcome:
      "The concert was delivered live at OVO Arena Wembley, with production, venue and front-of-house teams working to one coordinated plan.",
    tone: "violet",
  },
  {
    slug: "upper-room-uk",
    title: "Upper Room UK",
    venue: "OVO Arena Wembley",
    city: "London",
    date: "20 June 2026",
    role: "Project & Operations Management — Registration & Access Lead", // TO CONFIRM final role title
    disciplines: ["Registration & access", "Volunteer coordination", "Venue liaison", "Crowd movement"],
    summary:
      "Leading registration and access operations for a major gathering at OVO Arena Wembley, from volunteer teams to backstage access and hospitality.",
    overview:
      "Upper Room UK was staged at OVO Arena Wembley. Hannah's focus was the operational backbone of the day: how attendees registered, entered and moved through the venue, how volunteers were deployed, and how backstage access and hospitality were managed.",
    scale: [
      { label: "Venue", value: "OVO Arena Wembley" },
      { label: "Date", value: "20 June 2026" },
      { label: "Focus", value: "Registration, access & operations" },
      { label: "Teams", value: "Volunteers, venue, hospitality" },
    ],
    // TO CONFIRM: attendance/capacity used publicly, images and measurable outcomes.
    responsibilities: [
      "Designing and running registration and access management",
      "Recruiting, briefing and coordinating volunteer teams",
      "Liaising with venue management on operational requirements",
      "Managing backstage access and hospitality arrangements",
      "Planning crowd movement and operational flow across departments",
    ],
    challenge:
      "A large arena audience, multiple access levels and a volunteer-led workforce meant registration and access had to be simple for attendees and unambiguous for the teams running it.",
    approach: [
      "Mapped every attendee and guest type to a clear access route and credential.",
      "Structured volunteers into defined teams with named leads, briefings and escalation paths.",
      "Worked with the venue ahead of event day on entry points, movement and backstage controls.",
    ],
    outcome:
      "Registration, access and hospitality operated as one joined-up system across the arena, giving the programme team room to focus on the live experience.",
    tone: "gold",
  },
  {
    slug: "african-achievers-awards",
    title: "African Achievers Awards",
    venue: "London", // TO CONFIRM edition, date and venue
    city: "London",
    date: "",
    role: "Project Leader / Production Manager", // TO CONFIRM
    disciplines: ["Awards production", "Programme planning", "Guest experience", "Production scheduling"],
    summary:
      "Leading the production of an awards ceremony — programme, stage content, honouree experience, seating and show scheduling.",
    overview:
      "The African Achievers Awards celebrates excellence and achievement. An awards ceremony combines a tightly scripted programme with a high-profile guest list, so the production had to be precise on stage and gracious off it.",
    scale: [
      { label: "Location", value: "London" },
      { label: "Format", value: "Awards ceremony" },
      { label: "Role", value: "Project Leader / Production Manager" },
      { label: "Focus", value: "Programme & guest experience" },
    ],
    // TO CONFIRM: responsibilities, scale, images and outcomes.
    responsibilities: [
      "Planning the awards programme and running order",
      "Coordinating stage content and production scheduling",
      "Managing the honouree and guest experience",
      "Overseeing seating plans and operational coordination",
    ],
    challenge:
      "Awards nights run on precise timing: every category, presenter, walk-up and stage cue has to land in order, while honourees and guests are hosted to a high standard.",
    approach: [
      "Built a detailed running order linking every award to its presenter, content and stage cue.",
      "Planned seating around the programme so honourees could reach the stage quickly and gracefully.",
      "Aligned production, hosting and guest-facing teams on one schedule.",
    ],
    outcome:
      "An awards programme delivered as a coordinated production, with the honouree and guest experience treated as part of the show.",
    tone: "bronze",
  },
  {
    slug: "the-glory-conference",
    title: "The Glory Conference",
    venue: "Newcastle Arena", // TO CONFIRM official title, date and venue name
    city: "Newcastle",
    date: "",
    role: "Project Manager — Registration, Access & Volunteers",
    disciplines: ["Arena operations", "Access control", "Volunteer management", "Stakeholder coordination"],
    summary:
      "Project managing registration, access control and volunteers for an arena conference, including wristband processes and lounge operations.",
    overview:
      "The Glory Conference took place in an arena setting in Newcastle. As Project Manager for registration, access and volunteers, Hannah was responsible for the systems that got people in, got them to the right place, and kept the operation running throughout.",
    scale: [
      { label: "Venue", value: "Newcastle Arena" },
      { label: "Format", value: "Arena conference" },
      { label: "Role", value: "Project Manager" },
      { label: "Focus", value: "Registration, access & volunteers" },
    ],
    responsibilities: [
      "Owning registration and attendee check-in",
      "Designing wristband and access-control processes",
      "Recruiting, structuring and managing volunteer teams",
      "Planning lounge and operational spaces",
      "Coordinating with venue and internal stakeholders",
    ],
    challenge:
      "Access control only works when it is consistent. Several attendee categories, restricted areas and a volunteer workforce meant any gap in the process would show up at the door.",
    approach: [
      "Created a clear wristband and access matrix so every zone had defined permissions.",
      "Briefed volunteers by role, with simple reference materials for use on shift.",
      "Held regular touchpoints with venue and stakeholder teams through the build-up.",
    ],
    outcome:
      "A structured registration, access and volunteer operation that supported smooth arena delivery.",
    tone: "ember",
  },
  {
    slug: "hour-of-revival-manchester",
    title: "Hour of Revival",
    subtitle: "Manchester",
    venue: "Manchester",
    city: "Manchester",
    date: "August 2026",
    role: "Operations & Volunteer Coordination", // TO CONFIRM role title
    disciplines: ["Volunteer coordination", "Attendee communications", "Logistics", "Post-event reporting"],
    summary:
      "Coordinating volunteers, logistics and attendee communications — including international delegate tracking and post-event recommendations.",
    overview:
      "Hour of Revival Manchester welcomed attendees and international delegates. Hannah supported operations end to end: volunteers, communications, logistics and registration before the event, and structured reporting after it.",
    scale: [
      { label: "City", value: "Manchester" },
      { label: "Date", value: "August 2026" },
      { label: "Audience", value: "Including international delegates" },
      { label: "Focus", value: "Operations & volunteers" },
    ],
    responsibilities: [
      "Coordinating volunteer teams and schedules",
      "Managing attendee communications before and during the event",
      "Supporting logistics, registration and programme delivery",
      "Tracking international delegates",
      "Writing post-event reporting and recommendations",
    ],
    challenge:
      "With delegates travelling from overseas, communication and tracking had to be dependable well before doors opened — and the lessons had to be captured once it closed.",
    approach: [
      "Set up delegate tracking so arrivals and needs were visible to the operations team.",
      "Sent attendee communications at key points so people arrived informed.",
      "Captured observations throughout delivery to feed a structured post-event report.",
    ],
    outcome:
      "The programme was delivered with a documented set of recommendations to improve future editions.",
    tone: "teal",
  },
];

export type Article = {
  slug: string;
  title: string;
  dek: string;
  readingTime: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const behindTheProgramme = {
  title: "Behind the Programme",
  fullTitle: "Behind the Programme with Hannah Oyawoye",
  positioning: "The work people don't see behind the experiences they remember.",
  intro:
    "What the audience sees is only part of the story. Behind every successful programme are decisions, systems, people, rehearsals, timelines, contingency plans and countless moving parts.",
  purpose:
    "Practical lessons in production, operations, project management, leadership, volunteer coordination and audience experience.",
  upcoming: [
    "Why Good Events Are Built Before Event Day",
    "Five Things Every Volunteer Team Needs Before Doors Open",
    "Why Access Control Matters",
    "The Difference Between Planning an Event and Producing an Experience",
    "What Event Leaders Should Do After the Audience Goes Home",
  ],
};

export const articles: Article[] = [
  {
    slug: "what-the-audience-sees-is-never-the-whole-story",
    title: "What the Audience Sees Is Never the Whole Story",
    dek: "The two hours on stage are the visible part of weeks of decisions, systems and people. That hidden work decides how the night goes.",
    readingTime: "4 min read",
    body: [
      {
        paragraphs: [
          "When the lights go down and the first note lands, the audience experiences a moment. For those of us who produce live events, that moment is the visible end of a very long line of decisions.",
          "Someone decided which entrance each guest would use. Someone briefed the volunteer at the lift about who could go backstage. Someone confirmed the stage timings with the venue, the artist team and the crew. Someone planned what would happen if the headline act was delayed, if a queue built up at the wrong door, or if the rain came in early.",
          "None of that appears on the programme. All of it shapes the experience.",
        ],
      },
      {
        heading: "Experiences are designed, not discovered",
        paragraphs: [
          "Great live experiences are rarely accidental. The ease an attendee feels — arriving without confusion, finding their seat, knowing where to go next — is the result of systems someone built on purpose.",
          "Registration, access control, signage, stewarding and communication are not admin tasks around the event. They are the event, from the audience's point of view, until the programme starts. And they are the first thing people remember if they go wrong.",
        ],
      },
      {
        heading: "People make the plan real",
        paragraphs: [
          "A production plan is only as strong as the people carrying it out. On show day, a volunteer at a door is making decisions on behalf of the whole production. If they have been briefed clearly, know who to escalate to and understand why their role matters, the plan holds under pressure.",
          "That's why I spend as much time on briefings, team structure and communication lines as I do on schedules. Clear responsibilities make calm teams, and calm teams make a calm audience.",
        ],
      },
      {
        heading: "Preparation is what makes adaptability possible",
        paragraphs: [
          "Every live event changes on the day. The difference between a problem and a crisis is usually whether someone has already thought about it. Contingency plans, clear decision-makers and shared information let a team adapt quickly without losing control of the room.",
          "My background in project management taught me to treat risk as something you design for, not something you react to. In live production, that mindset turns the unexpected into a moment of calm problem-solving the audience never sees.",
        ],
      },
      {
        heading: "The story continues after the audience goes home",
        paragraphs: [
          "When the venue empties, the work isn't finished. The debrief — what worked, what didn't, what we learned — is how the next event gets better. Attendance, operational notes, feedback from teams and partners: these are the raw materials of improvement.",
          "Behind the Programme is where I'll share that side of the work: the thinking, systems and people behind the experiences audiences remember.",
        ],
      },
    ],
  },
];

/**
 * Working photographs for the Media page — backstage, rehearsals, venue set-up,
 * team briefings, stage environments and live audience moments.
 * TO PROVIDE: add entries as { src, alt, caption, project? } once images and permissions are confirmed.
 */
export const media: { src: string; alt: string; caption: string; project?: string }[] = [];

/** TO PROVIDE: at least three testimonials, with permission for quote, name, title and organisation. */
export const testimonials: { quote: string; name: string; title: string; organisation: string }[] = [];
