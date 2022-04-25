import './App.css';
import Example from './components/Navbar/Navbar';
import ArticleCard from './components/MultiArticle/ArticleCard';
import Pagination from './components/Pagination/Pagination';

function App() {
  return (
    <div className="App">
      <Example/>
       <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      <div className="grid grid-cols-3 gap-4">
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      </div>
      <Pagination />
      
    </div>
  );
}

export default App;
