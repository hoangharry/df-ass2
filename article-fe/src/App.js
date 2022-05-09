import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MultiArticles from './pages/Feed';
import EditArticle from './pages/EditArticle';
import SingleArticle from './pages/ArticleDetail';
import LoginRegister from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<MultiArticles/>} />
      <Route path='/login' element={<LoginRegister />} />
      <Route path='/add-article' element={<EditArticle/>} />
      <Route path='/edit-article' element={<EditArticle/>} />
      <Route path='/article/:id' element={<SingleArticle/>} />
    </Routes>
    </BrowserRouter>
    // <MultiArticles/>
    // <LoginRegister />
  );
}

export default App;
