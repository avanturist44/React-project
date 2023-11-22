import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './components/homepage';
import Recommendations from './components/dashboard';
import Dictionary from './components/dictionary';
import RecommendedDictionary1 from './components/recommendedDictionary1';
import RecommendedDictionary2 from './components/recommendedDictionary2';
import RecommendedDictionary3 from './components/recommendedDictionary3';
import Flashcards from './components/flashcards';
import Learning from './components/learning';
import Hangman from './components/hangman';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/dashboard' element={<Recommendations />}></Route>
        <Route path='/dictionary' element={<Dictionary />}></Route>
        <Route path='/dictionary/vocabulary/1' element={<RecommendedDictionary1 />}></Route>
        <Route path='/dictionary/vocabulary/2' element={<RecommendedDictionary2 />}></Route>
        <Route path='/dictionary/vocabulary/3' element={<RecommendedDictionary3 />}></Route>
        <Route path='/training/flashcards' element={<Flashcards />}></Route>
        <Route path='/training' element={<Learning />}></Route>
        <Route path='/training/hangman' element={<Hangman />}></Route>
        <Route path='/training/flashcards' element={<Learning />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


