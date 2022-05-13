import axios from 'axios';
import useSWR from 'swr';
import { SERVER_URL } from '../constant';


const ARTICLE_URL = SERVER_URL + '/articles';

export const useGetArticles = (page) => {

    const fetcher = url => axios({
        method: "GET",
        url: url,
        params: {
            page: page
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth-jwt')
        }
    }).then(res => res.json()).catch(e => e)
    const { data, error } = useSWR(ARTICLE_URL, fetcher)
    return {
        data: data,
        isError: error
    }
}

export const useArticleById = (id) => {
    const fetcher = url => axios({
        method: "GET",
        url: url,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth-jwt')
        }
    }).then(res => res.data)
    const { data, error } = useSWR(ARTICLE_URL + '/' + id, fetcher)
    return {
        data: data,
        isError: error
    }
}

export const useCreateArticle = (article) => {

    const fetcher = url => axios({
        method: "POST",
        url: url,
        data: {
            img: article.imgFile,
            title: article.title,
            content: article.content,
            description: article.description,
            category: article.category,
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth-jwt')
        }
    })
    const { data, error } = useSWR(ARTICLE_URL, fetcher)
    return {
        data: data,
        isError: error
    }
}

export const useEditArticle = (article) => {
    const fetcher = url => axios({
        method: "PUT",
        url: url,
        data: {
            title: article.title,
            content: article.content,
            description: article.description,
            category: article.category,
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth-jwt')
        }
    })
    const { data, error } = useSWR(ARTICLE_URL + '/' + article.id, fetcher)
    return {
        data: data,
        isError: error
    }
}

export const useDeleteArticle = (article) => {
    const fetcher = url => axios({
        method: "DELETE",
        url: url,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth-jwt')
        }
    })
    const { data, error } = useSWR(ARTICLE_URL + '/' + article.id, fetcher)
    return {
        data: data,
        isError: error
    }
}