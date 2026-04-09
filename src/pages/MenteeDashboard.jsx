import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const mentors = [
  { id:1, name:'Priya Raghavan', initials:'PR', color:'#e94560', role:'Senior PM · Google',         domain:'Product Strategy', tag:'teal', fee:1200, rating:4.9, reviews:42, bio:'Helping aspiring PMs break into FAANG. Expert in roadmapping and product analytics.',      latestReview:{ text:'"Priya\'s structured approach transformed how I present ideas. Got promoted in 3 months!"',         author:'Rahul Anand',    outcome:'Got promoted'     }},
  { id:2, name:'Arjun Kumar',    initials:'AK', color:'#0f3460', role:'Full-Stack Eng · Microsoft',  domain:'Web Development',  tag:'blue', fee:900,  rating:4.8, reviews:38, bio:'Full-stack mentor specializing in MERN stack, system design, and cracking SDE interviews.', latestReview:{ text:'"Arjun reviewed my code like a senior engineer. Cleared Microsoft SDE-2 on first attempt."',  author:'Divya Krishnan', outcome:'Landed job'       }},
  { id:3, name:'Sneha Mehta',    initials:'SM', color:'#f5a623', role:'Data Scientist · Flipkart',   domain:'ML & AI',          tag:'pink', fee:1500, rating:4.7, reviews:29, bio:'From EDA to deployment — mentoring aspiring data scientists end-to-end. Published 12 papers.', latestReview:{ text:'"Sneha helped me structure my first research paper. Explains complex ML math simply."',        author:'Vivek Patel',    outcome:'Published paper'  }},
  { id:4, name:'Rohit Nair',     initials:'RN', color:'#7c3aed', role:'UX Lead · Swiggy',            domain:'UX Design',        tag:'pink', fee:1100, rating:4.9, reviews:51, bio:'Helping designers build strong portfolios and break into top product companies.',           latestReview:{ text:'"Rohit\'s portfolio review was a game-changer. Got 4 job offers after 2 sessions!"',           author:'Meena Suresh',   outcome:'Got 4 offers'     }},
  { id:5, name:'Tanya Agarwal',  initials:'TA', color:'#059669', role:'Founder · EdTech Startup',    domain:'Entrepreneurship', tag:'teal', fee:2000, rating:4.6, reviews:33, bio:'Seasoned entrepreneur mentoring early-stage founders. Raised $2M seed.',                   latestReview:{ text:'"Tanya helped me go from idea to first paying customer in 6 weeks. Incredible mentor!"',     author:'Karan Malhotra', outcome:'First customer'   }},
  { id:6, name:'Vikram Rao',     initials:'VR', color:'#dc2626', role:'Finance Lead · Goldman Sachs', domain:'Investment Banking',tag:'blue', fee:1800, rating:4.5, reviews:21, bio:'Helping students break into IB. Resume reviews, behavioral prep, technical finance coaching.',latestReview:{ text:'"Vikram\'s DCF walkthrough was the best. His mock interviews got me into Goldman Sachs."',       author:'Anjali Roy',     outcome:'Cracked GS'       }},
]

const sessions = [
  { id:1, day:6,  mon:'Apr', topic:'Career Roadmap Review', mentor:'Priya Raghavan', time:'10:00 AM', status:'active',    fee:1200 },
  { id:2, day:9,  mon:'Apr', topic:'React Deep Dive',       mentor:'Arjun Kumar',    time:'4:00 PM',  status:'active',    fee:900  },
  { id:3, day:3,  mon:'Apr', topic:'Portfolio Feedback',    mentor:'Arjun Kumar',    time:'5:00 PM',  status:'completed', fee:900  },
]

const goals = [
  { id:1, title:'Complete DSA roadmap',              done:true,  progress:100 },
  { id:2, title:'Land 5 mock interview rounds',      done:true,  progress:100 },
  { id:3, title:'Master System Design fundamentals', done:false, progress:55  },
  { id:4, title:'Apply to 10 FAANG companies',       done:false, progress:20  },
  { id:5, title:'Build and deploy portfolio project',done:false, progress:40  },
]

const transactions = [
  { id:1, desc:'Priya Raghavan · Session 8', date:'Apr 3',  detail:'Portfolio Review · 1hr', amount:1200, type:'debit'  },
  { id:2, desc:'Arjun Kumar · Session 6',    date:'Mar 28', detail:'System Design · 1hr',    amount:900,  type:'debit'  },
  { id:3, desc:'Priya Raghavan · Session 7', date:'Mar 22', detail:'Career Planning · 1hr',  amount:1200, type:'debit'  },
  { id:4, desc:'Arjun Kumar · Session 5',    date:'Mar 15', detail:'React Hooks · 1hr',      amount:900,  type:'debit'  },
  { id:5, desc:'Refund · Rescheduled',       date:'Mar 10', detail:'Auto-refunded',           amount:900,  type:'credit' },
]

const navItems = [
  { id:'overview', icon:'🏠', label:'Overview'       },
  { id:'browse',   icon:'🔍', label:'Find Mentors'   },
  { id:'schedule', icon:'📅', label:'Schedule'       },
  { id:'progress', icon:'📈', label:'Progress'       },
  { id:'feedback', icon:'⭐', label:'Feedback'       },
  { id:'billing',  icon:'💳', label:'Billing & Fees' },
]

const S = (extra={}) => ({ ...extra })

export default function MenteeDashboard() {
  const [page, setPage]     = useState('overview')
  const [rating, setRating] = useState(4)
  const { user, logout }    = useAuth()
  const navigate            = useNavigate()

  const Sidebar = () => (
    <div style={{ width:260, background:'var(--primary)', color:'#fff', display:'flex', flexDirection:'column', padding:'1.8rem 1.2rem', position:'fixed', height:'100vh', overflowY:'auto', top:0, left:0 }}>
      <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.3rem', marginBottom:'2rem', paddingBottom:'1.2rem', borderBottom:'1px solid rgba(255,255,255,.12)' }}>Mentor<span style={{ color:'var(--accent)' }}>Bridge</span></div>
      {navItems.map(item => (
        <div key={item.id} onClick={() => setPage(item.id)} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px', borderRadius:'10px', cursor:'pointer', fontSize:'14px', fontWeight:500, marginBottom:'4px', background:page===item.id?'var(--accent)':'transparent', color:page===item.id?'#fff':'rgba(255,255,255,.7)', transition:'all .2s' }}>
          <span>{item.icon}</span>{item.label}
        </div>
      ))}
      <div onClick={() => { logout(); navigate('/') }} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px', borderRadius:'10px', cursor:'pointer', fontSize:'14px', color:'rgba(255,255,255,.7)', marginTop:'8px' }}>🚪 Log Out</div>
      <div style={{ marginTop:'auto', paddingTop:'1.2rem', borderTop:'1px solid rgba(255,255,255,.12)', display:'flex', alignItems:'center', gap:'10px' }}>
        <div className="avatar" style={{ background:'var(--accent)', width:38, height:38, fontSize:'13px' }}>AS</div>
        <div><div style={{ fontSize:'13px', fontWeight:600 }}>{user?.name}</div><div style={{ fontSize:'11px', color:'rgba(255,255,255,.5)' }}>Software Engineering</div></div>
      </div>
    </div>
  )

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar />
      <div style={{ marginLeft:260, flex:1, padding:'2rem', overflowX:'hidden' }}>

        {/* ── OVERVIEW ── */}
        {page==='overview' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
              <div><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Good morning, {user?.name?.split(' ')[0]} 👋</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>You have 2 upcoming sessions this week</p></div>
              <button className="btn btn-primary" onClick={() => setPage('browse')}>Find a Mentor</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'2rem' }}>
              {[['Total Sessions','14','↑ 3 this month'],['Total Spent','₹16,800','Across 2 mentors'],['Goals Completed','7/10','70% completion'],['Next Session','Apr 6','With Priya · 10 AM']].map(([l,v,s])=>(
                <div key={l} className="card"><div style={{ fontSize:'12px', color:'var(--muted)', fontWeight:500, marginBottom:'6px' }}>{l}</div><div style={{ fontSize:'1.6rem', fontFamily:'Playfair Display,serif', fontWeight:700, lineHeight:1 }}>{v}</div><div style={{ fontSize:'12px', color:'var(--success)', marginTop:6 }}>{s}</div></div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.5rem' }}>
              <div>
                <div className="card" style={{ marginBottom:'1.2rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}><h3 style={{ fontSize:'16px', fontWeight:600 }}>Upcoming Sessions</h3><span style={{ fontSize:'13px', color:'var(--accent)', cursor:'pointer' }} onClick={()=>setPage('schedule')}>View calendar →</span></div>
                  {sessions.map(s=>(
                    <div key={s.id} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                      <div style={{ width:48, height:48, background:'var(--light)', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}><div style={{ fontSize:'16px', fontWeight:700 }}>{s.day}</div><div style={{ fontSize:'10px', color:'var(--muted)', textTransform:'uppercase' }}>{s.mon}</div></div>
                      <div style={{ flex:1 }}><h4 style={{ fontSize:'14px', fontWeight:600 }}>{s.topic}</h4><p style={{ fontSize:'12px', color:'var(--muted)' }}>With {s.mentor} · {s.time}</p></div>
                      <div style={{ textAlign:'right' }}><span className={`status-pill status-${s.status}`}>{s.status}</span><div style={{ fontSize:'12px', color:'var(--muted)', marginTop:4 }}>₹{s.fee}</div></div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}><h3 style={{ fontSize:'16px', fontWeight:600 }}>My Mentors</h3><span style={{ fontSize:'13px', color:'var(--accent)', cursor:'pointer' }} onClick={()=>setPage('browse')}>Browse all →</span></div>
                  {mentors.slice(0,2).map(m=>(
                    <div key={m.id} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                      <div className="avatar" style={{ background:m.color }}>{m.initials}</div>
                      <div style={{ flex:1 }}><h4 style={{ fontSize:'14px', fontWeight:600 }}>{m.name}</h4><p style={{ fontSize:'12px', color:'var(--muted)' }}>{m.role}</p><span className={`tag tag-${m.tag}`}>{m.domain}</span></div>
                      <div style={{ textAlign:'right' }}><div className="stars">★ {m.rating}</div><div style={{ fontSize:'13px', fontWeight:600, marginTop:4 }}>₹{m.fee}/session</div><button className="btn btn-outline" style={{ fontSize:'12px', padding:'4px 10px', marginTop:6 }} onClick={()=>setPage('schedule')}>Schedule</button></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="card" style={{ marginBottom:'1.2rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}><h3 style={{ fontSize:'16px', fontWeight:600 }}>Goal Progress</h3><span style={{ fontSize:'13px', color:'var(--accent)', cursor:'pointer' }} onClick={()=>setPage('progress')}>Details →</span></div>
                  {[['DSA Mastery',80,'var(--accent)'],['System Design',55,'var(--success)'],['Mock Interviews',70,'var(--gold)']].map(([l,p,c])=>(
                    <div key={l} style={{ marginBottom:'1rem' }}><div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'6px' }}><span>{l}</span><span style={{ color:'var(--muted)' }}>{p}%</span></div><div className="progress-bar"><div className="progress-fill" style={{ width:`${p}%`, background:c }}></div></div></div>
                  ))}
                </div>
                <div className="card">
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Fee Summary</h3>
                  <div style={{ background:'var(--primary)', borderRadius:'10px', padding:'1.2rem', textAlign:'center', color:'#fff', marginBottom:'1rem' }}><div style={{ fontSize:'12px', color:'rgba(255,255,255,.6)', marginBottom:4 }}>Total Invested</div><div style={{ fontSize:'1.8rem', fontFamily:'Playfair Display,serif' }}>₹16,800</div><div style={{ fontSize:'11px', color:'rgba(255,255,255,.5)', marginTop:4 }}>Across 14 sessions</div></div>
                  {[['Priya Raghavan',8,1200,9600],['Arjun Kumar',6,900,5400]].map(([name,s,f,t])=>(
                    <div key={name} style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', padding:'8px 0', borderBottom:'1px solid var(--border)' }}><div><div style={{ fontWeight:600 }}>{name}</div><div style={{ color:'var(--muted)', fontSize:'11px' }}>{s} sessions × ₹{f}</div></div><div style={{ fontWeight:600, color:'var(--accent)' }}>₹{t.toLocaleString()}</div></div>
                  ))}
                  <button className="btn btn-outline" style={{ width:'100%', marginTop:'1rem', justifyContent:'center' }} onClick={()=>setPage('billing')}>View Full Billing</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BROWSE ── */}
        {page==='browse' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Find Mentors</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Browse expert mentors — read peer reviews & see full fees upfront</p></div>
            <div style={{ display:'flex', gap:'1rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
              <input type="text" placeholder="Search by name, skill or company..." style={{ flex:1, minWidth:200, padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'14px' }} />
              {['All','Engineering','Product','Data Science','Design'].map(f=><button key={f} className="btn btn-outline" style={{ fontSize:'13px', padding:'8px 16px' }}>{f}</button>)}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.2rem' }}>
              {mentors.map(m=>(
                <div key={m.id} className="card">
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                    <div className="avatar" style={{ background:m.color, width:52, height:52, fontSize:'16px' }}>{m.initials}</div>
                    <div><h4 style={{ fontSize:'15px', fontWeight:600 }}>{m.name}</h4><p style={{ fontSize:'12px', color:'var(--muted)' }}>{m.role}</p><div className="stars" style={{ fontSize:'12px' }}>★ {m.rating} ({m.reviews} reviews)</div></div>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                    <span className={`tag tag-${m.tag}`}>{m.domain}</span>
                    <div style={{ textAlign:'right' }}><strong style={{ fontSize:'16px' }}>₹{m.fee.toLocaleString()}</strong><span style={{ fontSize:'11px', color:'var(--muted)', display:'block' }}>per session</span></div>
                  </div>
                  <p style={{ fontSize:'12px', color:'var(--muted)', lineHeight:1.6, marginBottom:'1rem' }}>{m.bio}</p>
                  {/* ALUMNI REVIEW */}
                  <div style={{ background:'var(--light)', borderRadius:'8px', padding:'10px', marginBottom:'1rem', borderLeft:'3px solid var(--accent)' }}>
                    <p style={{ fontSize:'12px', fontStyle:'italic', lineHeight:1.5 }}>{m.latestReview.text}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
                      <span style={{ fontSize:'11px', color:'var(--muted)' }}>— {m.latestReview.author}</span>
                      <span className="tag tag-green" style={{ fontSize:'10px' }}>{m.latestReview.outcome}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={()=>setPage('schedule')}>Book Session — ₹{m.fee.toLocaleString()}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SCHEDULE ── */}
        {page==='schedule' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Schedule a Session</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Pick a date and time that works for you</p></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'1.5rem' }}>
              <div className="card">
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}><h3 style={{ fontSize:'16px', fontWeight:600 }}>April 2025</h3><div style={{ display:'flex', gap:'8px' }}><button className="btn btn-outline" style={{ padding:'6px 12px', fontSize:'13px' }}>← Prev</button><button className="btn btn-outline" style={{ padding:'6px 12px', fontSize:'13px' }}>Next →</button></div></div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} style={{ textAlign:'center', fontSize:'11px', fontWeight:600, color:'var(--muted)', padding:'6px 0' }}>{d}</div>)}
                  {[30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((day,i)=>(
                    <div key={i} style={{ aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', fontSize:'13px', cursor:'pointer', background:day===14?'var(--accent)':[4,6,9].includes(day)&&i>6?'#fff0f3':'transparent', color:day===14?'#fff':[4,6,9].includes(day)&&i>6?'var(--accent)':'var(--primary)', fontWeight:[14,4,6,9].includes(day)?600:400 }}>{day}</div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Available Slots — Apr 14</h3>
                <div style={{ marginBottom:'1rem' }}>
                  <label style={{ fontSize:'12px', fontWeight:600, marginBottom:'6px', display:'block' }}>Select Mentor</label>
                  <select style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'13px' }}>
                    <option>Priya Raghavan — ₹1,200/hr</option>
                    <option>Arjun Kumar — ₹900/hr</option>
                    <option>Sneha Mehta — ₹1,500/hr</option>
                  </select>
                </div>
                {[['9:00 AM – 10:00 AM',true],['10:00 AM – 11:00 AM',false],['11:00 AM – 12:00 PM',false],['2:00 PM – 3:00 PM',false],['5:00 PM – 6:00 PM',true]].map(([time,booked])=>(
                  <div key={time} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px', borderRadius:'10px', border:'1.5px solid var(--border)', cursor:booked?'not-allowed':'pointer', marginBottom:'8px', background:booked?'var(--light)':'#fff', color:booked?'var(--muted)':'var(--primary)', fontSize:'13px' }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:booked?'var(--muted)':'var(--success)', flexShrink:0 }}></div>
                    {time}{booked&&<span style={{ marginLeft:'auto', fontSize:'11px' }}>Booked</span>}
                  </div>
                ))}
                <div style={{ background:'var(--light)', borderRadius:'10px', padding:'1rem', margin:'1rem 0' }}>
                  {[['Session fee','₹1,200'],['Platform fee','₹60'],['Total','₹1,260']].map(([l,v],i)=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:i===2?'15px':'13px', fontWeight:i===2?600:400, borderTop:i===2?'1px solid var(--border)':'none', paddingTop:i===2?'8px':'0', marginBottom:i===2?0:'6px' }}><span>{l}</span><span>{v}</span></div>
                  ))}
                </div>
                <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'12px' }} onClick={()=>alert('Session booked! Check your email.')}>Confirm Booking — ₹1,260</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PROGRESS ── */}
        {page==='progress' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Progress Tracker</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Track your milestones and development journey</p></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
              <div className="card">
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}><h3 style={{ fontSize:'16px', fontWeight:600 }}>My Goals</h3><button className="btn btn-primary" style={{ fontSize:'12px', padding:'6px 14px' }}>+ Add Goal</button></div>
                {goals.map(g=>(
                  <div key={g.id} style={{ display:'flex', gap:'1rem', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ width:24, height:24, borderRadius:'50%', border:`2px solid ${g.done?'var(--success)':'var(--border)'}`, background:g.done?'var(--success)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color:'#fff', flexShrink:0 }}>{g.done?'✓':''}</div>
                    <div style={{ flex:1 }}>
                      <h4 style={{ fontSize:'14px', fontWeight:600, color:g.done?'var(--muted)':'var(--primary)', textDecoration:g.done?'line-through':'none' }}>{g.title}</h4>
                      <div style={{ marginTop:6 }}><div className="progress-bar" style={{ height:6 }}><div className="progress-fill" style={{ width:`${g.progress}%`, background:g.done?'var(--success)':'var(--accent)' }}></div></div><span style={{ fontSize:'11px', color:'var(--muted)' }}>{g.progress}% complete</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="card" style={{ marginBottom:'1.2rem' }}>
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Skill Growth</h3>
                  {[['DSA & Algorithms',80,'var(--accent)'],['System Design',55,'var(--success)'],['Mock Interviews',70,'var(--gold)'],['Portfolio Project',40,'#a78bfa']].map(([l,p,c])=>(
                    <div key={l} style={{ marginBottom:'1rem' }}><div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'6px' }}><span>{l}</span><span style={{ color:'var(--muted)' }}>{p}%</span></div><div className="progress-bar"><div className="progress-fill" style={{ width:`${p}%`, background:c }}></div></div></div>
                  ))}
                </div>
                <div className="card">
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Journey Milestones</h3>
                  {[['Joined MentorBridge','Jan 10 · First session booked',true,false],['Completed 5 sessions','Feb 5 · Unlocked Pro badge',true,false],['DSA Goal Achieved 🎉','Mar 31 · Milestone completed',true,true],['FAANG Interview Ready','Target: May 2025',false,false]].map(([l,s,done,cur],i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'1rem', padding:'8px 0' }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                        <div style={{ width:14, height:14, borderRadius:'50%', border:`2px solid ${done?(cur?'var(--accent)':'var(--success)'):'var(--border)'}`, background:done?(cur?'var(--accent)':'var(--success)'):'transparent', flexShrink:0 }}></div>
                        {i<3&&<div style={{ width:2, background:'var(--border)', height:24, margin:'2px 0' }}></div>}
                      </div>
                      <div><h4 style={{ fontSize:'14px', fontWeight:600, color:done?'var(--primary)':'var(--muted)' }}>{l}</h4><p style={{ fontSize:'12px', color:'var(--muted)' }}>{s}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FEEDBACK ── */}
        {page==='feedback' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Feedback & Reviews</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Your reviews help future students choose the right mentor</p></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Leave a Review</h3>
                <div style={{ marginBottom:'1rem' }}><label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Select Mentor</label><select style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'13px' }}><option>Priya Raghavan</option><option>Arjun Kumar</option></select></div>
                <div style={{ marginBottom:'1rem' }}><label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Rating</label><div style={{ display:'flex', gap:'6px' }}>{[1,2,3,4,5].map(s=><span key={s} onClick={()=>setRating(s)} style={{ fontSize:'1.8rem', cursor:'pointer', color:s<=rating?'var(--gold)':'var(--border)', transition:'color .1s' }}>★</span>)}</div></div>
                <div style={{ marginBottom:'1rem' }}><label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Outcome achieved</label><input type="text" placeholder="e.g. Got promoted, Landed interview, Published paper..." style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'13px' }} /></div>
                <div style={{ marginBottom:'1.2rem' }}><label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Your Review <span style={{ color:'var(--muted)', fontWeight:400 }}>(visible to future mentees)</span></label><textarea placeholder="Share your experience honestly — this helps others make the right choice..." style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'13px', minHeight:100, resize:'vertical' }} /></div>
                <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={()=>alert('Review submitted! Thank you for helping the community.')}>Submit Review</button>
              </div>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>My Previous Reviews</h3>
                {[['Arjun Kumar','Mar 28',5,"Arjun's code review was incredibly detailed. He spotted bugs I'd been missing for days.",'Got job offer'],['Priya Raghavan','Mar 15',5,'The roadmap Priya helped me build has been my north star. Structured and results-driven.','Career clarity']].map(([mentor,date,r,text,outcome],i)=>(
                  <div key={i} style={{ background:'var(--light)', borderRadius:'10px', padding:'1rem', marginBottom:'1rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}><strong style={{ fontSize:'14px' }}>{mentor}</strong><div className="stars">{'★'.repeat(r)}</div></div>
                    <p style={{ fontSize:'13px', lineHeight:1.6, marginBottom:'8px' }}>{text}</p>
                    <span className="tag tag-green">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BILLING ── */}
        {page==='billing' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Billing & Fees</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Full transparency on every session you have invested in</p></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Transaction History</h3>
                {transactions.map(t=>(
                  <div key={t.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                    <div><h4 style={{ fontSize:'14px', fontWeight:600 }}>{t.desc}</h4><p style={{ fontSize:'12px', color:'var(--muted)' }}>{t.date} · {t.detail}</p></div>
                    <div style={{ fontSize:'15px', fontWeight:600, color:t.type==='credit'?'var(--success)':'var(--accent)' }}>{t.type==='credit'?'+':'−'}₹{t.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="card" style={{ marginBottom:'1.2rem' }}>
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Spending Summary</h3>
                  <div style={{ background:'var(--primary)', borderRadius:'10px', padding:'1.5rem', textAlign:'center', color:'#fff', marginBottom:'1rem' }}><div style={{ fontSize:'12px', color:'rgba(255,255,255,.6)', marginBottom:4 }}>Total Invested</div><div style={{ fontSize:'2rem', fontFamily:'Playfair Display,serif' }}>₹16,800</div><div style={{ fontSize:'11px', color:'rgba(255,255,255,.5)', marginTop:4 }}>Across 14 sessions</div></div>
                  {[['Priya Raghavan',57,'var(--accent)'],['Arjun Kumar',43,'var(--success)']].map(([name,pct,c])=>(
                    <div key={name} style={{ marginBottom:'1rem' }}><div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'6px' }}><span>{name}</span><span style={{ color:'var(--muted)' }}>{pct}%</span></div><div className="progress-bar"><div className="progress-fill" style={{ width:`${pct}%`, background:c }}></div></div></div>
                  ))}
                </div>
                <div className="card">
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Fee Breakdown</h3>
                  {[['Session Fees (14 sessions)','₹16,200',false,false],['Platform Fees (5%)','₹810',false,false],['Refunds','−₹900',false,true],['Grand Total Paid','₹16,110',true,false]].map(([l,v,bold,red])=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:bold?'15px':'13px', fontWeight:bold?700:400, borderTop:bold?'2px solid var(--primary)':'none', padding:'8px 0', borderBottom:bold?'none':'1px solid var(--border)' }}><span>{l}</span><span style={{ color:red?'var(--success)':'var(--primary)' }}>{v}</span></div>
                  ))}
                  <button className="btn btn-outline" style={{ width:'100%', marginTop:'1rem', justifyContent:'center' }}>Download Invoice PDF</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
