import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Inicial from './pages/Inicial'
import Form from './pages/Form'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicial />} />
          <Route path="form" element={<Form />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
