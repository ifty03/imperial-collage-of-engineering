import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './shared/Navbar/Navbar'
import PublicRoutes from './Routes/publicRoutes'
import Notice from './Pages/Notice'
import Footer from './shared/Footer/Footer'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Notice />} />
        {PublicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
