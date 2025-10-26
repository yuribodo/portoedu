import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Inicial from './pages/Inicial'
import Form from './pages/Form'
import Home from './pages/Home'
import About from './pages/About'
import Opportunities from './pages/Opportunities'
import OpportunityDetail from './pages/OpportunityDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicial />} />
          <Route path="form" element={<Form />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="oportunidades" element={<Opportunities />} />
          <Route path="oportunidades/:id" element={<OpportunityDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
