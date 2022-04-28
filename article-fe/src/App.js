import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MultiArticles from './components/MultiArticle/MultiArticles';
import EditArticle from './components/SingleArticle/EditArticle';
import SingleArticle from './components/SingleArticle/Article';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' exact element={<MultiArticles/>} />
      <Route path='/add-article' element={<EditArticle/>} />
      <Route path='/edit-article' element={<EditArticle/>} />
      <Route path='/article/:id' element={<SingleArticle/>} />
    </Routes>
      {/* <div className="App"> */}
     
    {/* </div> */}
    </BrowserRouter>
    // <MultiArticles/>
  );
}

export default App;
