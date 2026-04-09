import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [role, setRole] = useState('mentee')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (role === 'admin') { login({ name: 'Admin User', role: 'admin' }); navigate('/admin') }
    else { login({ name: 'Aisha Sharma', role: 'mentee' }); navigate('/dashboard') }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--light)' }}>
      <div className="card" style={{ width:'100%', maxWidth:'420px', padding:'2.5rem' }}>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', marginBottom:'1.5rem' }}>Mentor<span style={{ color:'var(--accent)' }}>Bridge</span></div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.8rem', marginBottom:'6px' }}>Welcome back</h2>
        <p style={{ fontSize:'14px', color:'var(--muted)', marginBottom:'1.5rem' }}>Log in to continue your journey</p>
        <div style={{ display:'flex', gap:'8px', marginBottom:'1.5rem' }}>
          {['mentee','mentor','admin'].map(r => (
            <div key={r} onClick={() => setRole(r)} style={{ flex:1, padding:'10px', border:`1.5px solid ${role===r?'var(--accent)':'var(--border)'}`, borderRadius:'8px', textAlign:'center', cursor:'pointer', fontSize:'13px', fontWeight:500, background:role===r?'#fff0f3':'#fff', color:role===r?'var(--accent)':'var(--primary)', textTransform:'capitalize' }}>{r}</div>
          ))}
        </div>
        <div style={{ marginBottom:'1rem' }}>
          <label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Email</label>
          <input type="email" placeholder="you@example.com" style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'14px' }} />
        </div>
        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px' }}>Password</label>
          <input type="password" placeholder="••••••••" style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', borderRadius:'8px', fontSize:'14px' }} />
        </div>
        <button className="btn btn-primary" style={{ width:'100%', padding:'12px', fontSize:'15px', justifyContent:'center' }} onClick={handleLogin}>Log In</button>
        <p style={{ textAlign:'center', fontSize:'13px', color:'var(--muted)', marginTop:'1rem' }}>Back to <span style={{ color:'var(--accent)', cursor:'pointer' }} onClick={() => navigate('/')}>Home</span></p>
      </div>
    </div>
  )
}
