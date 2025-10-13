import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './shared/Navbar/Navbar'
import PublicRoutes from './Routes/publicRoutes'
import Notice from './Pages/Notice'
import Footer from './shared/Footer/Footer'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Routes/ProtectedRoute'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminRoutes from './Routes/AdminRoutes'
import AdminDashboardIndex from './components/AdminDashboard/AdminDashboardIndex/AdminDashboardIndex'

function App() {

  return (
    <div>
      <Routes>
      
        {PublicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
       
        {/* user routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<AdminDashboardIndex />} />
            {AdminRoutes.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))}
          </Route>
        </Route>

        <Route path="/unauthorized" element={<p>❌ Unauthorized</p>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
