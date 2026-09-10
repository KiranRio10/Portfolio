import json
import logging
from sqlalchemy.orm import Session
from app.models import Project, Skill

logger = logging.getLogger("portfolio_seed")

PROJECTS_DATA = [
    {
        "id": "fitzone-pro",
        "title": "FitZone Pro",
        "subtitle": "Next-Gen 3D Fitness Platform with AI Strength Strategist",
        "category": "Full-Stack & 3D WebGL",
        "tagline": "Merging kinetic 3D biomechanics with a high-throughput Python FastAPI backend and automated macro calculations.",
        "badge": "Flagship Full-Stack System",
        "role": "Lead Full-Stack & 3D Architect",
        "timeline": "2024",
        "color": "#06b6d4",
        "github": "https://github.com/KiranRio10/fitzone-pro",
        "live": "https://fitzone-pro.vercel.app",
        "sandbox_type": "fitzone",
        "tech_stack": [
            "React.js",
            "Python (FastAPI)",
            "SQLite / PostgreSQL",
            "Three.js / WebGL",
            "Tailwind CSS",
            "JWT Authentication",
            "Web Audio API",
            "Vercel"
        ],
        "metrics": [
            {"label": "Rendering Latency", "value": "60 FPS", "note": "Optimized WebGL loop"},
            {"label": "API Response Time", "value": "< 45ms", "note": "Async FastAPI endpoints"},
            {"label": "Modules Shipped", "value": "8 Modules", "note": "Tracker, AI, 3D Canvas, Store"}
        ],
        "problem": "Modern lifters often juggle fragmented tools: generic note apps lack rest interval timers, traditional web trackers provide zero engaging kinetic feedback, and nutrition logs require tedious manual arithmetic. Lifters needed an all-in-one platform providing real-time workout tracking, audio interval cues, and dynamic macro intelligence without cumbersome navigation.",
        "process": [
            "Architected a unified interactive frontend in React featuring an active workout session HUD with live rest countdowns and audio chimes.",
            "Embedded a Three.js 3D kinetic energy core and anatomical muscle selector allowing lifters to visually pinpoint targeted muscle heads.",
            "Engineered an asynchronous Python FastAPI REST backend powered by SQLAlchemy ORM and relational database schemas.",
            "Built 'FitBot AI Virtual Strength Strategist' to compute automated caloric targets, macronutrient splits, and biomechanical posture cues."
        ],
        "decisions": [
            {
                "choice": "FastAPI over Django / Flask",
                "rationale": "Leveraged ASGI asynchronous execution and automatic OpenAPI Swagger documentation to deliver sub-50ms query latency for workout telemetry."
            },
            {
                "choice": "Direct Three.js Canvas vs Heavy External R3F Dependencies",
                "rationale": "Direct WebGL scene management allowed bespoke rendering loops, zero dependency bloat, and guaranteed 60fps on mobile browsers."
            },
            {
                "choice": "Web Audio API Procedural Chimes vs MP3 Assets",
                "rationale": "Synthesized audio countdown frequencies client-side, eliminating network latency and ensuring zero audio buffering during workouts."
            }
        ],
        "outcomes": "Engineered a production-ready ecosystem spanning authentication, live workout tracking, e-commerce cart simulation, and AI fitness coaching. Evaluated seamlessly with 1-click test credentials and zero runtime crashes.",
        "key_features": [
            "Distraction-free workout session mode with automated rest timer and celebratory confetti",
            "Three.js 3D kinetic rotating energy core reacting to cursor orientation",
            "Interactive 3D anatomical muscle visualizer for targeted exercise filtering",
            "FitBot AI assistant for instant macronutrient distribution and workout guidance",
            "JWT-secured authentication with role-based access for lifters and coaches"
        ],
        "code_highlight": {
            "filename": "workout_timer_engine.js",
            "language": "javascript",
            "code": "// Procedural Web Audio Beep & Interval Management\nconst playAudioCue = (frequency = 880, duration = 0.15) => {\n  const ctx = new (window.AudioContext || window.webkitAudioContext)();\n  const osc = ctx.createOscillator();\n  const gain = ctx.createGain();\n  osc.type = 'sine';\n  osc.frequency.setValueAtTime(frequency, ctx.currentTime);\n  gain.gain.setValueAtTime(0.3, ctx.currentTime);\n  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);\n  osc.connect(gain);\n  gain.connect(ctx.destination);\n  osc.start();\n  osc.stop(ctx.currentTime + duration);\n};"
        }
    },
    {
        "id": "weather-outfit-advisor",
        "title": "Weather-Outfit-Advisor (SkyWear)",
        "subtitle": "Meteorological Context Engine & Real-Time Outfit Advisor",
        "category": "Contextual UI & API Engineering",
        "tagline": "Translating raw atmospheric data into personalized, situational apparel intelligence.",
        "badge": "Live Deployed Solution",
        "role": "Frontend Engineer & Algorithm Designer",
        "timeline": "2024",
        "color": "#8b5cf6",
        "github": "https://github.com/KiranRio10/Weather-Outfit-Advisor",
        "live": "https://weather-outfit-advisor.vercel.app",
        "sandbox_type": "weather",
        "tech_stack": [
            "JavaScript (ES6+)",
            "HTML5 / CSS3 Glassmorphism",
            "OpenWeather Map API",
            "Browser Geolocation API",
            "Web Audio Soundscapes",
            "Vercel Deployment"
        ],
        "metrics": [
            {"label": "Bundle Footprint", "value": "< 80 KB", "note": "Zero heavyweight frameworks"},
            {"label": "Location Detection", "value": "Instant", "note": "Auto GPS with fallback"},
            {"label": "Outfit Matrix", "value": "18+ Scenarios", "note": "Temp, rain, wind, UV"}
        ],
        "problem": "Most weather apps inundate users with raw numbers (e.g. '14°C, 82% humidity') without answering the user's primary daily question: 'What should I wear today?'. Users had to guess whether they needed a thermal layer, a breathable cotton shirt, or a waterproof jacket.",
        "process": [
            "Integrated the HTML5 Geolocation API with graceful IP-fallback and global city search autocomplete.",
            "Connected live OpenWeather endpoints to capture temperature, feels-like index, humidity, wind velocity, and precipitation conditions.",
            "Designed a comprehensive rule-based outfit recommendation matrix evaluating weather thresholds and lifestyle contexts.",
            "Crafted a responsive glassmorphic UI featuring atmospheric dynamic backgrounds and procedural ambient weather soundscapes."
        ],
        "decisions": [
            {
                "choice": "Vanilla Modern JavaScript over Heavy SPA Framework",
                "rationale": "Kept total client bundle size under 80KB, ensuring sub-second First Contentful Paint even on throttled cellular connections."
            },
            {
                "choice": "'Feels-Like' Thermal Index over Raw Temperature",
                "rationale": "Calculated wind chill and humidity adjustments to prevent inaccurate recommendations during cold windy or hot muggy days."
            },
            {
                "choice": "Cached API Responses via Local Storage",
                "rationale": "Prevented duplicate API hits on repeated searches and minimized third-party rate limiting."
            }
        ],
        "outcomes": "Successfully deployed to Vercel with automated continuous delivery. Users can open the app and instantly receive actionable clothing guidance for the day within 3 seconds of page load.",
        "key_features": [
            "1-Click GPS auto-detection with fallback manual city search and instant suggestions",
            "Dynamic weather-to-clothing recommendation matrix with garment breakdowns",
            "Atmospheric glassmorphism with dynamic color shifts reflecting time of day",
            "Ambient audio soundscape generator creating immersive rain and wind white noise",
            "Metric (°C) and Imperial (°F) unit conversion with persistent state"
        ],
        "code_highlight": {
            "filename": "outfit_matrix_engine.js",
            "language": "javascript",
            "code": "// Multi-Factor Weather-to-Apparel Logic\nexport function resolveOutfitAdvice(tempC, weatherCondition, windSpeed) {\n  let layers = [];\n  if (tempC < 5) layers.push('Heavy thermal coat', 'Wool beanie', 'Insulated gloves');\n  else if (tempC < 15) layers.push('Fleece jacket or warm sweater', 'Denim jeans');\n  else if (tempC < 25) layers.push('Breathable cotton shirt', 'Chinos or pants');\n  else layers.push('Lightweight t-shirt', 'Linen shorts', 'UV sunglasses');\n  if (weatherCondition.toLowerCase().includes('rain')) {\n    layers.push('Waterproof umbrella', 'Slip-resistant footwear');\n  }\n  return layers;\n}"
        }
    },
    {
        "id": "khaata-book",
        "title": "Khaata Book",
        "subtitle": "Digital Credit-Ledger & Repayment Engine",
        "category": "Financial State Management & UX",
        "tagline": "Replacing paper debt ledgers with an atomic, searchable, offline-first digital interface.",
        "badge": "High-Utility Financial Tool",
        "role": "Frontend Architect",
        "timeline": "2023",
        "color": "#10b981",
        "github": "https://github.com/KiranRio10/khaata-book",
        "live": "https://khaata-book-kiran.vercel.app",
        "sandbox_type": "khaata",
        "tech_stack": [
            "React.js",
            "JavaScript (ES6+)",
            "Tailwind CSS",
            "React Router DOM",
            "React Context API",
            "Vite",
            "LocalStorage Persistence"
        ],
        "metrics": [
            {"label": "Data Persistence", "value": "100% Offline", "note": "Zero database downtime"},
            {"label": "Search Latency", "value": "0ms", "note": "Instant in-memory indexing"},
            {"label": "Balance Reliability", "value": "100%", "note": "Atomic double-entry math"}
        ],
        "problem": "Small business owners and individuals routinely rely on fragile physical paper ledgers to keep track of loans, credit extensions, and customer repayments. Pages get misplaced, calculations suffer human error, and identifying overdue balances across dozens of entries requires painful manual scanning.",
        "process": [
            "Designed a clean, intuitive double-entry credit ledger UI using Tailwind CSS with clear visual distinction for debit (red) and credit (green).",
            "Implemented central state management using React Context API and custom reducer hooks to handle atomic CRUD operations.",
            "Engineered real-time fuzzy customer search and quick status filters for 'Overdue', 'Settled', and 'High Balance'.",
            "Constructed a reliable LocalStorage schema serialization layer that preserves data across browser reloads."
        ],
        "decisions": [
            {
                "choice": "Client-Side LocalStorage vs Heavy Cloud DB",
                "rationale": "Enabled instant zero-login offline usability for shopkeepers without recurring hosting fees or network connectivity barriers."
            },
            {
                "choice": "Context API + useReducer over Redux Toolkit",
                "rationale": "Avoided unnecessary boilerplate while guaranteeing predictable state transitions for monetary calculations."
            },
            {
                "choice": "Overdue Tagging via ISO Timestamp Difference",
                "rationale": "Automated flagging of customers with balances untouched for >30 days to accelerate debt recovery."
            }
        ],
        "outcomes": "Eliminated arithmetic mistakes and manual record searching. Ledger balance updates, customer additions, and repayment deductions reflect in real time with complete data privacy.",
        "key_features": [
            "Comprehensive credit and debit tracking with running net balance indicator",
            "Real-time instant customer name and phone number search filtering",
            "Overdue balance highlight system notifying owners of delinquent accounts",
            "Atomic LocalStorage data persistence surviving browser restarts",
            "Mobile-optimized touch layout for quick counter-top transaction logging"
        ],
        "code_highlight": {
            "filename": "ledger_context_reducer.js",
            "language": "javascript",
            "code": "// Atomic Ledger Transaction State Reducer\nexport function ledgerReducer(state, action) {\n  switch (action.type) {\n    case 'ADD_TRANSACTION': {\n      const { customerId, type, amount, note, date } = action.payload;\n      const numAmount = parseFloat(amount);\n      const delta = type === 'GIVE_CREDIT' ? numAmount : -numAmount;\n      return {\n        ...state,\n        customers: state.customers.map(c => \n          c.id === customerId ? { ...c, balance: c.balance + delta, lastUpdated: date } : c\n        ),\n        transactions: [action.payload, ...state.transactions]\n      };\n    }\n    default: return state;\n  }\n}"
        }
    }
]

SKILLS_SEED = [
    {"category": "AI & Machine Learning", "name": "Python", "level": 90, "projects": ["fitzone-pro", "academic-aiml"]},
    {"category": "AI & Machine Learning", "name": "Machine Learning Concepts", "level": 85, "projects": ["academic-aiml"]},
    {"category": "AI & Machine Learning", "name": "Neural Networks & Deep Learning", "level": 80, "projects": ["academic-aiml"]},
    {"category": "AI & Machine Learning", "name": "Data Structures & Algorithms", "level": 85, "projects": ["academic-aiml", "fitzone-pro"]},
    {"category": "AI & Machine Learning", "name": "AI Integration & Prompt Systems", "level": 82, "projects": ["fitzone-pro"]},

    {"category": "Full-Stack & Backend Systems", "name": "Python (FastAPI)", "level": 88, "projects": ["fitzone-pro"]},
    {"category": "Full-Stack & Backend Systems", "name": "PostgreSQL & SQLite (SQLAlchemy)", "level": 85, "projects": ["fitzone-pro"]},
    {"category": "Full-Stack & Backend Systems", "name": "JWT Authentication & Security", "level": 82, "projects": ["fitzone-pro"]},
    {"category": "Full-Stack & Backend Systems", "name": "RESTful API Architecture", "level": 90, "projects": ["fitzone-pro", "weather-outfit-advisor"]},

    {"category": "Modern Frontend & Creative Tech", "name": "React.js", "level": 92, "projects": ["fitzone-pro", "khaata-book"]},
    {"category": "Modern Frontend & Creative Tech", "name": "JavaScript (ES6+)", "level": 90, "projects": ["fitzone-pro", "weather-outfit-advisor", "khaata-book"]},
    {"category": "Modern Frontend & Creative Tech", "name": "Tailwind CSS", "level": 95, "projects": ["fitzone-pro", "khaata-book"]},

    {"category": "Dev Tools, Cloud & Engineering", "name": "Git & GitHub Version Control", "level": 90, "projects": ["all"]},
    {"category": "Dev Tools, Cloud & Engineering", "name": "Visual Studio Code", "level": 92, "projects": ["all"]},
    {"category": "Dev Tools, Cloud & Engineering", "name": "Vite & Build Tooling", "level": 88, "projects": ["fitzone-pro", "khaata-book"]},
    {"category": "Dev Tools, Cloud & Engineering", "name": "Vercel Deployment", "level": 85, "projects": ["weather-outfit-advisor", "fitzone-pro", "khaata-book"]}
]

def seed_database(db: Session):
    # Check if projects exist
    if db.query(Project).count() == 0:
        logger.info("Seeding projects table...")
        for p in PROJECTS_DATA:
            proj = Project(
                id=p["id"],
                title=p["title"],
                subtitle=p["subtitle"],
                category=p["category"],
                tagline=p["tagline"],
                badge=p["badge"],
                role=p["role"],
                timeline=p["timeline"],
                color=p["color"],
                github=p["github"],
                live=p["live"],
                sandbox_type=p["sandbox_type"],
                tech_stack_json=json.dumps(p["tech_stack"]),
                metrics_json=json.dumps(p["metrics"]),
                problem=p["problem"],
                process_json=json.dumps(p["process"]),
                decisions_json=json.dumps(p["decisions"]),
                outcomes=p["outcomes"],
                key_features_json=json.dumps(p["key_features"]),
                code_highlight_json=json.dumps(p["code_highlight"])
            )
            db.add(proj)
        db.commit()
        logger.info(f"Seeded {len(PROJECTS_DATA)} projects successfully.")

    # Check if skills exist
    if db.query(Skill).count() == 0:
        logger.info("Seeding skills table...")
        for s in SKILLS_SEED:
            skill = Skill(
                category=s["category"],
                name=s["name"],
                level=s["level"],
                projects_json=json.dumps(s["projects"])
            )
            db.add(skill)
        db.commit()
        logger.info(f"Seeded {len(SKILLS_SEED)} skills successfully.")
