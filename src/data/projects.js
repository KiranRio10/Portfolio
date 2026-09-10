export const projectsData = [
  {
    id: "fitzone-pro",
    title: "FitZone Pro",
    subtitle: "Next-Gen 3D Fitness Platform with AI Strength Strategist",
    category: "Full-Stack & 3D WebGL",
    tagline: "Merging kinetic 3D biomechanics with a high-throughput Python FastAPI backend and automated macro calculations.",
    badge: "Flagship Full-Stack System",
    role: "Lead Full-Stack & 3D Architect",
    timeline: "2024",
    color: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.4)",
    github: "https://github.com/KiranRio10/fitzone-pro",
    live: "https://fitzone-pro.vercel.app",
    hasLocalSource: true,
    sandboxType: "fitzone",
    techStack: [
      "React.js",
      "Python (FastAPI)",
      "SQLite / SQLAlchemy",
      "Three.js / WebGL",
      "Tailwind CSS",
      "JWT Authentication",
      "Web Audio API",
      "Vercel"
    ],
    metrics: [
      { label: "Rendering Latency", value: "60 FPS", note: "Optimized WebGL loop" },
      { label: "API Response Time", value: "< 45ms", note: "Async FastAPI endpoints" },
      { label: "Modules Shipped", value: "8 Modules", note: "Tracker, AI, 3D Canvas, Store" }
    ],
    problem:
      "Modern lifters often juggle fragmented tools: generic note apps lack rest interval timers, traditional web trackers provide zero engaging kinetic feedback, and nutrition logs require tedious manual arithmetic. Lifters needed an all-in-one platform providing real-time workout tracking, audio interval cues, and dynamic macro intelligence without cumbersome navigation.",
    process: [
      "Architected a unified interactive frontend in React featuring an active workout session HUD with live rest countdowns and audio chimes.",
      "Embedded a Three.js 3D kinetic energy core and anatomical muscle selector allowing lifters to visually pinpoint targeted muscle heads.",
      "Engineered an asynchronous Python FastAPI REST backend powered by SQLAlchemy ORM and SQLite, establishing strict Pydantic data schemas.",
      "Built 'FitBot AI Virtual Strength Strategist' to compute automated caloric targets, macronutrient splits, and biomechanical posture cues."
    ],
    decisions: [
      {
        choice: "FastAPI over Django / Flask",
        rationale: "Leveraged ASGI asynchronous execution and automatic OpenAPI Swagger documentation to deliver sub-50ms query latency for workout telemetry."
      },
      {
        choice: "Vanilla Three.js Canvas vs Heavy External R3F Dependencies",
        rationale: "Direct WebGL scene management allowed bespoke rendering loops, zero dependency bloat, and guaranteed 60fps on mobile browsers."
      },
      {
        choice: "Web Audio API Procedural Chimes vs MP3 Assets",
        rationale: "Synthesized audio countdown frequencies client-side, eliminating network latency and ensuring zero audio buffering during workouts."
      }
    ],
    outcomes:
      "Engineered a production-ready ecosystem spanning authentication, live workout tracking, e-commerce cart simulation, and AI fitness coaching. Evaluated seamlessly with 1-click test credentials and zero runtime crashes.",
    keyFeatures: [
      "Distraction-free workout session mode with automated rest timer and celebratory confetti",
      "Three.js 3D kinetic rotating energy core reacting to cursor orientation",
      "Interactive 3D anatomical muscle visualizer for targeted exercise filtering",
      "FitBot AI assistant for instant macronutrient distribution and workout guidance",
      "JWT-secured authentication with role-based access for lifters and coaches"
    ],
    codeHighlight: {
      filename: "workout_timer_engine.js",
      language: "javascript",
      code: `// Procedural Web Audio Beep & Interval Management
const playAudioCue = (frequency = 880, duration = 0.15) => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};`
    }
  },
  {
    id: "weather-outfit-advisor",
    title: "Weather-Outfit-Advisor (SkyWear)",
    subtitle: "Meteorological Context Engine & Real-Time Outfit Advisor",
    category: "Contextual UI & API Engineering",
    tagline: "Translating raw atmospheric data into personalized, situational apparel intelligence.",
    badge: "Live Deployed Solution",
    role: "Frontend Engineer & Algorithm Designer",
    timeline: "2024",
    color: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.4)",
    github: "https://github.com/KiranRio10/Weather-Outfit-Advisor",
    live: "https://weather-outfit-advisor.vercel.app",
    hasLocalSource: true,
    sandboxType: "weather",
    techStack: [
      "JavaScript (ES6+)",
      "HTML5 / CSS3 Glassmorphism",
      "OpenWeather Map API",
      "Browser Geolocation API",
      "Web Audio Soundscapes",
      "Vercel Deployment"
    ],
    metrics: [
      { label: "Bundle Footprint", value: "< 80 KB", note: "Zero heavyweight frameworks" },
      { label: "Location Detection", value: "Instant", note: "Auto GPS with fallback" },
      { label: "Outfit Matrix", value: "18+ Scenarios", note: "Temp, rain, wind, UV" }
    ],
    problem:
      "Most weather apps inundate users with raw numbers (e.g. '14°C, 82% humidity, 1013 hPa') without answering the user's primary daily question: 'What should I wear today?'. Users had to guess whether they needed a thermal layer, a breathable cotton shirt, or a waterproof jacket.",
    process: [
      "Integrated the HTML5 Geolocation API with graceful IP-fallback and global city search autocomplete.",
      "Connected live OpenWeather endpoints to capture temperature, feels-like index, humidity, wind velocity, and precipitation conditions.",
      "Designed a comprehensive rule-based outfit recommendation matrix evaluating weather thresholds and lifestyle contexts (commute, casual, rain protection).",
      "Crafted a responsive glassmorphic UI featuring atmospheric dynamic backgrounds and procedural ambient weather soundscapes."
    ],
    decisions: [
      {
        choice: "Vanilla Modern JavaScript over Heavy SPA Framework",
        rationale: "Kept total client bundle size under 80KB, ensuring sub-second First Contentful Paint even on throttled 3G cellular connections."
      },
      {
        choice: "'Feels-Like' Thermal Index over Raw Temperature",
        rationale: "Calculated wind chill and humidity adjustments to prevent inaccurate recommendations during cold windy or hot muggy days."
      },
      {
        choice: "Cached API Responses via Local Storage",
        rationale: "Prevented duplicate API hits on repeated searches and minimized third-party rate limiting."
      }
    ],
    outcomes:
      "Successfully deployed to Vercel with automated continuous delivery. Users can open the app and instantly receive actionable clothing guidance for the day within 3 seconds of page load.",
    keyFeatures: [
      "1-Click GPS auto-detection with fallback manual city search and instant suggestions",
      "Dynamic weather-to-clothing recommendation matrix with garment breakdowns",
      "Atmospheric glassmorphism with dynamic color shifts reflecting time of day",
      "Ambient audio soundscape generator creating immersive rain and wind white noise",
      "Metric (°C) and Imperial (°F) unit conversion with persistent state"
    ],
    codeHighlight: {
      filename: "outfit_matrix_engine.js",
      language: "javascript",
      code: `// Multi-Factor Weather-to-Apparel Logic
export function resolveOutfitAdvice(tempC, weatherCondition, windSpeed) {
  let layers = [];
  if (tempC < 5) layers.push("Heavy thermal coat", "Wool beanie", "Insulated gloves");
  else if (tempC < 15) layers.push("Fleece jacket or warm sweater", "Denim jeans", "Light scarf");
  else if (tempC < 25) layers.push("Breathable cotton shirt", "Chinos or pants", "Light sneakers");
  else layers.push("Lightweight t-shirt", "Linen shorts", "UV sunglasses");
  
  if (weatherCondition.toLowerCase().includes("rain")) {
    layers.push("Waterproof umbrella", "Slip-resistant footwear");
  }
  return layers;
}`
    }
  },
  {
    id: "khaata-book",
    title: "Khaata Book",
    subtitle: "Digital Credit-Ledger & Repayment Engine",
    category: "Financial State Management & UX",
    tagline: "Replacing paper debt ledgers with an atomic, searchable, offline-first digital interface.",
    badge: "High-Utility Financial Tool",
    role: "Frontend Architect",
    timeline: "2023",
    color: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    github: "https://github.com/KiranRio10/khaata-book",
    live: "https://khaata-book-kiran.vercel.app",
    hasLocalSource: false,
    sandboxType: "khaata",
    techStack: [
      "React.js",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "React Router DOM",
      "React Context API",
      "Vite",
      "LocalStorage Persistence"
    ],
    metrics: [
      { label: "Data Persistence", value: "100% Offline", note: "Zero database downtime" },
      { label: "Search Latency", value: "0ms", note: "Instant in-memory indexing" },
      { label: "Balance Reliability", value: "100%", note: "Atomic double-entry math" }
    ],
    problem:
      "Small business owners and individuals routinely rely on fragile physical paper ledgers to keep track of loans, credit extensions, and customer repayments. Pages get misplaced, calculations suffer human error, and identifying overdue balances across dozens of entries requires painful manual scanning.",
    process: [
      "Designed a clean, intuitive double-entry credit ledger UI using Tailwind CSS with clear visual distinction for debit (red) and credit (green).",
      "Implemented central state management using React Context API and custom reducer hooks to handle atomic CRUD operations.",
      "Engineered real-time fuzzy customer search and quick status filters for 'Overdue', 'Settled', and 'High Balance'.",
      "Constructed a reliable LocalStorage schema serialization layer that preserves data across browser reloads with export capabilities."
    ],
    decisions: [
      {
        choice: "Client-Side LocalStorage vs Heavy Cloud DB",
        rationale: "Enabled instant zero-login offline usability for shopkeepers without recurring hosting fees or network connectivity barriers."
      },
      {
        choice: "Context API + useReducer over Redux Toolkit",
        rationale: "Avoided unnecessary boilerplate while guaranteeing predictable state transitions for monetary calculations."
      },
      {
        choice: "Overdue Tagging via ISO Timestamp Difference",
        rationale: "Automated flagging of customers with balances untouched for >30 days to accelerate debt recovery."
      }
    ],
    outcomes:
      "Eliminated arithmetic mistakes and manual record searching. Ledger balance updates, customer additions, and repayment deductions reflect in real time with complete data privacy.",
    keyFeatures: [
      "Comprehensive credit and debit tracking with running net balance indicator",
      "Real-time instant customer name and phone number search filtering",
      "Overdue balance highlight system notifying owners of delinquent accounts",
      "Atomic LocalStorage data persistence surviving browser restarts",
      "Mobile-optimized touch layout for quick counter-top transaction logging"
    ],
    codeHighlight: {
      filename: "ledger_context_reducer.js",
      language: "javascript",
      code: `// Atomic Ledger Transaction State Reducer
export function ledgerReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const { customerId, type, amount, note, date } = action.payload;
      const numAmount = parseFloat(amount);
      const delta = type === 'GIVE_CREDIT' ? numAmount : -numAmount;
      return {
        ...state,
        customers: state.customers.map(c => 
          c.id === customerId ? { ...c, balance: c.balance + delta, lastUpdated: date } : c
        ),
        transactions: [action.payload, ...state.transactions]
      };
    }
    default: return state;
  }
}`
    }
  }
]
