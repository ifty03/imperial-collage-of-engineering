import { Route, Routes } from 'react-router-dom'
import './App.css'
import PublicRoutes from './Routes/publicRoutes'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Routes/ProtectedRoute'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminRoutes from './Routes/AdminRoutes'
import AddNotice from './components/AdminDashboard/AdminDashboardNotice/AddNotice'
import "react-quill-new/dist/quill.snow.css";

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
            <Route index element={<AddNotice />} />
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
