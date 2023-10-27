import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './components/homepage';
import Dashboard from './components/dashboard';
import Dictionary from './components/dictionary';
import RecommendedDictionary from './components/recommendedDictionary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dictionary' element={<Dictionary />}></Route>
        <Route path='/dictionary/vocabulary' element={<RecommendedDictionary />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
