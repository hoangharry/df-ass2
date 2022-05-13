import ErrorView from "../components/ErrorView";
import AddArticle from "../pages/AddArticle";
import SingleArticle from "../pages/ArticleDetail";
import EditArticle from "../pages/EditArticle";
import MultiArticles from "../pages/Feed";
import LoginRegister from "../pages/Login";

const routes = [
    {
        path: '/feed',
        component: MultiArticles,
        isPrivate: true,
    },
    {
        path: '/articles/:slug',
        component: SingleArticle,
        isPrivate: true,
    },
    {
        path: '/add-article',
        component: AddArticle,
        isPrivate: true,
    },
    {
        path: '/edit/:slug',
        component: EditArticle,
        isPrivate: true,
    },
    {
        path: '/*',
        component: ErrorView,
        isPrivate: true,
    }
];

export default routes;