
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth.jsx'
import InterviewPage from './pages/InterviewPage.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice.js'
import InterviewHistory from './pages/InterviewHistory.jsx'
import Pricing from './pages/Pricing.jsx'
import InterviewReport from './pages/InterviewReport.jsx'

export const ServerUrl = "http://localhost:8000"

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        // console.log(result.data);
        dispatch(setUserData(result.data))


      }
      catch (error) {
        if (error.response && error.response.status !== 401) {
          console.log(error);
        }
        dispatch(setUserData(null))


      }
    }
    getUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/history' element={<InterviewHistory />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/report/:id' element={<InterviewReport />} />
    </Routes>
  )
}

export default App
