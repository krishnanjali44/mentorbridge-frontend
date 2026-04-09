import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:5000/api' })
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export const loginUser     = (data) => API.post('/auth/login', data)
export const getMentors    = ()     => API.get('/mentors')
export const getMentorById = (id)   => API.get(`/mentors/${id}`)
export const getReviews    = (id)   => API.get(`/reviews/mentor/${id}`)
export const bookSession   = (data) => API.post('/sessions/book', data)
export const getMySessions = ()     => API.get('/sessions/my')
export const getMyGoals    = ()     => API.get('/progress/goals')
export const submitReview  = (data) => API.post('/reviews', data)
export const getBilling    = ()     => API.get('/billing/summary')
export const getAdminStats = ()     => API.get('/admin/dashboard')
export default API
