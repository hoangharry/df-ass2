import { BadgeCheckIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { createArticle } from "../../service/article";
import Modal from "../Shared/Modal";
import Navbar from "../Shared/Navbar";

const EditArticle = () => {
    const article = { title: '', description: '', content: '' };
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);
    const [content, setContent] = useState(article.content);
    const [isModal, setIsModal] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [link, setLink] = useState('');

    const formIsValid = title !== '' && description !== '' && content !== '';

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
    }

    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    const onSave = () => {
        console.log('onSave');
        if (!formIsValid) {
            console.log('not valid')
            setIsModal(true);
            setModalTitle('Opps');
            setModalContent('Your form is not valid');
            setIsFailed(true)
            return;
        }
        createArticle({title, description, content});
        setIsModal(true);
        setIsFailed(false);
        setModalTitle('Successful');
        setModalContent('Your article has been created successfully');
        setLink('/');

    }

    return (
        <>
        <Navbar current={null}/>
        {
                isModal && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        id="my-modal"
                    >
                        <Modal isFailed={isFailed} title={modalTitle} content={modalContent} link={link} setModal={setIsModal}/>
                    </div>
                )
            }
            <div className="py-8 px-8 max-w-[80%] mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
            <div className="col-span-6 sm:col-span-4 pb-4 ml-14">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 pb-4">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    placeholder="Title"
                    required
                    onChange={titleHandler}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-10"
                />
            </div>

            <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 ml-8 pb-4">
                    Description
                </label>
                <div className="mt-1 ml-8">
                    <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Brief description about your article"
                        required
                        onChange={descriptionHandler}
                    />
                </div>
            </div>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            <div>

                                <div className="mt-1">
                                    <textarea
                                        id="content"
                                        name="content"
                                        rows={18}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Content of your article"
                                        required
                                        onChange={contentHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="insert-x-0 flex justify-center">
                <button
                    // disabled={!formIsValid} 
                    onClick={onSave}
                    className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium flex">
                    <BadgeCheckIcon className="h-6 w-6" aria-hidden="true" />
                    <span className='pt-0.5 pl-0.5'>Save</span>
                </button>
            </div>
            
        </div>
        </>
        
    )
}

export default EditArticle;