import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MultiArticles from './pages/Feed';
import EditArticle from './pages/AddArticle';
import SingleArticle from './pages/ArticleDetail';
import LoginRegister from './pages/Login';
import Navbar from './Layouts/NavBar';
import AddArticle from './pages/AddArticle';
import Footer from './Layouts/Footer';
import { AuthProvider } from './store/userContext';
import routes from './routes/route';
import { useAuthState } from './store/userContext';
import AppRoute from './routes/AppRoute';

function App() {
  const userDetails = useAuthState();
  return (
    <>

      <BrowserRouter>
        {
          Boolean(userDetails.token) && <Navbar />
        }
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          {
            routes.map((route) => (
              <Route key={route.path} path={route.path} element={<AppRoute component={route.component} isPrivate={route.isPrivate} />} />
            ))
          }
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
