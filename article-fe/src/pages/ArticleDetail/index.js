
import { useEffect } from "react";
import { useParams } from "react-router";
import { getArticleById } from "../../service/article";
import ArticleView from "../../components/ArticleView";

const SingleArticle = () => {
    // const [article, setArticle] = useState({title: '', description:'', content: '', })
    let {id} = useParams();
    const getArticle = async (id) => {
        const result = await getArticleById(id);
        if (result.status === 200) {
            // setArticle(result.data);
        }
        
    }

    useEffect(() => {
        getArticle(id);
    });

    const article = {
        id: 1,
        title: "Hello it's a demo",
        description: "it's ademo and write in markdowm format. it's quite simple",
        content: "## Hello, **world**!",
    }
    return (
        <div>
            <div className="px-40 py-10 bg-gray-100">
                <ArticleView article={article} />
            </div>
        </div>
    )
}

export default SingleArticle;