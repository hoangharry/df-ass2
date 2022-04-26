import { BadgeCheckIcon } from "@heroicons/react/outline";
import { useState } from "react";
import SuccessModal from "../Shared/SuccesModal";

const EditArticle = () => {
    const article = { title: '', description: '', content: '' };
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);
    const [content, setContent] = useState(article.content);
    const [isModal, setIsModal] = useState(false);

    const formIsValid = title !== '' && description !== '' && content !== '';

    const titleHandler = (e) => {
        console.log('title');
        setTitle(e.target.value);
    }

    const descriptionHandler = (e) => {
        console.log('description');
        setDescription(e.target.value);
    }

    const contentHandler = (e) => {
        console.log('content');
        setContent(e.target.value);
    }

    const onSubmit = () => {
        if (!formIsValid) {
            console.log('form is not valid');
            return;
        }
        setIsModal(true);
    }
    const onSave = () => {
        console.log('onSave');
        setIsModal(true);
    }

    return (
        <div className="py-8 px-8 max-w-[80%] mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
            <div className="col-span-6 sm:col-span-4 pb-4 ml-14">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    placeholder="Title"
                    onChange={titleHandler}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-10"
                />
            </div>

            <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <div className="mt-1 ml-8">
                    <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Brief description about your article"
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
                className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex">
                    <BadgeCheckIcon className="h-6 w-6" aria-hidden="true" />
                    <span className='pt-0.5 pl-0.5'>Save</span>
                </button>
            </div>
            {
                isModal && <SuccessModal />
            }
        </div>
    )
}

export default EditArticle;