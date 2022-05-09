import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Layouts/NavBar";
import ArticleCard from "../../components/ArticleCard";
import { getArticles } from "../../service/article";

const MultiArticles = () => {
    // const [articles, setArticles] = useState([]);
    const [total, setTotal] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const getArticlesView = async (page) => {
        const result = await getArticles(page);
        if (result.status === 200) {
            console.log(result.data)
            setTotal(result.data.total);
            // setArticles(result.data.data);
        }
    }

    // useEffect(() => {
    //     getArticlesView(curPage);
    // }, [curPage])
    const articles = [
        { id: 1, title: "hi it's me", description: 'none', content: 'opppppssss'},
        { id: 2, title: "hi it's me", description: 'none', content: 'opppppssss'},
        { id: 3, title: "hi it's me", description: 'none', content: 'opppppssss'},
        { id: 4, title: "hi it's me", description: 'none', content: 'opppppssss'},
        { id: 5, title: "hi it's me", description: 'none', content: 'opppppssss'},
    ];

    return (
        <>
            <Navbar current={'Feed'} />
            <div className="grid grid-cols-3 gap-4 pb-4 pt-4">
            {
                articles.map((value, idx) => {
                    return (
                        <Link to={'/article/' + value.id}>
                            <ArticleCard id={value.id} article={value}/>
                        </Link>
                        
                    )
                })
            }
            </div>
        </>
    );
}

export default MultiArticles;