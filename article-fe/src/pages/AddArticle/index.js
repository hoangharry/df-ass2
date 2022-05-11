import { BadgeCheckIcon, FastForwardIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { createArticle } from "../../service/article";
import Navbar from "../../Layouts/NavBar";
import Modal from "../../components/Modal";
import { useSearchParams } from "react-router-dom";

const AddArticle = () => {
    const article = { title: '', description: '', content: '' };
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);
    const [content, setContent] = useState(article.content);
    const [imgFile, setImgFile] = useState('');
    const [cate, setCate] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [titleErr, setTitleErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);
    const [contentErr, setContentErr] = useState(false);
    const [imgFileErr, setImgFileErr] = useState(false);

    const [link, setLink] = useState('');

    

    const titleHandler = (e) => {
        const v = e.target.value.trim()
        if (v === '') {
            setTitleErr(true);
            return;
        }
        setTitle(e.target.value);
        setTitleErr(false);
    }

    const descriptionHandler = (e) => {
        const v = e.target.value.trim()
        if (v === '') {
            setDescriptionErr(true);
            return;
        }
        
        setDescription(e.target.value);
        setDescriptionErr(true);
    }

    const contentHandler = (e) => {
        const v = e.target.value.trim()
        if (v === '') {
            setContentErr(true);
            return;
        }
        setContent(e.target.value);
        setContentErr(false);
    }

    const cateHandler = (e) => {
        setCate(e.target.value);
    }

    const imgHandler = (e) => {
        const img = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            setImgFile(reader.result);
        }
        reader.readAsDataURL(img);
    }

    const checkForm = () => {
        if (title.trim() === '') {
            setTitleErr(true);
            return false;
        }
        if (description.trim() === '') {
            setDescriptionErr(true);
            return false;
        }
        if (content.trim() === '') {
            setContentErr(true);
            return false;
        }
        if (imgFile.trim() === '') {
            setImgFileErr(true);
            return false;
        }
        return true;
    }

    const onSave = (e) => {
        e.preventDefault();
        if (!checkForm()) {
            setIsModal(true);
            setIsFailed(true);
            setModalTitle('Opps');
            setModalContent('Your form is not valid');
            return;
        }
        createArticle({ title, description, content });
        setIsModal(true);
        setIsFailed(false);
        setModalTitle('Successful');
        setModalContent('Your post has been created successfully');
        setLink('/');

    }

    return (
        <div className="bg-gray-100 h-screen">
            {
                isModal && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        id="my-modal"
                    >
                        <Modal isFailed={isFailed} title={modalTitle} content={modalContent} link={link} setModal={setIsModal} />
                    </div>
                )
            }
            <div className="flex justify-center font-sans pt-1">
                    <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 pb-3">New Post</h1>
                </div>
            <div className="mb-14 pb-8 px-8 max-w-[80%] mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
                

                <form>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="user_avatar">Upload theme image</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    aria-describedby="user_avatar_help" 
                    id="user_avatar" 
                    type="file" 
                    onChange={imgHandler}
                    />
                    { imgFileErr && <span className="text-red-400 text-sm italic">Please fill in this field</span>}
                    
                </div>
                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                        <input type="text" 
                        id="title" 
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Your title here" 
                        onChange={titleHandler}
                         />
                        { titleErr && <span className="text-red-400 text-sm italic">Please fill in this field</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                        <input type="text" 
                        id="description" 
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Description about your post"
                        onChange={descriptionHandler}
                         />
                         { descriptionErr && <span className="text-red-400 text-sm italic">Please fill in this field</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select your post's category</label>
                        <select id="type" value={cate} onChange={cateHandler}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Society</option>
                            <option>Science</option>
                            <option>News</option>
                            <option>Business</option>
                            <option>Art</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Content</label>
                        <textarea id="message" 
                        rows="9"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Let your content be here! Write in markdown format..."
                        onChange={contentHandler}
                        ></textarea>
                        { contentErr && <span className="text-red-400 text-sm italic">Please fill in this field</span>}
                    </div>

                    <div className="insert-x-0 flex justify-center">
                        <button
                            type="submit"
                            onClick={onSave}
                            className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium flex">
                            <BadgeCheckIcon className="h-6 w-6" aria-hidden="true" />
                            <span className='pt-0.5 pl-0.5'>Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddArticle;