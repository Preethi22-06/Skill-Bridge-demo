import React, { useState, useMemo } from "react";
import {
  Home, User, FileText, Target, Search, Compass, Sparkles, Route as RouteIcon,
  TrendingUp, Award, Bell, Briefcase, Users, LayoutDashboard, CheckCircle2,
  AlertTriangle, XCircle, Upload, ArrowRight, LogOut, Menu, X, ChevronRight,
  MapPin, Clock, DollarSign, Filter, GraduationCap, BadgeCheck, PlayCircle,
  Lock, Rocket, ClipboardList, PlusCircle, ChevronLeft, Zap
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, Legend
} from "recharts";

/* ============================== DESIGN TOKENS ==============================
   Palette: ink #0F1222, indigo #4F46E5, violet #7C3AED, cyan #06B6D4
   success #16A34A, warning #D97706, danger #DC2626, canvas #F6F7FB
   Signature motif: "Orbit Score" — concentric competency rings, echoing the
   product's core idea of mapping skills in overlapping orbits around a role.
============================================================================ */

const COLORS = {
  ink: "#0F1222",
  indigo: "#4F46E5",
  violet: "#7C3AED",
  cyan: "#06B6D4",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
};

/* ============================== MOCK DATA ============================== */

const CAREER_ROLES = [
  "Data Scientist", "Data Analyst", "AI Engineer", "ML Engineer",
  "Software Developer", "Full Stack Developer", "Backend Developer",
  "Frontend Developer", "Business Analyst", "Cloud Engineer", "Cybersecurity Analyst",
];

const INITIAL_SKILLS = {
  Python: { current: 82, required: 80 },
  SQL: { current: 70, required: 85 },
  "Machine Learning": { current: 45, required: 85 },
  Statistics: { current: 40, required: 80 },
  "Data Visualization": { current: 55, required: 75 },
  Communication: { current: 78, required: 70 },
};

const RESUME_SKILLS = ["Python", "SQL", "Java", "Machine Learning", "Statistics", "React", "Git", "Data Visualization"];

const JOBS = [
  { id: 1, title: "Data Scientist", company: "TechNova", location: "Bangalore", type: "Full-time", exp: "0-2 yrs", salary: "₹8-12 LPA",
    required: { Python: 80, SQL: 85, "Machine Learning": 85, Statistics: 80 } },
  { id: 2, title: "Data Analyst", company: "DataSphere", location: "Hyderabad", type: "Full-time", exp: "0-1 yrs", salary: "₹5-8 LPA",
    required: { Python: 65, SQL: 80, "Data Visualization": 75, Communication: 70 } },
  { id: 3, title: "Machine Learning Engineer", company: "AI Labs", location: "Chennai", type: "Full-time", exp: "1-3 yrs", salary: "₹10-15 LPA",
    required: { Python: 85, "Machine Learning": 90, Statistics: 75, SQL: 60 } },
  { id: 4, title: "Software Developer", company: "CloudTech", location: "Pune", type: "Full-time", exp: "0-2 yrs", salary: "₹6-9 LPA",
    required: { Python: 75, SQL: 55, Communication: 70 } },
  { id: 5, title: "AI Engineer", company: "NeuralWorks", location: "Bangalore", type: "Full-time", exp: "1-2 yrs", salary: "₹9-14 LPA",
    required: { Python: 85, "Machine Learning": 85, Statistics: 70 } },
  { id: 6, title: "Business Analyst", company: "Finlytics", location: "Mumbai", type: "Full-time", exp: "0-2 yrs", salary: "₹6-10 LPA",
    required: { SQL: 75, "Data Visualization": 70, Communication: 85 } },
  { id: 7, title: "Backend Developer", company: "ServerStack", location: "Remote", type: "Full-time", exp: "1-3 yrs", salary: "₹8-12 LPA",
    required: { Python: 80, SQL: 70, Communication: 55 } },
  { id: 8, title: "Data Scientist", company: "Quantify Labs", location: "Remote", type: "Full-time", exp: "0-1 yrs", salary: "₹7-11 LPA",
    required: { Python: 75, Statistics: 85, "Machine Learning": 80, SQL: 70 } },
  { id: 9, title: "Full Stack Developer", company: "PixelForge", location: "Chennai", type: "Full-time", exp: "0-2 yrs", salary: "₹6-9 LPA",
    required: { Python: 60, SQL: 60, Communication: 65 } },
  { id: 10, title: "Cloud Engineer", company: "SkyOps", location: "Hyderabad", type: "Full-time", exp: "1-3 yrs", salary: "₹9-13 LPA",
    required: { Python: 65, SQL: 60, Communication: 60 } },
];

const INITIAL_COURSES = [
  { id: "c1", name: "Statistics for Data Science", skill: "Statistics", provider: "Coursera", difficulty: "Intermediate", duration: "4 weeks", delta: 25, status: "not-started", stage: "current" },
  { id: "c2", name: "Machine Learning Fundamentals", skill: "Machine Learning", provider: "edX", difficulty: "Intermediate", duration: "6 weeks", delta: 25, status: "not-started", stage: "current" },
  { id: "c3", name: "Advanced SQL", skill: "SQL", provider: "DataCamp", difficulty: "Intermediate", duration: "3 weeks", delta: 20, status: "not-started", stage: "upcoming" },
  { id: "c4", name: "Python for Data Analysis", skill: "Python", provider: "Udemy", difficulty: "Beginner", duration: "2 weeks", delta: 10, status: "completed", stage: "foundation" },
  { id: "c5", name: "Data Visualization", skill: "Data Visualization", provider: "Coursera", difficulty: "Beginner", duration: "3 weeks", delta: 20, status: "not-started", stage: "upcoming" },
  { id: "c6", name: "Deep Learning Fundamentals", skill: "Machine Learning", provider: "edX", difficulty: "Advanced", duration: "8 weeks", delta: 15, status: "not-started", stage: "upcoming" },
  { id: "c7", name: "SQL Basics", skill: "SQL", provider: "DataCamp", difficulty: "Beginner", duration: "2 weeks", delta: 5, status: "completed", stage: "foundation" },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: "Your resume analysis is complete.", time: "2h ago", type: "info" },
  { id: 2, text: "New job match: Data Scientist – 72% at TechNova.", time: "2h ago", type: "match" },
  { id: 3, text: "Statistics is your highest-priority skill gap.", time: "1h ago", type: "warning" },
  { id: 4, text: "Complete Machine Learning Fundamentals to improve your job readiness.", time: "1h ago", type: "info" },
];

const PROGRESS_HISTORY = [
  { month: "Month 1", competency: 52 },
  { month: "Month 2", competency: 64 },
  { month: "Month 3", competency: 68 },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", hours: 1.5 }, { day: "Tue", hours: 2 }, { day: "Wed", hours: 0.5 },
  { day: "Thu", hours: 2.5 }, { day: "Fri", hours: 1 }, { day: "Sat", hours: 3 }, { day: "Sun", hours: 1.5 },
];

const CERTIFICATES = [
  { id: "CERT-2026-0091", course: "Python for Data Analysis", skill: "Python", date: "12 Jun 2026" },
  { id: "CERT-2026-0104", course: "SQL Basics", skill: "SQL", date: "28 Jun 2026" },
];

/* ============================== HELPERS ============================== */

function statusFor(current, required) {
  if (current >= required) return { label: "Strong", color: COLORS.success, Icon: CheckCircle2 };
  if (current >= required - 20) return { label: "Moderate Gap", color: COLORS.warning, Icon: AlertTriangle };
  return { label: "Critical Gap", color: COLORS.danger, Icon: XCircle };
}

function computeMatch(required, skills) {
  const keys = Object.keys(required);
  if (keys.length === 0) return 0;
  const total = keys.reduce((sum, k) => {
    const cur = skills[k]?.current ?? 0;
    const req = required[k];
    return sum + Math.min(100, (cur / req) * 100);
  }, 0);
  return Math.round(total / keys.length);
}

function overallCompetency(skills) {
  const vals = Object.values(skills).map((s) => s.current);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

/* ============================== SMALL UI PRIMITIVES ============================== */

function OrbitScore({ value, size = 96, stroke = 9, label, color = COLORS.indigo }) {
  const r1 = size / 2 - stroke;
  const r2 = r1 - stroke - 4;
  const c1 = 2 * Math.PI * r1;
  const c2 = 2 * Math.PI * r2;
  const off1 = c1 - (Math.min(value, 100) / 100) * c1;
  const off2 = c2 - (Math.min(value, 100) / 100) * c2 * 0.7;
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r1} fill="none" stroke="#E7E8F2" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r2} fill="none" stroke="#EEF0FA" strokeWidth={stroke - 2} />
        <circle
          cx={size / 2} cy={size / 2} r={r1} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c1} strokeDashoffset={off1} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r2} fill="none" stroke={COLORS.cyan} strokeWidth={stroke - 2}
          strokeDasharray={c2} strokeDashoffset={off2} strokeLinecap="round" opacity={0.7}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="47%" textAnchor="middle" fontSize={size * 0.24} fontWeight="700" fill={COLORS.ink}>{value}%</text>
        {label && <text x="50%" y="65%" textAnchor="middle" fontSize={size * 0.09} fill="#6B7280">{label}</text>}
      </svg>
    </div>
  );
}

function Badge({ children, tone = "indigo" }) {
  const map = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    slate: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${map[tone]}`}>{children}</span>;
}

function ProgressBar({ value, max = 100, color = COLORS.indigo, height = 8 }) {
  return (
    <div className="w-full bg-slate-100 rounded-full overflow-hidden" style={{ height }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (value / max) * 100)}%`, background: color }} />
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>{children}</div>;
}

/* ============================== LANDING PAGE ============================== */

function Landing({ onGetStarted, onExploreJobs }) {
  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#0F1222]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <Target size={17} className="text-white" />
          </div>
          SkillMap <span className="text-indigo-600">AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <a href="#how" className="hover:text-indigo-600">How It Works</a>
          <a href="#roles" className="hover:text-indigo-600">Career Roles</a>
          <a href="#testimonials" className="hover:text-indigo-600">Testimonials</a>
        </div>
        <div className="flex gap-3">
          <button onClick={onGetStarted} className="text-sm font-medium text-slate-700 px-4 py-2 hover:text-indigo-600">Log In</button>
          <button onClick={onGetStarted} className="text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700">Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-7xl mx-auto px-8 pt-10 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge tone="violet"><Sparkles size={12} /> AI-Driven Competency Mapping</Badge>
          <h1 className="text-5xl font-extrabold tracking-tight mt-5 leading-[1.08]">
            Know Your Skills.<br />Discover Your Gaps.<br /><span className="text-indigo-600">Get Job Ready.</span>
          </h1>
          <p className="text-slate-600 mt-6 text-lg leading-relaxed max-w-lg">
            AI-driven competency mapping that analyzes your resume, matches you with relevant jobs,
            identifies your skill gaps and creates a personalized learning path to improve your career readiness.
          </p>
          <div className="flex gap-4 mt-8">
            <button onClick={onGetStarted} className="bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-200">
              Get Started <ArrowRight size={16} />
            </button>
            <button onClick={onExploreJobs} className="bg-white border border-slate-200 font-semibold px-6 py-3.5 rounded-xl hover:border-indigo-300 flex items-center gap-2">
              Explore Jobs
            </button>
          </div>
        </div>

        <Card className="p-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-100 rounded-full blur-2xl" />
          <div className="flex items-center justify-between mb-5">
            <div className="font-semibold text-sm text-slate-500">Job Seeker Dashboard</div>
            <Badge tone="success">Live Preview</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center gap-5 bg-slate-50 rounded-xl p-4">
              <OrbitScore value={68} size={84} label="Job Match" />
              <div>
                <div className="text-sm text-slate-500">Data Scientist Readiness</div>
                <div className="text-2xl font-bold">68% Match</div>
                <div className="text-xs text-green-600 font-medium mt-1">↑ 12% since last month</div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-xs text-slate-500 mb-2">Competency Score</div>
              <div className="text-xl font-bold">68%</div>
              <ProgressBar value={68} color={COLORS.indigo} />
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-xs text-slate-500 mb-2">Critical Skill Gap</div>
              <div className="text-sm font-semibold text-red-600">Statistics</div>
              <div className="text-xs text-slate-500 mt-1">40% → 80% required</div>
            </div>
            <div className="col-span-2 bg-slate-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">Recommended Course</div>
                <div className="text-sm font-semibold">Statistics for Data Science</div>
              </div>
              <Badge tone="indigo">96% AI Match</Badge>
            </div>
          </div>
        </Card>
      </header>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-center">Everything you need to become job-ready</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            { icon: FileText, title: "AI Resume Analysis", desc: "Upload your resume and let AI extract skills, projects, education and certifications automatically." },
            { icon: Target, title: "Competency Mapping", desc: "See exactly where you stand across the skills that matter, mapped against real role requirements." },
            { icon: Briefcase, title: "Smart Job Matching", desc: "Get a Job Readiness Score for every listing, with your strongest skills and gaps clearly shown." },
            { icon: RouteIcon, title: "Personalized Learning Path", desc: "Courses recommended specifically for your skill gaps — not generic catalogues." },
            { icon: TrendingUp, title: "Live Score Updates", desc: "Complete a course and watch your competency and job match scores recalculate instantly." },
            { icon: Award, title: "Verified Certificates", desc: "Earn shareable certificates as you close skill gaps and complete your learning path." },
          ].map((f, i) => (
            <Card key={i} className="p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-indigo-600" />
              </div>
              <div className="font-semibold mb-1.5">{f.title}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-center">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-10 text-sm font-medium">
            {["Upload Resume", "AI Analysis", "Competency Mapping", "Job Matching", "Skill Gaps", "Course Recommendations", "Learning Path", "Improved Match"].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">{step}</div>
                {i < arr.length - 1 && <ChevronRight className="text-slate-300 self-center" size={18} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why SkillMap AI</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Most students apply to jobs without knowing where they actually stand. SkillMap AI replaces guesswork with a clear, data-backed readiness score and a path to close every gap.</p>
          <ul className="space-y-3">
            {["Skill-specific, not generic, course recommendations", "Transparent match scoring for every job", "Progress you can see improve week over week"].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <Card className="p-6">
          <div className="text-sm font-semibold mb-4">Competency Growth</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={PROGRESS_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FA" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="competency" stroke={COLORS.indigo} strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* ROLES */}
      <section id="roles" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Career Roles We Support</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CAREER_ROLES.map((r) => (
              <span key={r} className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium">{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-10">What learners say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Aditi R.", role: "Final Year, AI & DS", quote: "I finally understood exactly which skills were holding my job match back — and fixed them in weeks." },
            { name: "Karthik M.", role: "B.Tech CSE", quote: "The learning path felt built for me, not a generic course list." },
            { name: "Sneha P.", role: "MCA Graduate", quote: "Watching my match score jump after each course kept me motivated." },
          ].map((t) => (
            <Card key={t.name} className="p-6">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">"{t.quote}"</p>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-slate-500">{t.role}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to see where you stand?</h2>
          <p className="text-indigo-100 mb-7">Upload your resume and get your first Job Readiness Score in minutes.</p>
          <button onClick={onGetStarted} className="bg-white text-indigo-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-indigo-50">Get Started Free</button>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 SkillMap AI — Academic Prototype. All data shown is simulated for demonstration purposes.
      </footer>
    </div>
  );
}

/* ============================== AUTH ============================== */

function Auth({ onAuth }) {
  const [mode, setMode] = useState("register");
  const [role, setRole] = useState("seeker");
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center gap-2 font-bold text-lg mb-6 justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <Target size={17} className="text-white" />
          </div>
          SkillMap <span className="text-indigo-600">AI</span>
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {["register", "login"].map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 text-sm font-semibold py-2 rounded-lg capitalize ${mode === m ? "bg-white shadow-sm" : "text-slate-500"}`}>
              {m === "register" ? "Register" : "Log In"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {mode === "register" && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400" />
          )}
          <input placeholder="Email" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400" />
          <input type="password" placeholder="Password" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400" />
          {mode === "register" && (
            <input type="password" placeholder="Confirm Password" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400" />
          )}

          {mode === "register" ? (
            <div>
              <div className="text-xs font-medium text-slate-500 mb-2">Select Role</div>
              <div className="grid grid-cols-2 gap-3">
                {[{ id: "seeker", label: "Job Seeker", Icon: User }, { id: "recruiter", label: "Recruiter", Icon: Briefcase }].map(({ id, label, Icon }) => (
                  <button key={id} onClick={() => setRole(id)}
                    className={`border rounded-xl p-3 text-sm font-medium flex flex-col items-center gap-1.5 ${role === id ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600"}`}>
                    <Icon size={18} /> {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center gap-1.5"><input type="checkbox" /> Remember Me</label>
              <button className="text-indigo-600 font-medium">Forgot Password?</button>
            </div>
          )}

          <button
            onClick={() => onAuth(role, name || "Roshini")}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 mt-2">
            {mode === "register" ? "Create Account" : "Log In"}
          </button>
          <p className="text-center text-xs text-slate-400">Mock authentication — no real credentials required.</p>
        </div>
      </Card>
    </div>
  );
}

/* ============================== ONBOARDING ============================== */

function Onboarding({ name, onComplete }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("Data Scientist");
  const [resumeName, setResumeName] = useState("");

  const steps = ["Personal Info", "Education", "Career Goal", "Resume Upload"];

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center p-6">
      <Card className="w-full max-w-xl p-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? "bg-green-600 text-white" : step === i + 1 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {step > i + 1 ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <div className="text-[10px] text-slate-500 hidden sm:block">{s}</div>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step > i + 1 ? "bg-green-600" : "bg-slate-100"}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-1">Personal Information</h3>
            <input defaultValue={name || "Roshini"} placeholder="Name" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="Email" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="Phone" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="Location" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-1">Education</h3>
            <input defaultValue="B.Tech Artificial Intelligence and Data Science" placeholder="Degree" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="Department" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="College" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Current Year" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
              <input placeholder="Graduation Year" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Career Goal</h3>
            <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {CAREER_ROLES.map((r) => (
                <button key={r} onClick={() => setGoal(r)}
                  className={`border rounded-xl p-3 text-sm font-medium text-left ${goal === r ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Resume Upload</h3>
            {!resumeName ? (
              <button onClick={() => setResumeName("Roshini_Resume.pdf")}
                className="w-full border-2 border-dashed border-slate-300 rounded-xl py-10 flex flex-col items-center gap-2 text-slate-500 hover:border-indigo-400 hover:text-indigo-600">
                <Upload size={26} />
                <span className="text-sm font-medium">Click to upload PDF / DOC / DOCX</span>
              </button>
            ) : (
              <div className="border border-green-200 bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <FileText size={20} className="text-green-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{resumeName}</div>
                  <div className="text-xs text-green-700">Resume uploaded successfully.</div>
                </div>
                <CheckCircle2 size={18} className="text-green-600" />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button disabled={step === 1} onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1 text-sm font-medium text-slate-500 disabled:opacity-0 px-4 py-2">
            <ChevronLeft size={16} /> Back
          </button>
          {step < 4 ? (
            <button onClick={() => setStep((s) => s + 1)} className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 flex items-center gap-1.5">
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button disabled={!resumeName} onClick={() => onComplete(goal)}
              className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-40 flex items-center gap-1.5">
              Analyze Resume <Sparkles size={15} />
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ============================== AI ANALYSIS ============================== */

function AnalysisLoading({ onDone }) {
  const [i, setI] = useState(0);
  const lines = ["Analyzing your resume...", "Extracting skills...", "Mapping competencies...", "Comparing career requirements...", "Generating personalized insights..."];
  React.useEffect(() => {
    if (i < lines.length - 1) {
      const t = setTimeout(() => setI(i + 1), 650);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
  }, [i]);
  return (
    <div className="min-h-screen bg-[#0F1222] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Sparkles size={28} className="text-white" />
        </div>
        <div className="space-y-3">
          {lines.map((l, idx) => (
            <div key={l} className={`text-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${idx <= i ? "opacity-100" : "opacity-25"}`}>
              {idx < i ? <CheckCircle2 size={14} className="text-green-400" /> : idx === i ? <div className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" /> : <div className="w-3.5 h-3.5" />}
              <span className={idx <= i ? "text-white" : "text-slate-500"}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalysisResult({ onContinue }) {
  return (
    <div className="min-h-screen bg-[#F6F7FB] p-6">
      <div className="max-w-3xl mx-auto py-8">
        <Badge tone="success"><CheckCircle2 size={12} /> Analysis Complete</Badge>
        <h2 className="text-2xl font-bold mt-3 mb-6">Resume Summary</h2>

        <Card className="p-6 mb-5">
          <div className="text-sm font-semibold text-slate-500 mb-3">Skills Detected</div>
          <div className="flex flex-wrap gap-2">
            {RESUME_SKILLS.map((s) => <Badge key={s} tone="indigo">{s}</Badge>)}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Card className="p-6">
            <div className="text-sm font-semibold text-slate-500 mb-3">Education</div>
            <div className="text-sm">B.Tech Artificial Intelligence and Data Science</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-semibold text-slate-500 mb-3">Experience</div>
            <div className="text-sm">Internship / Project Experience</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-semibold text-slate-500 mb-3">Projects</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-slate-700">
              <li>Machine Learning Project</li>
              <li>E-Commerce Web Application</li>
            </ul>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-semibold text-slate-500 mb-3">Certifications</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-slate-700">
              <li>Python Certification</li>
              <li>SQL Certification</li>
            </ul>
          </Card>
        </div>

        <Card className="p-6 mb-8 bg-indigo-50/60 border-indigo-100">
          <div className="flex items-start gap-3">
            <Sparkles size={18} className="text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-indigo-900 mb-1">AI Insight</div>
              <p className="text-sm text-indigo-900/80 leading-relaxed">
                Your resume shows strong programming and SQL foundations. Machine Learning and Statistics
                are currently the most important areas to improve for Data Scientist roles.
              </p>
            </div>
          </div>
        </Card>

        <button onClick={onContinue} className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2">
          View My Competency Map <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ============================== SEEKER APP SHELL ============================== */

const SEEKER_NAV = [
  { id: "overview", label: "Dashboard", Icon: LayoutDashboard },
  { id: "resume", label: "Resume", Icon: FileText },
  { id: "competencies", label: "My Competencies", Icon: Target },
  { id: "gaps", label: "Skill Gap Analysis", Icon: AlertTriangle },
  { id: "jobs", label: "Explore Jobs", Icon: Search },
  { id: "career", label: "Career Guidance", Icon: Compass },
  { id: "recommendations", label: "AI Recommendations", Icon: Sparkles },
  { id: "learningPath", label: "Learning Path", Icon: RouteIcon },
  { id: "progress", label: "Progress", Icon: TrendingUp },
  { id: "certificates", label: "Certificates", Icon: Award },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "profile", label: "Profile", Icon: User },
];

function Sidebar({ items, active, onSelect, brandRole, onSwitchRole, userName, notifCount }) {
  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col shrink-0">
      <div className="px-6 py-5 flex items-center gap-2 font-bold border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
          <Target size={16} className="text-white" />
        </div>
        SkillMap <span className="text-indigo-600">AI</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => onSelect(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium relative ${active === id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
            <Icon size={16} /> {label}
            {id === "notifications" && notifCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{notifCount}</span>
            )}
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">{userName?.[0] || "U"}</div>
          <div className="text-xs">
            <div className="font-semibold">{userName}</div>
            <div className="text-slate-400 capitalize">{brandRole}</div>
          </div>
        </div>
        <button onClick={onSwitchRole} className="w-full mt-2 flex items-center gap-2 text-xs text-slate-500 hover:text-red-600 px-2 py-2">
          <LogOut size={13} /> Switch Role / Log Out
        </button>
      </div>
    </div>
  );
}

function TopBar({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between mb-7">
      <div>
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ---------- Overview ---------- */
function SeekerOverview({ skills, jobs, goal, notify, go }) {
  const comp = overallCompetency(skills);
  const bestJob = jobs.reduce((best, j) => (computeMatch(j.required, skills) > computeMatch(best.required, skills) ? j : best), jobs[0]);
  const bestMatch = computeMatch(bestJob.required, skills);
  const criticalGaps = Object.entries(skills).filter(([, v]) => statusFor(v.current, v.required).label === "Critical Gap");

  return (
    <div>
      <TopBar title={`Welcome back, Roshini`} subtitle={`Tracking your readiness for ${goal}`} />
      <div className="grid md:grid-cols-4 gap-5 mb-6">
        <Card className="p-5 flex items-center gap-4 md:col-span-2">
          <OrbitScore value={bestMatch} size={80} />
          <div>
            <div className="text-xs text-slate-500">Top Job Match</div>
            <div className="font-semibold">{bestJob.title} · {bestJob.company}</div>
            <button onClick={() => go("jobs")} className="text-xs text-indigo-600 font-medium mt-1 flex items-center gap-1">View jobs <ChevronRight size={12} /></button>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-slate-500 mb-2">Overall Competency</div>
          <div className="text-2xl font-bold mb-2">{comp}%</div>
          <ProgressBar value={comp} />
        </Card>
        <Card className="p-5">
          <div className="text-xs text-slate-500 mb-2">Critical Gaps</div>
          <div className="text-2xl font-bold text-red-600 mb-1">{criticalGaps.length}</div>
          <div className="text-xs text-slate-500">{criticalGaps.map(([k]) => k).join(", ") || "None"}</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="font-semibold mb-4 flex items-center gap-2"><Target size={16} className="text-indigo-600" /> Competency Snapshot</div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={Object.entries(skills).map(([k, v]) => ({ skill: k, Current: v.current, Required: v.required }))}>
              <PolarGrid stroke="#E7E8F2" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="Current" dataKey="Current" stroke={COLORS.indigo} fill={COLORS.indigo} fillOpacity={0.35} />
              <Radar name="Required" dataKey="Required" stroke={COLORS.cyan} fill={COLORS.cyan} fillOpacity={0.12} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="font-semibold mb-4 flex items-center gap-2"><Sparkles size={16} className="text-violet-600" /> Recommended Next Step</div>
          <div className="space-y-3">
            {Object.entries(skills)
              .filter(([, v]) => v.current < v.required)
              .sort((a, b) => (b[1].required - b[1].current) - (a[1].required - a[1].current))
              .slice(0, 3)
              .map(([skill, v]) => (
                <div key={skill} className="flex items-center justify-between bg-slate-50 rounded-xl p-3.5">
                  <div>
                    <div className="text-sm font-medium">{skill}</div>
                    <div className="text-xs text-slate-500">{v.current}% → {v.required}% required</div>
                  </div>
                  <Badge tone={v.required - v.current > 30 ? "danger" : "warning"}>{v.required - v.current > 30 ? "Critical" : "Moderate"}</Badge>
                </div>
              ))}
            <button onClick={() => go("recommendations")} className="w-full text-center text-sm font-semibold text-indigo-600 pt-1">View all recommended courses →</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Resume ---------- */
function ResumeView() {
  return (
    <div>
      <TopBar title="Resume" subtitle="Your uploaded resume and AI-extracted details" />
      <Card className="p-6 mb-5 flex items-center gap-3">
        <FileText className="text-indigo-600" />
        <div className="flex-1">
          <div className="text-sm font-semibold">Roshini_Resume.pdf</div>
          <div className="text-xs text-slate-500">Uploaded · Analyzed by AI</div>
        </div>
        <button className="text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg px-4 py-2">Replace Resume</button>
      </Card>
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="text-sm font-semibold text-slate-500 mb-3">Skills</div>
          <div className="flex flex-wrap gap-2">{RESUME_SKILLS.map((s) => <Badge key={s}>{s}</Badge>)}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-semibold text-slate-500 mb-3">Education</div>
          <div className="text-sm">B.Tech Artificial Intelligence and Data Science</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-semibold text-slate-500 mb-3">Projects</div>
          <ul className="text-sm list-disc list-inside space-y-1"><li>Machine Learning Project</li><li>E-Commerce Web Application</li></ul>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-semibold text-slate-500 mb-3">Certifications</div>
          <ul className="text-sm list-disc list-inside space-y-1"><li>Python Certification</li><li>SQL Certification</li></ul>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Competencies ---------- */
function Competencies({ skills }) {
  const comp = overallCompetency(skills);
  const categories = [
    { label: "Technical Skills", value: Math.round((skills.Python.current + skills.SQL.current + skills["Machine Learning"].current + skills.Statistics.current) / 4) },
    { label: "Problem Solving", value: Math.round((skills["Machine Learning"].current + skills.Statistics.current) / 2) },
    { label: "Communication", value: skills.Communication.current },
    { label: "Domain Knowledge", value: Math.round((skills["Data Visualization"].current + skills.SQL.current) / 2) },
  ];

  return (
    <div>
      <TopBar title="My Competencies" subtitle="How your current skills compare to role requirements" />
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <Card className="p-6 flex items-center gap-5 md:col-span-1">
          <OrbitScore value={comp} size={90} />
          <div>
            <div className="text-xs text-slate-500">Overall Competency</div>
            <div className="text-xl font-bold">{comp}%</div>
          </div>
        </Card>
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {categories.map((c) => (
            <Card key={c.label} className="p-4">
              <div className="text-xs text-slate-500 mb-2">{c.label}</div>
              <div className="text-lg font-bold mb-1.5">{c.value}%</div>
              <ProgressBar value={c.value} />
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="font-semibold mb-4">Skill Radar</div>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={Object.entries(skills).map(([k, v]) => ({ skill: k, Current: v.current, Required: v.required }))}>
            <PolarGrid stroke="#E7E8F2" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
            <Radar name="Current" dataKey="Current" stroke={COLORS.indigo} fill={COLORS.indigo} fillOpacity={0.35} />
            <Radar name="Required" dataKey="Required" stroke={COLORS.cyan} fill={COLORS.cyan} fillOpacity={0.12} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <div className="font-semibold mb-4">Skill Breakdown</div>
        <div className="space-y-3">
          {Object.entries(skills).map(([skill, v]) => {
            const st = statusFor(v.current, v.required);
            return (
              <div key={skill} className="flex items-center gap-4 py-2 border-b last:border-0 border-slate-100">
                <div className="w-40 text-sm font-medium shrink-0">{skill}</div>
                <div className="flex-1"><ProgressBar value={v.current} color={st.color} /></div>
                <div className="w-28 text-xs text-slate-500 shrink-0">{v.current}% / {v.required}%</div>
                <Badge tone={st.label === "Strong" ? "success" : st.label === "Moderate Gap" ? "warning" : "danger"}>
                  <st.Icon size={11} /> {st.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ---------- Skill Gap Analysis ---------- */
function SkillGapAnalysis({ skills, goal, jobs, go }) {
  const job = jobs.find((j) => j.title === goal) || jobs[0];
  const match = computeMatch(job.required, skills);
  const entries = Object.entries(skills).map(([k, v]) => ({ skill: k, ...v, gap: Math.max(0, v.required - v.current), status: statusFor(v.current, v.required) }));
  const critical = entries.filter((e) => e.status.label === "Critical Gap");
  const moderate = entries.filter((e) => e.status.label === "Moderate Gap");
  const strong = entries.filter((e) => e.status.label === "Strong");

  return (
    <div>
      <TopBar title="Skill Gap Analysis" subtitle={`Target Role: ${goal}`} />
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <Card className="p-6 flex items-center gap-4">
          <OrbitScore value={match} size={72} />
          <div><div className="text-xs text-slate-500">Job Readiness</div><div className="text-lg font-bold">{match}%</div></div>
        </Card>
        <Card className="p-6">
          <div className="text-xs text-slate-500 mb-1">Critical Gaps</div>
          <div className="text-lg font-bold text-red-600">{critical.map((e) => e.skill).join(", ") || "None"}</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs text-slate-500 mb-1">Strong Skills</div>
          <div className="text-lg font-bold text-green-600">{strong.map((e) => e.skill).join(", ") || "None"}</div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="font-semibold mb-4">Current vs Required</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={entries} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FA" />
            <XAxis dataKey="skill" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" name="Current" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
            <Bar dataKey="required" name="Required" fill={COLORS.cyan} radius={[4, 4, 0, 0]} opacity={0.55} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <div className="font-semibold mb-4">Gap Detail</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Skill</th><th className="pb-2 font-medium">Current</th><th className="pb-2 font-medium">Required</th><th className="pb-2 font-medium">Gap</th><th className="pb-2 font-medium">Priority</th>
            </tr>
          </thead>
          <tbody>
            {entries.sort((a, b) => b.gap - a.gap).map((e) => (
              <tr key={e.skill} className="border-b last:border-0 border-slate-50">
                <td className="py-3 font-medium">{e.skill}</td>
                <td className="py-3">{e.current}%</td>
                <td className="py-3">{e.required}%</td>
                <td className="py-3">{e.gap}%</td>
                <td className="py-3"><Badge tone={e.status.label === "Strong" ? "success" : e.status.label === "Moderate Gap" ? "warning" : "danger"}>{e.status.label === "Strong" ? "Low" : e.status.label === "Moderate Gap" ? "Medium" : "High"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <button onClick={() => go("recommendations")} className="mt-6 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 flex items-center gap-2">
        View Recommended Courses <ArrowRight size={15} />
      </button>
    </div>
  );
}

/* ---------- Explore Jobs ---------- */
function ExploreJobs({ jobs, skills, onView }) {
  const [q, setQ] = useState("");
  const [minMatch, setMinMatch] = useState(0);
  const filtered = jobs.filter((j) => (j.title.toLowerCase().includes(q.toLowerCase()) || j.company.toLowerCase().includes(q.toLowerCase())) && computeMatch(j.required, skills) >= minMatch);

  return (
    <div>
      <TopBar title="Explore Jobs" subtitle="Mock listings — representative of jobs that could be sourced via authorized job-data integrations" />
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-[220px] relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search role or company" className="w-full border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm" />
        </div>
        {[0, 60, 75, 85].map((m) => (
          <button key={m} onClick={() => setMinMatch(m)} className={`text-xs font-medium px-3.5 py-2.5 rounded-lg border ${minMatch === m ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600"}`}>
            {m === 0 ? "All Matches" : `${m}%+`}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((j) => {
          const m = computeMatch(j.required, skills);
          const strongest = Object.entries(j.required).filter(([k]) => skills[k]?.current >= j.required[k]).map(([k]) => k);
          const missing = Object.entries(j.required).filter(([k]) => skills[k]?.current < j.required[k]).map(([k]) => k);
          return (
            <Card key={j.id} className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold">{j.title}</div>
                  <div className="text-sm text-slate-500">{j.company}</div>
                </div>
                <OrbitScore value={m} size={54} stroke={6} />
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><MapPin size={12} /> {j.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {j.exp}</span>
                <span className="flex items-center gap-1"><DollarSign size={12} /> {j.salary}</span>
                <Badge tone="slate">{j.type}</Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {strongest.map((s) => <Badge key={s} tone="success">{s}</Badge>)}
                {missing.map((s) => <Badge key={s} tone="danger">{s}</Badge>)}
              </div>
              <button onClick={() => onView(j.id)} className="w-full mt-3 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-lg py-2 hover:bg-indigo-50">View Job</button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Job Details ---------- */
function JobDetails({ job, skills, onBack, go }) {
  const match = computeMatch(job.required, skills);
  const eligible = match >= 60;
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-500 mb-4"><ChevronLeft size={15} /> Back to Jobs</button>
      <Card className="p-6 mb-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold">{job.title}</h2>
            <div className="text-slate-500 text-sm mt-1">{job.company} · {job.location}</div>
            <div className="flex gap-3 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {job.exp}</span>
              <Badge tone="slate">{job.type}</Badge>
            </div>
          </div>
          <OrbitScore value={match} size={90} label="Job Readiness" />
        </div>
      </Card>

      <Card className="p-6 mb-5">
        <div className="font-semibold mb-3">Job Description</div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          We're looking for a motivated {job.title.toLowerCase()} to join our team at {job.company}. You'll work with
          cross-functional teams to build and ship data-driven solutions, applying the core skills below on real projects from day one.
        </p>
        <div className="font-semibold mb-2 text-sm">Required Skills</div>
        <div className="flex flex-wrap gap-2">{Object.keys(job.required).map((s) => <Badge key={s} tone="indigo">{s} — {job.required[s]}%</Badge>)}</div>
      </Card>

      <Card className="p-6 mb-5">
        <div className="font-semibold mb-4">Your Job Match — {match}%</div>
        <div className="space-y-3">
          {Object.entries(job.required).map(([skill, req]) => {
            const cur = skills[skill]?.current ?? 0;
            const ok = cur >= req;
            const partial = !ok && cur >= req - 20;
            return (
              <div key={skill} className="flex items-center gap-4">
                <div className="w-40 text-sm font-medium">{skill}</div>
                <div className="flex-1"><ProgressBar value={cur} color={ok ? COLORS.success : partial ? COLORS.warning : COLORS.danger} /></div>
                <div className="w-24 text-xs text-slate-500">{cur}% / {req}%</div>
                {ok ? <CheckCircle2 size={16} className="text-green-600" /> : partial ? <AlertTriangle size={16} className="text-amber-600" /> : <XCircle size={16} className="text-red-600" />}
              </div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="text-xs font-semibold text-green-700 mb-1">Your strongest skills</div>
            <div className="text-sm text-green-900">{Object.entries(job.required).filter(([k]) => skills[k]?.current >= job.required[k]).map(([k]) => k).join(", ") || "Keep building — none yet"}</div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <div className="text-xs font-semibold text-red-700 mb-1">Your skill gaps</div>
            <div className="text-sm text-red-900">{Object.entries(job.required).filter(([k]) => skills[k]?.current < job.required[k]).map(([k]) => k).join(", ") || "None — great fit!"}</div>
          </div>
        </div>
      </Card>

      <Card className={`p-6 flex items-center justify-between flex-wrap gap-4 ${eligible ? "bg-green-50/60 border-green-100" : "bg-red-50/60 border-red-100"}`}>
        <div>
          <div className="font-semibold mb-1">{eligible ? "Eligible to Apply" : "Application Locked"}</div>
          <p className="text-sm text-slate-600">You currently have a {match}% match for this role. {!eligible && "Improve the following skills to increase your job readiness."}</p>
          <p className="text-xs text-slate-400 mt-1">This is a Job Readiness Score, not a guarantee of employment.</p>
        </div>
        <div className="flex gap-3">
          {!eligible && <button onClick={() => go("recommendations")} className="text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl px-5 py-3 hover:bg-indigo-50">View Recommended Courses</button>}
          <button disabled={!eligible} className={`text-sm font-semibold rounded-xl px-6 py-3 flex items-center gap-2 ${eligible ? "bg-green-600 text-white hover:bg-green-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
            {eligible ? <>Apply Now <ArrowRight size={15} /></> : <><Lock size={14} /> Application Locked</>}
          </button>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Career Guidance ---------- */
function CareerGuidance({ skills, goal, setGoal, jobs }) {
  const roleReqs = {
    "Data Scientist": jobs.find(j => j.title === "Data Scientist")?.required || {},
    "Data Analyst": jobs.find(j => j.title === "Data Analyst")?.required || {},
    "AI Engineer": jobs.find(j => j.title === "AI Engineer")?.required || {},
    "Machine Learning Engineer": jobs.find(j => j.title === "Machine Learning Engineer")?.required || {},
    "Software Developer": jobs.find(j => j.title === "Software Developer")?.required || {},
    "Full Stack Developer": jobs.find(j => j.title === "Full Stack Developer")?.required || {},
  };
  return (
    <div>
      <TopBar title="Career Guidance" subtitle="Compare your fit across career paths and choose a target role" />
      <div className="grid md:grid-cols-2 gap-5">
        {Object.entries(roleReqs).map(([role, req]) => {
          const match = computeMatch(req, skills);
          return (
            <Card key={role} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">{role}</div>
                <Badge tone={match >= 75 ? "success" : match >= 55 ? "warning" : "danger"}>{match}% Match</Badge>
              </div>
              <p className="text-xs text-slate-500 mb-3">Roles focused on {Object.keys(req).slice(0, 2).join(" & ")} with growing demand across product and analytics teams.</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {Object.entries(req).map(([k, v]) => {
                  const cur = skills[k]?.current ?? 0;
                  const icon = cur >= v ? "✓" : cur >= v - 20 ? "⚠" : "✕";
                  const tone = cur >= v ? "success" : cur >= v - 20 ? "warning" : "danger";
                  return <Badge key={k} tone={tone}>{k} {icon}</Badge>;
                })}
              </div>
              <button onClick={() => setGoal(role)} className={`w-full text-sm font-semibold rounded-lg py-2 ${goal === role ? "bg-indigo-600 text-white" : "border border-indigo-200 text-indigo-600 hover:bg-indigo-50"}`}>
                {goal === role ? "Current Target Role" : "Set as Target Role"}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- AI Recommendations ---------- */
function Recommendations({ courses, skills, onComplete, goal }) {
  const enriched = courses.map((c) => ({ ...c, current: skills[c.skill]?.current, required: skills[c.skill]?.required }));
  const priorityRank = (c) => (c.required - c.current);
  return (
    <div>
      <TopBar title="AI Course Recommendations" subtitle={`Matched to your detected skill gaps for ${goal}`} />
      <div className="grid md:grid-cols-2 gap-5">
        {enriched.filter(c => c.status !== "completed").sort((a, b) => priorityRank(b) - priorityRank(a)).map((c) => {
          const priority = c.required - c.current > 30 ? "Critical" : c.required - c.current > 10 ? "High" : "Moderate";
          const aiMatch = Math.min(99, 70 + (c.required - c.current));
          return (
            <Card key={c.id} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.provider} · {c.difficulty} · {c.duration}</div>
                </div>
                <Badge tone="indigo">{aiMatch}% AI Match</Badge>
              </div>
              <div className="flex items-center gap-3 my-3 text-xs">
                <Badge tone="slate">Skill: {c.skill}</Badge>
                <Badge tone={priority === "Critical" ? "danger" : priority === "High" ? "warning" : "slate"}>{priority} Priority</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span>Current: <b className="text-slate-700">{c.current}%</b></span>
                <ArrowRight size={12} />
                <span>Target: <b className="text-slate-700">{c.required}%</b></span>
              </div>
              <p className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 mb-4 leading-relaxed">
                Recommended because {c.skill} is one of your highest-priority competency gaps for the {goal} role.
              </p>
              {c.status === "in-progress" ? (
                <button onClick={() => onComplete(c.id)} className="w-full bg-indigo-600 text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-indigo-700 flex items-center justify-center gap-2">
                  <CheckCircle2 size={15} /> Complete Course
                </button>
              ) : (
                <button onClick={() => onComplete(c.id, true)} className="w-full border border-indigo-200 text-indigo-600 text-sm font-semibold rounded-lg py-2.5 hover:bg-indigo-50 flex items-center justify-center gap-2">
                  <PlayCircle size={15} /> Start Learning
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Learning Path ---------- */
function LearningPath({ courses, onComplete }) {
  const groups = [
    { key: "foundation", label: "Foundation", icon: CheckCircle2 },
    { key: "current", label: "Current", icon: Zap },
    { key: "upcoming", label: "Upcoming", icon: RouteIcon },
  ];
  return (
    <div>
      <TopBar title="Personalized Learning Path" subtitle="Your roadmap from resume to job-ready" />
      <div className="space-y-6">
        {groups.map((g) => (
          <Card key={g.key} className="p-6">
            <div className="flex items-center gap-2 font-semibold mb-4"><g.icon size={16} className="text-indigo-600" /> {g.label}</div>
            <div className="space-y-3">
              {courses.filter((c) => c.stage === g.key).map((c) => (
                <div key={c.id} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${c.status === "completed" ? "bg-green-600 text-white" : c.status === "in-progress" ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {c.status === "completed" ? "✓" : c.status === "in-progress" ? "→" : "○"}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.skill} · {c.duration}</div>
                  </div>
                  <Badge tone={c.status === "completed" ? "success" : c.status === "in-progress" ? "indigo" : "slate"}>
                    {c.status === "completed" ? "Completed" : c.status === "in-progress" ? "In Progress" : "Not Started"}
                  </Badge>
                  {c.status === "in-progress" && (
                    <button onClick={() => onComplete(c.id)} className="text-xs font-semibold text-white bg-indigo-600 rounded-lg px-3 py-2 hover:bg-indigo-700">Complete</button>
                  )}
                </div>
              ))}
              {courses.filter((c) => c.stage === g.key).length === 0 && <div className="text-xs text-slate-400">Nothing here yet.</div>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------- Progress ---------- */
function Progress({ skills, history, courses }) {
  const comp = overallCompetency(skills);
  const completedCount = courses.filter((c) => c.status === "completed").length;
  return (
    <div>
      <TopBar title="Progress" subtitle="Track how your competency and learning activity have evolved" />
      <div className="grid md:grid-cols-4 gap-5 mb-6">
        {[
          { label: "Overall Competency", value: `${comp}%` },
          { label: "Courses Completed", value: completedCount },
          { label: "Learning Hours", value: "24 hrs" },
          { label: "Learning Streak", value: "6 days" },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold">{s.value}</div>
          </Card>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="font-semibold mb-4">Competency Growth</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={[...history, { month: "Now", competency: comp }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FA" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="competency" stroke={COLORS.indigo} strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <div className="font-semibold mb-4">Weekly Learning Activity</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={WEEKLY_ACTIVITY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FA" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="hours" fill={COLORS.violet} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Certificates ---------- */
function Certificates({ certs }) {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <TopBar title="Certificates" subtitle="Earned as you close skill gaps" />
      <div className="grid md:grid-cols-2 gap-5">
        {certs.map((c) => (
          <Card key={c.id} className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0"><Award className="text-amber-600" size={22} /></div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{c.course}</div>
              <div className="text-xs text-slate-500">{c.skill} · {c.date}</div>
            </div>
            <button onClick={() => setSelected(c)} className="text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg px-3 py-2 hover:bg-indigo-50">View Certificate</button>
          </Card>
        ))}
        {certs.length === 0 && <div className="text-sm text-slate-400">Complete a course to earn your first certificate.</div>}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-10 max-w-lg w-full text-center border-8 border-indigo-100" onClick={(e) => e.stopPropagation()}>
            <BadgeCheck className="text-indigo-600 mx-auto mb-4" size={40} />
            <div className="text-xs tracking-widest text-slate-400 uppercase mb-2">Certificate of Completion</div>
            <div className="text-xl font-bold mb-1">Roshini</div>
            <div className="text-sm text-slate-500 mb-6">has successfully completed</div>
            <div className="text-lg font-semibold text-indigo-700 mb-1">{selected.course}</div>
            <div className="text-xs text-slate-500 mb-6">Skill: {selected.skill}</div>
            <div className="flex justify-between text-xs text-slate-400 border-t border-slate-100 pt-4">
              <span>Date: {selected.date}</span>
              <span>ID: {selected.id}</span>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 text-sm font-medium text-slate-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Notifications ---------- */
function NotificationsView({ notifications }) {
  const iconFor = (type) => type === "match" ? Briefcase : type === "warning" ? AlertTriangle : type === "success" ? CheckCircle2 : Bell;
  return (
    <div>
      <TopBar title="Notifications" subtitle="Everything that has happened on your journey" />
      <Card className="p-2">
        {notifications.map((n) => {
          const Icon = iconFor(n.type);
          return (
            <div key={n.id} className="flex items-start gap-3 p-4 border-b last:border-0 border-slate-50">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.type === "success" ? "bg-green-50 text-green-600" : n.type === "warning" ? "bg-amber-50 text-amber-600" : n.type === "match" ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                <Icon size={15} />
              </div>
              <div className="flex-1">
                <div className="text-sm">{n.text}</div>
                <div className="text-xs text-slate-400 mt-0.5">{n.time}</div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

/* ---------- Profile ---------- */
function Profile({ userName, goal }) {
  return (
    <div>
      <TopBar title="Profile" subtitle="Your account details" />
      <Card className="p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xl flex items-center justify-center">{userName?.[0] || "U"}</div>
          <div>
            <div className="font-semibold">{userName}</div>
            <div className="text-sm text-slate-500">Job Seeker · Target Role: {goal}</div>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Email</span><span>roshini@example.com</span></div>
          <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Location</span><span>Erode, Tamil Nadu</span></div>
          <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Degree</span><span>B.Tech AI & Data Science</span></div>
          <div className="flex justify-between pb-2"><span className="text-slate-500">Member Since</span><span>Aug 2026</span></div>
        </div>
      </Card>
    </div>
  );
}

/* ============================== SEEKER APP ============================== */

function SeekerApp({ userName, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [certs, setCerts] = useState(CERTIFICATES);
  const [goal, setGoal] = useState("Data Scientist");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toast, setToast] = useState(null);

  const pushNotification = (text, type = "info") => {
    setNotifications((n) => [{ id: Date.now(), text, time: "just now", type }, ...n]);
  };

  const handleCourseAction = (id, isStart) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;

    if (isStart) {
      setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, status: "in-progress" } : c)));
      pushNotification(`Started "${course.name}".`, "info");
      return;
    }

    const job = JOBS.find((j) => j.title === goal) || JOBS[0];
    const beforeMatch = computeMatch(job.required, skills);

    const newSkills = { ...skills, [course.skill]: { ...skills[course.skill], current: Math.min(95, skills[course.skill].current + course.delta) } };
    setSkills(newSkills);
    setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, status: "completed" } : c)));
    setCerts((cts) => [{ id: `CERT-2026-0${100 + cts.length}`, course: course.name, skill: course.skill, date: "27 Aug 2026" }, ...cts]);

    const afterMatch = computeMatch(job.required, newSkills);
    pushNotification(`Congratulations! You completed "${course.name}".`, "success");
    pushNotification(`Your ${goal} job readiness increased from ${beforeMatch}% to ${afterMatch}%.`, "match");
    setToast(`Job readiness: ${beforeMatch}% → ${afterMatch}%`);
    setTimeout(() => setToast(null), 3500);
  };

  const go = (t) => { setTab(t); setSelectedJobId(null); };
  const notifCount = notifications.length > 4 ? notifications.length - 4 : 0;

  let content;
  if (tab === "overview") content = <SeekerOverview skills={skills} jobs={JOBS} goal={goal} go={go} />;
  else if (tab === "resume") content = <ResumeView />;
  else if (tab === "competencies") content = <Competencies skills={skills} />;
  else if (tab === "gaps") content = <SkillGapAnalysis skills={skills} goal={goal} jobs={JOBS} go={go} />;
  else if (tab === "jobs") content = selectedJobId
    ? <JobDetails job={JOBS.find((j) => j.id === selectedJobId)} skills={skills} onBack={() => setSelectedJobId(null)} go={go} />
    : <ExploreJobs jobs={JOBS} skills={skills} onView={setSelectedJobId} />;
  else if (tab === "career") content = <CareerGuidance skills={skills} goal={goal} setGoal={setGoal} jobs={JOBS} />;
  else if (tab === "recommendations") content = <Recommendations courses={courses} skills={skills} onComplete={handleCourseAction} goal={goal} />;
  else if (tab === "learningPath") content = <LearningPath courses={courses} onComplete={(id) => handleCourseAction(id, false)} />;
  else if (tab === "progress") content = <Progress skills={skills} history={PROGRESS_HISTORY} courses={courses} />;
  else if (tab === "certificates") content = <Certificates certs={certs} />;
  else if (tab === "notifications") content = <NotificationsView notifications={notifications} />;
  else if (tab === "profile") content = <Profile userName={userName} goal={goal} />;

  return (
    <div className="flex bg-[#F6F7FB] min-h-screen">
      <Sidebar items={SEEKER_NAV} active={tab} onSelect={go} brandRole="Job Seeker" onSwitchRole={onLogout} userName={userName} notifCount={notifCount} />
      <div className="flex-1 p-8 max-w-6xl">{content}</div>
      {toast && (
        <div className="fixed bottom-6 right-6 bg-indigo-900 text-white rounded-xl px-5 py-4 shadow-xl flex items-center gap-3 z-50">
          <TrendingUp size={18} className="text-green-400" />
          <div className="text-sm font-medium">{toast}</div>
        </div>
      )}
    </div>
  );
}

/* ============================== RECRUITER APP ============================== */

const RECRUITER_NAV = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "post", label: "Post Jobs", Icon: PlusCircle },
  { id: "manage", label: "Manage Jobs", Icon: Briefcase },
  { id: "applications", label: "Applications", Icon: ClipboardList },
  { id: "candidates", label: "Candidates", Icon: Users },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "profile", label: "Profile", Icon: User },
];

const MOCK_APPLICATIONS = [
  { name: "Roshini", job: "Data Scientist", match: 72, skills: ["Python", "SQL"], gaps: ["Statistics"], exp: "Fresher", status: "Applied" },
  { name: "Rohit Verma", job: "Data Scientist", match: 88, skills: ["Python", "ML", "Statistics"], gaps: [], exp: "1 yr", status: "Shortlisted" },
  { name: "Priya Nair", job: "Data Analyst", match: 91, skills: ["SQL", "Power BI"], gaps: ["Python"], exp: "Fresher", status: "Interview" },
  { name: "Arjun Das", job: "ML Engineer", match: 65, skills: ["Python"], gaps: ["ML", "Statistics"], exp: "Fresher", status: "Applied" },
  { name: "Meera Iyer", job: "Data Scientist", match: 58, skills: ["SQL"], gaps: ["Python", "ML"], exp: "Fresher", status: "Rejected" },
];

function RecruiterApp({ userName, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [apps, setApps] = useState(MOCK_APPLICATIONS);

  const statusTone = { Applied: "slate", Shortlisted: "indigo", Interview: "warning", Selected: "success", Rejected: "danger" };
  const cycleStatus = (i) => {
    const order = ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"];
    setApps((a) => a.map((app, idx) => idx === i ? { ...app, status: order[(order.indexOf(app.status) + 1) % order.length] } : app));
  };

  let content;
  if (tab === "dashboard") {
    content = (
      <div>
        <TopBar title="Recruiter Dashboard" subtitle="Overview of your hiring pipeline" />
        <div className="grid md:grid-cols-5 gap-5">
          {[["Active Jobs", 6], ["Total Applications", 128], ["Shortlisted", 34], ["Interviews", 12], ["Selected", 5]].map(([l, v]) => (
            <Card key={l} className="p-5"><div className="text-xs text-slate-500 mb-1">{l}</div><div className="text-2xl font-bold">{v}</div></Card>
          ))}
        </div>
        <Card className="p-6 mt-6">
          <div className="font-semibold mb-4">Applications by Match Score</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={apps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FA" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="match" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  } else if (tab === "post") {
    content = (
      <div>
        <TopBar title="Post a Job" subtitle="Define role details and required competencies" />
        <Card className="p-6 max-w-2xl space-y-4">
          <input placeholder="Job Title" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Company" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="Location" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="Work Type" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="Experience" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
            <input placeholder="Salary" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <textarea placeholder="Description" rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm" />
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-2">Required Skills & Competency %</div>
            {[["Python", 80], ["SQL", 75], ["Machine Learning", 80], ["Statistics", 75]].map(([s, v]) => (
              <div key={s} className="flex items-center gap-3 mb-2">
                <input defaultValue={s} className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                <input defaultValue={v} type="number" className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                <span className="text-xs text-slate-400">%</span>
              </div>
            ))}
            <button className="text-xs font-semibold text-indigo-600 mt-1">+ Add Skill</button>
          </div>
          <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700">Post Job</button>
        </Card>
      </div>
    );
  } else if (tab === "manage") {
    content = (
      <div>
        <TopBar title="Manage Jobs" subtitle="Jobs currently posted by your organization" />
        <div className="grid md:grid-cols-2 gap-5">
          {JOBS.slice(0, 6).map((j) => (
            <Card key={j.id} className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div><div className="font-semibold">{j.title}</div><div className="text-xs text-slate-500">{j.company} · {j.location}</div></div>
                <Badge tone="success">Active</Badge>
              </div>
              <div className="text-xs text-slate-500">{Object.keys(j.required).length} required skills · {j.salary}</div>
            </Card>
          ))}
        </div>
      </div>
    );
  } else if (tab === "applications") {
    content = (
      <div>
        <TopBar title="Applications" subtitle="Sorted by match score — click status to update" />
        <Card className="p-2">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="p-3 font-medium">Candidate</th><th className="p-3 font-medium">Job</th><th className="p-3 font-medium">Match</th><th className="p-3 font-medium">Skills</th><th className="p-3 font-medium">Gaps</th><th className="p-3 font-medium">Status</th>
            </tr></thead>
            <tbody>
              {[...apps].sort((a, b) => b.match - a.match).map((a, i) => (
                <tr key={a.name} className="border-b last:border-0 border-slate-50">
                  <td className="p-3 font-medium">{a.name}</td>
                  <td className="p-3 text-slate-600">{a.job}</td>
                  <td className="p-3"><Badge tone={a.match >= 75 ? "success" : a.match >= 60 ? "warning" : "danger"}>{a.match}%</Badge></td>
                  <td className="p-3 text-xs text-slate-500">{a.skills.join(", ")}</td>
                  <td className="p-3 text-xs text-slate-500">{a.gaps.join(", ") || "—"}</td>
                  <td className="p-3">
                    <button onClick={() => cycleStatus(apps.findIndex(x => x.name === a.name))}>
                      <Badge tone={statusTone[a.status]}>{a.status}</Badge>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  } else if (tab === "candidates") {
    content = (
      <div>
        <TopBar title="Candidates" subtitle="Click a candidate in Applications to view full profile in a real build" />
        <div className="grid md:grid-cols-3 gap-5">
          {apps.map((a) => (
            <Card key={a.name} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">{a.name[0]}</div>
                <div><div className="font-semibold text-sm">{a.name}</div><div className="text-xs text-slate-500">{a.exp}</div></div>
              </div>
              <OrbitScore value={a.match} size={64} stroke={6} />
              <div className="text-xs text-slate-500 mt-3">Skills: {a.skills.join(", ")}</div>
            </Card>
          ))}
        </div>
      </div>
    );
  } else if (tab === "notifications") {
    content = <NotificationsView notifications={[
      { id: 1, text: "5 new candidates matched your Data Scientist posting.", time: "1h ago", type: "match" },
      { id: 2, text: "Rohit Verma reached 88% match — consider shortlisting.", time: "3h ago", type: "info" },
    ]} />;
  } else if (tab === "profile") {
    content = <Profile userName={userName} goal="Recruiter" />;
  }

  return (
    <div className="flex bg-[#F6F7FB] min-h-screen">
      <Sidebar items={RECRUITER_NAV} active={tab} onSelect={setTab} brandRole="Recruiter" onSwitchRole={onLogout} userName={userName} notifCount={0} />
      <div className="flex-1 p-8 max-w-6xl">{content}</div>
    </div>
  );
}

/* ============================== ADMIN APP ============================== */

const ADMIN_NAV = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "users", label: "Users", Icon: Users },
  { id: "jobs", label: "Jobs", Icon: Briefcase },
  { id: "courses", label: "Courses", Icon: GraduationCap },
  { id: "skills", label: "Skills", Icon: Target },
  { id: "certificates", label: "Certificates", Icon: Award },
  { id: "analytics", label: "Analytics", Icon: TrendingUp },
  { id: "notifications", label: "Notifications", Icon: Bell },
];

function AdminApp({ userName, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  let content;

  if (tab === "dashboard") {
    content = (
      <div>
        <TopBar title="Admin Dashboard" subtitle="Platform-wide overview" />
        <div className="grid md:grid-cols-4 gap-5">
          {[["Total Users", 1240], ["Job Seekers", 1080], ["Recruiters", 160], ["Active Jobs", 62], ["Applications", 3840], ["Courses", 48], ["Certificates", 910]].map(([l, v]) => (
            <Card key={l} className="p-5"><div className="text-xs text-slate-500 mb-1">{l}</div><div className="text-2xl font-bold">{v}</div></Card>
          ))}
        </div>
        <Card className="p-6 mt-6">
          <div className="font-semibold mb-4">Platform Growth</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={[{ m: "Apr", u: 320 }, { m: "May", u: 540 }, { m: "Jun", u: 780 }, { m: "Jul", u: 1010 }, { m: "Aug", u: 1240 }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FA" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip />
              <Line type="monotone" dataKey="u" stroke={COLORS.violet} strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  } else if (tab === "users") {
    content = (
      <div><TopBar title="Users" subtitle="All registered accounts" />
        <Card className="p-2">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-slate-500 border-b border-slate-100"><th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Role</th><th className="p-3 font-medium">Joined</th></tr></thead>
            <tbody>
              {[["Roshini", "Job Seeker", "12 Aug 2026"], ["Rohit Verma", "Job Seeker", "10 Aug 2026"], ["TechNova HR", "Recruiter", "01 Jul 2026"], ["DataSphere HR", "Recruiter", "15 Jun 2026"]].map((r) => (
                <tr key={r[0]} className="border-b last:border-0 border-slate-50"><td className="p-3 font-medium">{r[0]}</td><td className="p-3"><Badge tone="slate">{r[1]}</Badge></td><td className="p-3 text-slate-500">{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  } else if (tab === "jobs") {
    content = (
      <div><TopBar title="Jobs" subtitle="All listings across the platform" />
        <div className="grid md:grid-cols-2 gap-5">
          {JOBS.map((j) => (
            <Card key={j.id} className="p-5 flex justify-between items-center">
              <div><div className="font-semibold text-sm">{j.title}</div><div className="text-xs text-slate-500">{j.company} · {j.location}</div></div>
              <Badge tone="success">Active</Badge>
            </Card>
          ))}
        </div>
      </div>
    );
  } else if (tab === "courses") {
    content = (
      <div><TopBar title="Courses" subtitle="Course catalogue powering AI recommendations" />
        <div className="grid md:grid-cols-2 gap-5">
          {INITIAL_COURSES.map((c) => (
            <Card key={c.id} className="p-5 flex justify-between items-center">
              <div><div className="font-semibold text-sm">{c.name}</div><div className="text-xs text-slate-500">{c.provider} · {c.difficulty}</div></div>
              <Badge tone="indigo">{c.skill}</Badge>
            </Card>
          ))}
        </div>
      </div>
    );
  } else if (tab === "skills") {
    content = (
      <div><TopBar title="Skills" subtitle="Master skill taxonomy used for competency mapping" />
        <div className="flex flex-wrap gap-2">{Object.keys(INITIAL_SKILLS).map((s) => <Badge key={s} tone="indigo">{s}</Badge>)}</div>
      </div>
    );
  } else if (tab === "certificates") {
    content = <Certificates certs={CERTIFICATES} />;
  } else if (tab === "analytics") {
    content = (
      <div><TopBar title="Analytics" subtitle="Platform-wide learning outcomes" />
        <Card className="p-6">
          <div className="font-semibold mb-4">Average Job Match Score by Role</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={JOBS.slice(0, 6).map(j => ({ name: j.title, match: computeMatch(j.required, INITIAL_SKILLS) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FA" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis domain={[0, 100]} tick={{ fontSize: 11 }} /><Tooltip />
              <Bar dataKey="match" fill={COLORS.cyan} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  } else if (tab === "notifications") {
    content = <NotificationsView notifications={[{ id: 1, text: "48 new users joined this week.", time: "Today", type: "info" }]} />;
  }

  return (
    <div className="flex bg-[#F6F7FB] min-h-screen">
      <Sidebar items={ADMIN_NAV} active={tab} onSelect={setTab} brandRole="Admin" onSwitchRole={onLogout} userName={userName} notifCount={0} />
      <div className="flex-1 p-8 max-w-6xl">{content}</div>
    </div>
  );
}

/* ============================== ROOT APP ============================== */

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [role, setRole] = useState("seeker");
  const [userName, setUserName] = useState("Roshini");
  const [goal, setGoal] = useState("Data Scientist");

  const handleAuth = (r, name) => {
    setRole(r);
    setUserName(name);
    if (r === "seeker") setScreen("onboarding");
    else if (r === "recruiter") setScreen("recruiterApp");
  };

  const handleLogout = () => { setScreen("landing"); };

  if (screen === "landing") return <Landing onGetStarted={() => setScreen("auth")} onExploreJobs={() => setScreen("auth")} />;
  if (screen === "auth") return <Auth onAuth={handleAuth} />;
  if (screen === "onboarding") return <Onboarding name={userName} onComplete={(g) => { setGoal(g); setScreen("analyzing"); }} />;
  if (screen === "analyzing") return <AnalysisLoading onDone={() => setScreen("analysisResult")} />;
  if (screen === "analysisResult") return <AnalysisResult onContinue={() => setScreen("seekerApp")} />;
  if (screen === "seekerApp") return <SeekerApp userName={userName} onLogout={handleLogout} />;
  if (screen === "recruiterApp") return <RecruiterApp userName={userName} onLogout={handleLogout} />;
  if (screen === "adminApp") return <AdminApp userName={userName} onLogout={handleLogout} />;

  return null;
}