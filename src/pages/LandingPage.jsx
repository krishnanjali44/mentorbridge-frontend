import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const mentors = [
  { id:1, name:'Priya Raghavan', initials:'PR', color:'#e94560', role:'Senior PM · Google',        domain:'Product Strategy', tag:'teal', fee:1200, rating:4.9 },
  { id:2, name:'Arjun Kumar',    initials:'AK', color:'#0f3460', role:'Full-Stack Eng · Microsoft', domain:'Web Development',  tag:'blue', fee:900,  rating:4.8 },
  { id:3, name:'Sneha Mehta',    initials:'SM', color:'#f5a623', role:'Data Scientist · Flipkart',  domain:'ML & AI',          tag:'pink', fee:1500, rating:4.7 },
]

const reviews = [
  { id:1, mentor:'Priya Raghavan', mentee:'Rahul Anand',    initials:'RA', color:'#e94560', outcome:'Got promoted',    rating:5, text:"Priya's mentorship completely changed how I approach product decisions. After 8 sessions, I got promoted to Senior PM. The progress tracking made our goals crystal clear.", time:'3 months ago' },
  { id:2, mentor:'Arjun Kumar',    mentee:'Divya Krishnan', initials:'DK', color:'#0f3460', outcome:'Landed dream job', rating:5, text:"Arjun's sessions were super structured and practical. He reviewed my code, helped me ace FAANG interviews, and charged exactly what was shown upfront — no surprises.", time:'1 month ago' },
  { id:3, mentor:'Sneha Mehta',    mentee:'Vivek Patel',    initials:'VP', color:'#f5a623', outcome:'Published research',rating:5, text:"Sneha helped me go from 'I know Python' to publishing my first ML paper. The session notes and milestone tracker kept me accountable every week. Totally worth it.", time:'2 months ago' },
]

export default function LandingPage() {
  const [showLogin, setShowLogin]   = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [loginRole, setLoginRole]   = useState('mentee')
  const [signupRole, setSignupRole] = useState('mentee')
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleLogin = () => {
    if (loginRole === 'admin') { login({ name:'Admin User',   role:'admin'  }); navigate('/admin') }
    else                       { login({ name:'Aisha Sharma', role:'mentee' }); navigate('/dashboard') }
  }

  return (
    <div style={{ minHeight:'100vh' }}>

      {/* NAV */}
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.2rem 4rem', background:'#fff', boxShadow:'0 1px 0 var(--border)', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem' }}>Mentor<span style={{ color:'var(--accent)' }}>Bridge</span></div>
        <div style={{ display:'flex', gap:'2rem' }}>
          {['Features','Mentors','Reviews','How it works'].map(i => <a key={i} href="#" style={{ color:'var(--muted)', fontSize:'14px', fontWeight:500 }}>{i}</a>)}
        </div>
        <div style={{ display:'flex', gap:'10px' }}>
          <button className="btn btn-outline" onClick={() => setShowLogin(true)}>Log In</button>
          <button className="btn btn-primary" onClick={() => setShowSignup(true)}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center', padding:'5rem 4rem', maxWidth:'1300px', margin:'0 auto' }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'3rem', lineHeight:1.15, marginBottom:'1.2rem' }}>
            Find your <span style={{ color:'var(--accent)' }}>perfect mentor</span> and unlock your potential
          </h1>
          <p style={{ color:'var(--muted)', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
            Connect with industry-leading mentors, schedule 1-on-1 sessions, track your growth — and read real feedback from previous students before you book.
          </p>
          <div style={{ display:'flex', gap:'1rem' }}>
            <button className="btn btn-primary" style={{ fontSize:'1rem', padding:'12px 28px' }} onClick={() => setShowSignup(true)}>Start as Mentee</button>
            <button className="btn btn-outline" style={{ fontSize:'1rem', padding:'12px 28px' }} onClick={() => { setLoginRole('admin'); setShowLogin(true) }}>Admin Login</button>
          </div>
          <div style={{ display:'flex', gap:'2.5rem', marginTop:'2.5rem', paddingTop:'2rem', borderTop:'1px solid var(--border)' }}>
            {[['2,400+','Active Mentors'],['18,000+','Sessions Done'],['94%','Goal Achievement']].map(([v,l]) => (
              <div key={l}><strong style={{ fontSize:'1.6rem', fontFamily:'Playfair Display,serif' }}>{v}</strong><span style={{ display:'block', fontSize:'12px', color:'var(--muted)', marginTop:2 }}>{l}</span></div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {mentors.map(m => (
            <div key={m.id} className="card" style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
              <div className="avatar" style={{ background:m.color }}>{m.initials}</div>
              <div style={{ flex:1 }}>
                <h4 style={{ fontSize:'15px', fontWeight:600 }}>{m.name}</h4>
                <p style={{ fontSize:'12px', color:'var(--muted)' }}>{m.role}</p>
                <span className={`tag tag-${m.tag}`}>{m.domain}</span>
                <div className="stars" style={{ marginTop:4 }}>★ {m.rating}</div>
              </div>
              <div style={{ textAlign:'right' }}><strong style={{ display:'block', fontSize:'16px' }}>₹{m.fee.toLocaleString()}</strong><span style={{ fontSize:'11px', color:'var(--muted)' }}>per session</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding:'5rem 4rem', maxWidth:'1300px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'2.2rem', marginBottom:'8px' }}>Everything you need to grow</h2>
          <p style={{ color:'var(--muted)' }}>A complete ecosystem for mentorship and professional development</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
          {[
            { icon:'🎯', title:'Smart Mentor Matching',  desc:'AI-powered algorithm matches you based on goals, skills, and learning style.' },
            { icon:'📅', title:'Seamless Scheduling',    desc:'Book sessions in real-time with calendar sync and automated reminders.' },
            { icon:'📈', title:'Progress Tracking',      desc:'Set milestones, track your growth, and view detailed analytics.' },
            { icon:'⭐', title:'Alumni Feedback',        desc:'Read authentic reviews from previous mentees before booking. Real outcomes shared.' },
            { icon:'💰', title:'Transparent Fees',       desc:'Full fee breakdown shown upfront. No hidden charges. Track all spending.' },
            { icon:'🏆', title:'Goal Achievement',       desc:'Define SMART goals, break into milestones, earn completion certificates.' },
          ].map(f => (
            <div key={f.title} className="card">
              <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'8px' }}>{f.title}</h3>
              <p style={{ fontSize:'13px', color:'var(--muted)', lineHeight:1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:'5rem 4rem', maxWidth:'1300px', margin:'0 auto', background:'#fff', borderRadius:'20px', border:'1px solid var(--border)' }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'2.2rem', marginBottom:'8px' }}>How MentorBridge works</h2>
          <p style={{ color:'var(--muted)' }}>Get started in minutes, see results in weeks</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem' }}>
          {[
            { num:'1', title:'Create profile',  desc:'Sign up, set your goals and learning style.' },
            { num:'2', title:'Read reviews',    desc:'Browse mentor profiles and read real alumni feedback.' },
            { num:'3', title:'Book session',    desc:'See full fee, pick a slot, pay securely.' },
            { num:'4', title:'Track & grow',    desc:'Log progress, hit milestones, leave a review.' },
          ].map(s => (
            <div key={s.num} style={{ textAlign:'center' }}>
              <div style={{ width:52, height:52, borderRadius:'50%', background:'var(--accent)', color:'#fff', fontFamily:'Playfair Display,serif', fontSize:'1.4rem', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>{s.num}</div>
              <h4 style={{ fontSize:'15px', fontWeight:600, marginBottom:'6px' }}>{s.title}</h4>
              <p style={{ fontSize:'13px', color:'var(--muted)', lineHeight:1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ALUMNI REVIEWS */}
      <section style={{ padding:'5rem 4rem', maxWidth:'1300px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'2.2rem', marginBottom:'8px' }}>What previous students say</h2>
          <p style={{ color:'var(--muted)' }}>Real feedback from real mentees — helping upcoming students choose with confidence</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
          {reviews.map(r => (
            <div key={r.id} className="card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                <div className="stars">{'★'.repeat(r.rating)}</div>
                <span className="tag tag-green">{r.outcome}</span>
              </div>
              <p style={{ fontSize:'14px', fontStyle:'italic', lineHeight:1.7, marginBottom:'1rem' }}>"{r.text}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div className="avatar" style={{ width:36, height:36, fontSize:'12px', background:r.color }}>{r.initials}</div>
                <div>
                  <h5 style={{ fontSize:'13px', fontWeight:600 }}>{r.mentee}</h5>
                  <span style={{ fontSize:'11px', color:'var(--muted)' }}>Mentored by {r.mentor} · {r.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'0 4rem 5rem', maxWidth:'1300px', margin:'0 auto' }}>
        <div style={{ background:'var(--primary)', borderRadius:'20px', padding:'4rem', textAlign:'center', color:'#fff' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'2rem', marginBottom:'1rem' }}>Ready to accelerate your career?</h2>
          <p style={{ color:'rgba(255,255,255,0.7)', marginBottom:'2rem' }}>Join 18,000+ learners already on their mentorship journey</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center' }}>
            <button className="btn" style={{ background:'#fff', color:'var(--primary)', fontSize:'1rem', padding:'12px 28px' }} onClick={() => setShowSignup(true)}>Start as Mentee</button>
            <button className="btn" style={{ border:'1.5px solid rgba(255,255,255,0.5)', color:'#fff', background:'transparent', fontSize:'1rem', padding:'12px 28px' }} onClick={() => setShowLogin(true)}>Become a Mentor</button>
          </div>
        </div>
      </section>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={() => setShowLogin(false)}>
          <div style={{ background:'#fff', borderRadius:'20px', padding:'2.5rem', width:'90%', maxWidth:'440px' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.6rem', marginBottom:'6px' }}>Welcome back</h2>
            <p style={{ fontSize:'14px', color:'var(--muted)', marginBottom:'1.5rem' }}>Log in to continue your journey</p>
            <div style={{ display:'flex', gap:'8px', marginBottom:'1.2rem' }}>
              {['mentee','mentor','admin'].map(r => (
                <div key={r} onClick={() => setLoginRole(r)} style={{ flex:1, padding:'10px', border:`1.5px solid ${loginRole===r?'var(--accent)':'var(--border)'}`, borderRadius:'8px', textAlign:'center', cursor:'pointer', fontSize:'13px', fontWeight:500, background:loginRole===r?'#fff0f3':'#fff', color:loginRole===r?'var(--accent)':'var(--primary)', textTransform:'capitalize' }}>{r}</div>
              ))}
            </div>
            <div style={{ marginBottom:'1rem' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Email</label>
              <input type="email" placeholder="you@example.com" style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'14px' }} />
            </div>
            <div style={{ marginBottom:'1.2rem' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Password</label>
              <input type="password" placeholder="••••••••" style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'14px' }} />
            </div>
            <button className="btn btn-primary" style={{ width:'100%', padding:'12px', fontSize:'15px', justifyContent:'center' }} onClick={handleLogin}>Log In</button>
            <p style={{ textAlign:'center', fontSize:'13px', color:'var(--muted)', marginTop:'1rem' }}>No account? <span style={{ color:'var(--accent)', cursor:'pointer' }} onClick={() => { setShowLogin(false); setShowSignup(true) }}>Sign up</span></p>
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {showSignup && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={() => setShowSignup(false)}>
          <div style={{ background:'#fff', borderRadius:'20px', padding:'2.5rem', width:'90%', maxWidth:'440px' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.6rem', marginBottom:'6px' }}>Create account</h2>
            <p style={{ fontSize:'14px', color:'var(--muted)', marginBottom:'1.5rem' }}>Join MentorBridge and start growing</p>
            <div style={{ display:'flex', gap:'8px', marginBottom:'1.2rem' }}>
              {['mentee','mentor'].map(r => (
                <div key={r} onClick={() => setSignupRole(r)} style={{ flex:1, padding:'10px', border:`1.5px solid ${signupRole===r?'var(--accent)':'var(--border)'}`, borderRadius:'8px', textAlign:'center', cursor:'pointer', fontSize:'13px', fontWeight:500, background:signupRole===r?'#fff0f3':'#fff', color:signupRole===r?'var(--accent)':'var(--primary)' }}>{r==='mentee'?"I'm a Mentee":"I'm a Mentor"}</div>
              ))}
            </div>
            {['Full Name','Email Address','Password'].map(field => (
              <div key={field} style={{ marginBottom:'1rem' }}>
                <label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>{field}</label>
                <input type={field==='Password'?'password':field==='Email Address'?'email':'text'} placeholder={field==='Full Name'?'Aisha Sharma':field==='Email Address'?'you@example.com':'Create a strong password'} style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'14px' }} />
              </div>
            ))}
            <div style={{ marginBottom:'1.2rem' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Area of Interest</label>
              <select style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'14px' }}>
                <option>Select your goal area</option>
                <option>Software Engineering</option>
                <option>Product Management</option>
                <option>Data Science / ML</option>
                <option>Design / UX</option>
                <option>Business / Entrepreneurship</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{ width:'100%', padding:'12px', fontSize:'15px', justifyContent:'center' }} onClick={() => { login({ name:'Aisha Sharma', role:signupRole }); navigate('/dashboard') }}>Create Account</button>
            <p style={{ textAlign:'center', fontSize:'13px', color:'var(--muted)', marginTop:'1rem' }}>Already have account? <span style={{ color:'var(--accent)', cursor:'pointer' }} onClick={() => { setShowSignup(false); setShowLogin(true) }}>Log in</span></p>
          </div>
        </div>
      )}
    </div>
  )
}
