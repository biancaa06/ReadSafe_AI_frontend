import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import PredictionPage from './pages/PredictionPage'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<PredictionPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
