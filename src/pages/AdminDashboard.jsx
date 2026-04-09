import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const mentorsList = [
  { name:'Priya Raghavan', initials:'PR', color:'#e94560', company:'Google · PM',       domain:'Product',    sessions:142, rating:4.9, fee:1200, revenue:170400, status:'active'  },
  { name:'Arjun Kumar',    initials:'AK', color:'#0f3460', company:'Microsoft · SDE',   domain:'Engineering',sessions:198, rating:4.8, fee:900,  revenue:178200, status:'active'  },
  { name:'Sneha Mehta',    initials:'SM', color:'#f5a623', company:'Flipkart · DS',     domain:'ML/AI',      sessions:89,  rating:4.7, fee:1500, revenue:133500, status:'active'  },
  { name:'Rohit Nair',     initials:'RN', color:'#7c3aed', company:'Swiggy · UX',       domain:'Design',     sessions:201, rating:4.9, fee:1100, revenue:221100, status:'active'  },
  { name:'Kavya Nair',     initials:'KN', color:'#059669', company:'Freelance · UX',    domain:'Design',     sessions:0,   rating:0,   fee:800,  revenue:0,      status:'pending' },
]

const sessionsList = [
  { mentee:'Aisha Sharma',   mi:'AS', mc:'#e94560', mentor:'Priya Raghavan', topic:'Portfolio Review',  date:'Apr 3',  fee:1200, status:'completed', rating:'★★★★★' },
  { mentee:'Rohan Mehta',    mi:'RM', mc:'#7c3aed', mentor:'Arjun Kumar',    topic:'React Deep Dive',   date:'Apr 4',  fee:900,  status:'active',    rating:'—'     },
  { mentee:'Divya Krishnan', mi:'DK', mc:'#059669', mentor:'Sneha Mehta',    topic:'ML Model Review',   date:'Apr 5',  fee:1500, status:'pending',   rating:'—'     },
  { mentee:'Karan Malhotra', mi:'KM', mc:'#dc2626', mentor:'Tanya Agarwal',  topic:'Startup Pitch',     date:'Apr 4',  fee:2000, status:'completed', rating:'★★★★★' },
  { mentee:'Anjali Roy',     mi:'AR', mc:'#f59e0b', mentor:'Vikram Rao',     topic:'IB Interview Prep', date:'Mar 31', fee:1800, status:'cancelled', rating:'—'     },
]

const matchesList = [
  { mentee:'Aisha Sharma',mI:'AS',mC:'#e94560', mentor:'Priya Raghavan',mnI:'PR',mnC:'#e94560', score:96, domain:'Product',    sessions:'8/12', status:'active'    },
  { mentee:'Rohan Mehta', mI:'RM',mC:'#7c3aed', mentor:'Arjun Kumar',   mnI:'AK',mnC:'#0f3460', score:91, domain:'Engineering',sessions:'5/10', status:'active'    },
  { mentee:'Vivek Patel', mI:'VP',mC:'#059669', mentor:'Sneha Mehta',   mnI:'SM',mnC:'#f5a623', score:88, domain:'ML/AI',      sessions:'10/10',status:'completed' },
  { mentee:'Neha Kapoor', mI:'NK',mC:'#dc2626', mentor:'—',             mnI:'?', mnC:'#ccc',    score:0,  domain:'Design',     sessions:'0',    status:'pending'   },
]

const navItems = [
  { id:'overview', icon:'🏠', label:'Overview'         },
  { id:'matching', icon:'🔗', label:'Mentor Matching'  },
  { id:'sessions', icon:'📅', label:'Sessions'         },
  { id:'mentors',  icon:'👨‍🏫', label:'Mentors'          },
  { id:'mentees',  icon:'🎓', label:'Mentees'          },
  { id:'progress', icon:'📈', label:'Progress Reports' },
  { id:'revenue',  icon:'💰', label:'Revenue & Fees'   },
  { id:'reviews',  icon:'⭐', label:'Reviews'          },
]

const TH = ({ cols }) => (
  <thead><tr>{cols.map(c=><th key={c} style={{ textAlign:'left', fontSize:'11px', fontWeight:600, color:'var(--muted)', textTransform:'uppercase', padding:'8px 12px', borderBottom:'1px solid var(--border)' }}>{c}</th>)}</tr></thead>
)

export default function AdminDashboard() {
  const [page, setPage]           = useState('overview')
  const [showModal, setShowModal] = useState(false)
  const { logout }                = useAuth()
  const navigate                  = useNavigate()

  const Sidebar = () => (
    <div style={{ width:260, background:'var(--teal)', color:'#fff', display:'flex', flexDirection:'column', padding:'1.8rem 1.2rem', position:'fixed', height:'100vh', overflowY:'auto', top:0, left:0 }}>
      <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.3rem', marginBottom:'6px' }}>Mentor<span style={{ color:'var(--gold)' }}>Bridge</span></div>
      <div style={{ fontSize:'11px', background:'rgba(245,166,35,.2)', color:'var(--gold)', padding:'2px 10px', borderRadius:'20px', fontWeight:600, marginBottom:'1.8rem', display:'inline-block', width:'fit-content' }}>ADMIN PANEL</div>
      {navItems.map(item=>(
        <div key={item.id} onClick={()=>setPage(item.id)} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px', borderRadius:'10px', cursor:'pointer', fontSize:'14px', fontWeight:500, marginBottom:'4px', background:page===item.id?'var(--gold)':'transparent', color:page===item.id?'var(--primary)':'rgba(255,255,255,.7)', transition:'all .2s' }}>
          <span>{item.icon}</span>{item.label}
        </div>
      ))}
      <div onClick={()=>{ logout(); navigate('/') }} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px', borderRadius:'10px', cursor:'pointer', fontSize:'14px', color:'rgba(255,255,255,.7)', marginTop:'8px' }}>🚪 Back to Home</div>
      <div style={{ marginTop:'auto', paddingTop:'1.2rem', borderTop:'1px solid rgba(255,255,255,.12)', display:'flex', alignItems:'center', gap:'10px' }}>
        <div className="avatar" style={{ background:'var(--gold)', width:38, height:38, fontSize:'13px', color:'var(--primary)' }}>AD</div>
        <div><div style={{ fontSize:'13px', fontWeight:600 }}>Admin User</div><div style={{ fontSize:'11px', color:'rgba(255,255,255,.5)' }}>Platform Administrator</div></div>
      </div>
    </div>
  )

  const StatCards = ({ items }) => (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:'1rem', marginBottom:'2rem' }}>
      {items.map(([l,v,s,red])=>(
        <div key={l} className="card"><div style={{ fontSize:'12px', color:'var(--muted)', fontWeight:500, marginBottom:'6px' }}>{l}</div><div style={{ fontSize:'1.6rem', fontFamily:'Playfair Display,serif', fontWeight:700, color:red?'var(--accent)':'var(--primary)' }}>{v}</div><div style={{ fontSize:'12px', color:'var(--success)', marginTop:6 }}>{s}</div></div>
      ))}
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
              <div><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Platform Overview</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Real-time metrics — April 2025</p></div>
              <button className="btn btn-gold" onClick={()=>setPage('matching')}>+ New Match</button>
            </div>
            <StatCards items={[['Active Mentors','2,408','↑ 12 this week'],['Active Mentees','18,632','↑ 340 this week'],['Sessions This Month','1,847','↑ 23% vs last month'],['Platform Revenue','₹9.2L','↑ 18% this month']]} />
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.5rem' }}>
              <div>
                <div className="card" style={{ marginBottom:'1.2rem' }}>
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Recent Sessions</h3>
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <TH cols={['Mentee','Mentor','Date','Fee','Status']} />
                    <tbody>{sessionsList.slice(0,4).map((s,i)=>(
                      <tr key={i}>
                        <td style={{ padding:'12px', fontSize:'13px' }}><div style={{ display:'flex', alignItems:'center', gap:'8px' }}><div className="avatar" style={{ background:s.mc, width:28, height:28, fontSize:'10px' }}>{s.mi}</div>{s.mentee}</div></td>
                        <td style={{ padding:'12px', fontSize:'13px' }}>{s.mentor}</td>
                        <td style={{ padding:'12px', fontSize:'13px' }}>{s.date}</td>
                        <td style={{ padding:'12px', fontSize:'13px' }}>₹{s.fee.toLocaleString()}</td>
                        <td style={{ padding:'12px' }}><span className={`status-pill status-${s.status}`}>{s.status}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="card">
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.5rem' }}>Sessions per Week (April)</h3>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:'12px', height:120 }}>
                    {[[312,'Wk 1',60,'var(--accent)'],[375,'Wk 2',72,'var(--accent)'],[458,'Wk 3',88,'var(--teal)'],[517,'Wk 4',100,'var(--accent)'],[185,'Wk 5',36,'var(--gold)']].map(([v,l,p,c],i)=>(
                      <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, height:'100%', justifyContent:'flex-end' }}>
                        <span style={{ fontSize:'11px', fontWeight:600 }}>{v}</span>
                        <div style={{ width:'100%', height:`${p}%`, background:c, borderRadius:'4px 4px 0 0' }}></div>
                        <span style={{ fontSize:'11px', color:'var(--muted)' }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="card" style={{ marginBottom:'1.2rem' }}>
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Pending Approvals</h3>
                  {[['New Mentor Application','Kavya Nair · UX Designer','approval'],['Session Dispute','Mentee: Karan · Mentor: Rohit','review'],['Refund Request','Anjali Roy · ₹1,800','review']].map(([title,sub,type],i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px', background:'var(--light)', borderRadius:'8px', marginBottom:'8px' }}>
                      <div><div style={{ fontSize:'13px', fontWeight:600 }}>{title}</div><div style={{ fontSize:'11px', color:'var(--muted)' }}>{sub}</div></div>
                      {type==='approval'?<div style={{ display:'flex', gap:'4px' }}><button className="btn" style={{ background:'#ecfdf5', color:'#065f46', border:'1px solid #a7f3d0', fontSize:'12px', padding:'4px 8px' }}>✓</button><button className="btn" style={{ background:'#fee2e2', color:'#991b1b', border:'1px solid #fca5a5', fontSize:'12px', padding:'4px 8px' }}>✕</button></div>:<button className="btn btn-outline" style={{ fontSize:'12px', padding:'4px 10px' }}>Review</button>}
                    </div>
                  ))}
                </div>
                <div className="card">
                  <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1rem' }}>Top Mentors</h3>
                  {mentorsList.filter(m=>m.status==='active').slice(0,3).map((m,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                      <div className="avatar" style={{ background:m.color, width:32, height:32, fontSize:'11px' }}>{m.initials}</div>
                      <div style={{ flex:1 }}><div style={{ fontSize:'13px', fontWeight:600 }}>{m.name}</div><div className="stars" style={{ fontSize:'12px' }}>★ {m.rating}</div></div>
                      <span style={{ fontSize:'12px', color:'var(--muted)' }}>{m.sessions} sessions</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MATCHING ── */}
        {page==='matching' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
              <div><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Mentor Matching</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>AI-assisted matching based on goals, skills, and compatibility</p></div>
              <button className="btn btn-gold" onClick={()=>setShowModal(true)}>+ Create Match</button>
            </div>
            <div className="card" style={{ marginBottom:'1.5rem' }}>
              <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Current Matches</h3>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <TH cols={['Mentee','Mentor','Match Score','Domain','Sessions','Status','Action']} />
                <tbody>{matchesList.map((m,i)=>(
                  <tr key={i}>
                    <td style={{ padding:'12px', fontSize:'13px' }}><div style={{ display:'flex', alignItems:'center', gap:'8px' }}><div className="avatar" style={{ background:m.mC, width:28, height:28, fontSize:'10px' }}>{m.mI}</div>{m.mentee}</div></td>
                    <td style={{ padding:'12px', fontSize:'13px' }}><div style={{ display:'flex', alignItems:'center', gap:'8px' }}><div className="avatar" style={{ background:m.mnC, width:28, height:28, fontSize:'10px' }}>{m.mnI}</div>{m.mentor}</div></td>
                    <td style={{ padding:'12px', fontSize:'13px', fontWeight:700, color:m.score>=90?'var(--success)':m.score>=80?'var(--gold)':'var(--muted)' }}>{m.score?`${m.score}%`:'—'}</td>
                    <td style={{ padding:'12px' }}><span className="tag tag-teal">{m.domain}</span></td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{m.sessions}</td>
                    <td style={{ padding:'12px' }}><span className={`status-pill status-${m.status}`}>{m.status}</span></td>
                    <td style={{ padding:'12px' }}>{m.status==='pending'?<button className="btn btn-primary" style={{ fontSize:'12px', padding:'4px 10px' }} onClick={()=>setShowModal(true)}>Match Now</button>:<button className="btn btn-outline" style={{ fontSize:'12px', padding:'4px 10px' }}>Manage</button>}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div className="card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}><h3 style={{ fontSize:'16px', fontWeight:600 }}>Smart Match Preview</h3><span style={{ fontSize:'12px', color:'var(--muted)' }}>AI-suggested based on goals & availability</span></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 40px 1fr', gap:'1rem', alignItems:'center', marginBottom:'1rem' }}>
                <div style={{ background:'var(--light)', borderRadius:'var(--radius)', padding:'1.2rem', border:'1px solid var(--border)' }}><div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}><div className="avatar" style={{ background:'#dc2626' }}>NK</div><div><div style={{ fontSize:'14px', fontWeight:600 }}>Neha Kapoor</div><div style={{ fontSize:'12px', color:'var(--muted)' }}>Goal: UX Portfolio</div></div></div><div style={{ fontSize:'12px', color:'var(--muted)', lineHeight:1.6 }}>Skills: Figma, Adobe XD<br/>Availability: Evenings<br/>Budget: ₹1,000-1,500/session</div></div>
                <div style={{ textAlign:'center', fontSize:'1.5rem', color:'var(--accent)' }}>⇄</div>
                <div style={{ background:'var(--light)', borderRadius:'var(--radius)', padding:'1.2rem', border:'1px solid var(--border)' }}><div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}><div className="avatar" style={{ background:'#7c3aed' }}>RN</div><div><div style={{ fontSize:'14px', fontWeight:600 }}>Rohit Nair</div><div style={{ fontSize:'12px', color:'var(--muted)' }}>UX Lead · Swiggy</div></div></div><div style={{ fontSize:'12px', color:'var(--muted)', lineHeight:1.6 }}>Expertise: Portfolio Review<br/>Availability: Evenings<br/>Rate: ₹1,100/session</div></div>
              </div>
              <div style={{ background:'var(--primary)', borderRadius:'10px', padding:'1rem 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', color:'#fff' }}>
                <div><div style={{ fontSize:'12px', color:'rgba(255,255,255,.6)' }}>Match Compatibility</div><div style={{ fontSize:'2rem', fontFamily:'Playfair Display,serif', fontWeight:700 }}>94%</div></div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,.8)', lineHeight:1.8 }}>Goal alignment: 98%<br/>Schedule fit: 95%<br/>Budget match: 90%</div>
                <button className="btn" style={{ background:'#fff', color:'var(--accent)' }} onClick={()=>alert('Match confirmed! Both parties notified.')}>Confirm Match</button>
              </div>
            </div>
          </div>
        )}

        {/* ── SESSIONS ── */}
        {page==='sessions' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Session Management</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Monitor and manage all mentorship sessions</p></div>
            <StatCards items={[['Scheduled Today','47','8 currently live'],['This Week','312','↑ vs 289 last week'],['Completion Rate','96.4%','Industry avg: 88%'],['Avg Rating','4.8 ★','From 1,847 sessions']]} />
            <div className="card">
              <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>All Sessions</h3>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <TH cols={['Mentee','Mentor','Topic','Date','Fee','Status','Rating']} />
                <tbody>{sessionsList.map((s,i)=>(
                  <tr key={i}>
                    <td style={{ padding:'12px', fontSize:'13px' }}><div style={{ display:'flex', alignItems:'center', gap:'8px' }}><div className="avatar" style={{ background:s.mc, width:28, height:28, fontSize:'10px' }}>{s.mi}</div>{s.mentee}</div></td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{s.mentor}</td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{s.topic}</td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{s.date}</td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>₹{s.fee.toLocaleString()}</td>
                    <td style={{ padding:'12px' }}><span className={`status-pill status-${s.status}`}>{s.status}</span></td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{s.rating}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MENTORS ── */}
        {page==='mentors' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}><div><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Mentor Management</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Approve, manage, and track all mentors</p></div><button className="btn btn-primary">+ Add Mentor</button></div>
            <div className="card">
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <TH cols={['Mentor','Domain','Sessions','Rating','Fee/Session','Revenue','Status','']} />
                <tbody>{mentorsList.map((m,i)=>(
                  <tr key={i}>
                    <td style={{ padding:'12px' }}><div style={{ display:'flex', alignItems:'center', gap:'10px' }}><div className="avatar" style={{ background:m.color, width:32, height:32, fontSize:'11px' }}>{m.initials}</div><div><div style={{ fontSize:'13px', fontWeight:600 }}>{m.name}</div><div style={{ fontSize:'11px', color:'var(--muted)' }}>{m.company}</div></div></div></td>
                    <td style={{ padding:'12px' }}><span className="tag tag-teal">{m.domain}</span></td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{m.sessions}</td>
                    <td style={{ padding:'12px', fontSize:'13px' }}><span className="stars">{m.rating?`★ ${m.rating}`:'—'}</span></td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>₹{m.fee.toLocaleString()}</td>
                    <td style={{ padding:'12px', fontSize:'13px', fontWeight:600 }}>{m.revenue?`₹${m.revenue.toLocaleString()}`:'—'}</td>
                    <td style={{ padding:'12px' }}><span className={`status-pill status-${m.status}`}>{m.status}</span></td>
                    <td style={{ padding:'12px' }}>{m.status==='pending'?<div style={{ display:'flex', gap:'4px' }}><button className="btn" style={{ background:'#ecfdf5', color:'#065f46', border:'1px solid #a7f3d0', fontSize:'12px', padding:'4px 8px' }}>Approve</button><button className="btn" style={{ background:'#fee2e2', color:'#991b1b', border:'1px solid #fca5a5', fontSize:'12px', padding:'4px 8px' }}>Reject</button></div>:<button className="btn btn-outline" style={{ fontSize:'12px', padding:'4px 10px' }}>View</button>}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MENTEES ── */}
        {page==='mentees' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Mentee Management</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Track mentee journeys and engagement</p></div>
            <div className="card">
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <TH cols={['Mentee','Domain','Mentor','Sessions','Total Spent','Progress','Status']} />
                <tbody>{[
                  { name:'Aisha Sharma',   i:'AS', c:'#e94560', domain:'Engineering', mentor:'Priya + Arjun', s:14, spent:16800, p:70,  status:'active'    },
                  { name:'Rohan Mehta',    i:'RM', c:'#7c3aed', domain:'Engineering', mentor:'Arjun Kumar',  s:5,  spent:4500,  p:42,  status:'active'    },
                  { name:'Vivek Patel',    i:'VP', c:'#059669', domain:'ML/AI',       mentor:'Sneha Mehta', s:10, spent:15000, p:100, status:'completed' },
                  { name:'Divya Krishnan', i:'DK', c:'#dc2626', domain:'Engineering', mentor:'Arjun Kumar',  s:8,  spent:7200,  p:85,  status:'active'    },
                ].map((m,i)=>(
                  <tr key={i}>
                    <td style={{ padding:'12px' }}><div style={{ display:'flex', alignItems:'center', gap:'8px' }}><div className="avatar" style={{ background:m.c, width:30, height:30, fontSize:'10px' }}>{m.i}</div><div style={{ fontSize:'13px', fontWeight:600 }}>{m.name}</div></div></td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{m.domain}</td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{m.mentor}</td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{m.s}</td>
                    <td style={{ padding:'12px', fontSize:'13px', fontWeight:600 }}>₹{m.spent.toLocaleString()}</td>
                    <td style={{ padding:'12px', width:120 }}><div style={{ fontSize:'11px', marginBottom:4 }}>{m.p}%</div><div className="progress-bar" style={{ height:6 }}><div className="progress-fill" style={{ width:`${m.p}%`, background:m.p===100?'var(--success)':'var(--accent)' }}></div></div></td>
                    <td style={{ padding:'12px' }}><span className={`status-pill status-${m.status}`}>{m.status}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PROGRESS REPORTS ── */}
        {page==='progress' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Progress Reports</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Platform-wide goal achievement and development metrics</p></div>
            <StatCards items={[['Avg Goal Completion','74%','↑ 6% vs last quarter'],['Goals Set This Month','2,847','↑ 340 vs March'],['Goals Completed','1,940','68.2% completion rate'],['Career Outcomes','1,200+','Job placements this year']]} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Goal Achievement by Domain</h3>
                {[['Software Engineering',82,'var(--accent)'],['Product Management',78,'var(--teal)'],['Data Science / ML',71,'var(--gold)'],['UX Design',88,'#7c3aed'],['Entrepreneurship',62,'var(--success)']].map(([l,p,c])=>(
                  <div key={l} style={{ marginBottom:'1rem' }}><div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'6px' }}><span>{l}</span><span style={{ color:'var(--muted)' }}>{p}%</span></div><div className="progress-bar" style={{ height:10 }}><div className="progress-fill" style={{ width:`${p}%`, background:c }}></div></div></div>
                ))}
              </div>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Mentee Outcomes</h3>
                {[['🎉','Job Placements','1,240'],['📈','Promotions','487'],['🚀','Startups Launched','84'],['📄','Papers Published','32'],['💰','Avg Salary Increase','34%']].map(([icon,l,v])=>(
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'14px' }}><span>{icon}</span>{l}</div>
                    <strong style={{ fontSize:'15px' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── REVENUE ── */}
        {page==='revenue' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}><div><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Revenue & Fees</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Full financial overview of the platform</p></div><button className="btn btn-outline">Export Report</button></div>
            <StatCards items={[['Total Revenue (Apr)','₹9.2L','↑ 18% vs March'],['Platform Commission','₹46,000','5% of session fees'],['Mentor Payouts','₹8.74L','95% to mentors'],['Pending Payouts','₹1.2L','Processing Friday']]} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.5rem' }}>Revenue by Domain</h3>
                <div style={{ display:'flex', alignItems:'flex-end', gap:'12px', height:140 }}>
                  {[['Engineering','3.1L',85,'var(--teal)'],['Product','2.4L',65,'var(--accent)'],['ML/AI','1.6L',45,'var(--gold)'],['Design','1.3L',35,'#7c3aed'],['Startup','0.8L',20,'var(--success)']].map(([l,v,p,c],i)=>(
                    <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, height:'100%', justifyContent:'flex-end' }}>
                      <span style={{ fontSize:'11px', fontWeight:600 }}>₹{v}</span>
                      <div style={{ width:'100%', height:`${p}%`, background:c, borderRadius:'4px 4px 0 0' }}></div>
                      <span style={{ fontSize:'10px', color:'var(--muted)', textAlign:'center' }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Fee Structure</h3>
                {[['Total session fees','₹9,20,000',false,false],['Platform commission (5%)','₹46,000',false,true],['Mentor payouts (95%)','₹8,74,000',false,false],['Refunds processed','−₹18,000',false,false,true],['Net Platform Revenue','₹46,000',true,true]].map(([l,v,bold,green,red])=>(
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:bold?'15px':'13px', fontWeight:bold?700:400, borderTop:bold?'2px solid var(--primary)':'none', padding:'10px 0', borderBottom:bold?'none':'1px solid var(--border)' }}>
                    <span>{l}</span><span style={{ color:red?'var(--accent)':green?'var(--success)':'var(--primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── REVIEWS ── */}
        {page==='reviews' && (
          <div>
            <div style={{ marginBottom:'2rem' }}><h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.7rem' }}>Reviews Management</h1><p style={{ fontSize:'14px', color:'var(--muted)', marginTop:4 }}>Moderate and showcase authentic peer feedback</p></div>
            <StatCards items={[['Total Reviews','8,420','All time'],['Avg Rating','4.8 ★','Platform average'],['5-Star Reviews','73%','Of all reviews'],['Flagged','12','Needs moderation',true]]} />
            <div className="card">
              <h3 style={{ fontSize:'16px', fontWeight:600, marginBottom:'1.2rem' }}>Recent Reviews</h3>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <TH cols={['Reviewer','Mentor','Rating','Outcome','Review','Date','Status']} />
                <tbody>{[
                  { reviewer:'Rahul Anand',    mentor:'Priya Raghavan', rating:5, outcome:'Got Promoted', preview:"Priya's structured approach transformed...", date:'Mar 31', status:'active'  },
                  { reviewer:'Divya Krishnan', mentor:'Arjun Kumar',    rating:5, outcome:'Landed Job',   preview:'His mock interviews are brutally good...',  date:'Apr 1',  status:'active'  },
                  { reviewer:'Anonymous',      mentor:'—',              rating:2, outcome:'—',            preview:'Session was cancelled last minute...',      date:'Apr 2',  status:'pending' },
                ].map((r,i)=>(
                  <tr key={i}>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{r.reviewer}</td>
                    <td style={{ padding:'12px', fontSize:'13px' }}>{r.mentor}</td>
                    <td style={{ padding:'12px' }}><span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span></td>
                    <td style={{ padding:'12px' }}>{r.outcome!=='—'&&<span className="tag tag-green">{r.outcome}</span>}</td>
                    <td style={{ padding:'12px', fontSize:'12px', color:'var(--muted)', maxWidth:200 }}>{r.preview}</td>
                    <td style={{ padding:'12px', fontSize:'12px' }}>{r.date}</td>
                    <td style={{ padding:'12px' }}><span className={`status-pill status-${r.status}`}>{r.status==='active'?'Published':'Flagged'}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MATCH MODAL */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.45)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={()=>setShowModal(false)}>
          <div style={{ background:'#fff', borderRadius:'20px', padding:'2rem', width:'90%', maxWidth:'500px' }} onClick={e=>e.stopPropagation()}>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.4rem', marginBottom:'1.2rem' }}>Create New Match</h2>
            {[['Select Mentee',['Neha Kapoor — Design','Raj Sharma — Engineering']],['Select Mentor',['Rohit Nair — UX Lead (94% match)','Priya Raghavan — PM (72% match)']],['Program Duration',['4 weeks (4 sessions)','8 weeks (8 sessions)','12 weeks (12 sessions)']]].map(([label,opts])=>(
              <div key={label} style={{ marginBottom:'1rem' }}>
                <label style={{ fontSize:'12px', fontWeight:600, marginBottom:'6px', display:'block' }}>{label}</label>
                <select style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'13px' }}>{opts.map(o=><option key={o}>{o}</option>)}</select>
              </div>
            ))}
            <div style={{ marginBottom:'1.2rem' }}><label style={{ fontSize:'12px', fontWeight:600, marginBottom:'6px', display:'block' }}>Notes for Mentor</label><textarea placeholder="Specific goals or context for this match..." style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'13px', minHeight:80, resize:'vertical' }} /></div>
            <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={()=>{ setShowModal(false); alert('Match created! Both parties notified.') }}>Confirm Match</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
