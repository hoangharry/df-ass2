import { CheckCircleIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const Modal = ({ isFailed, title, content, link, setModal }) => {
    const navigate = useNavigate();
    console.log(title, content);
    const closeModal = () => {
        if (isFailed) {
            setModal(false);
        } else {
            setModal(false);
            navigate(link);
        }
    }

    return (
        <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        >
            <div className="mt-3 text-center">
                <div
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-violet-500"
                >
                    { isFailed && <XIcon className="h-6 w-6" />}
                    { !isFailed && <CheckCircleIcon className="h-6 w-6" /> }
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{title}!</h3>
                <div className="mt-2 px-7 py-3">
                    <p className="text-sm text-gray-500">
                        {content}!
                    </p>
                </div>
                <div className="items-center px-4 py-3">
                    <button
                        onClick={closeModal}
                        id="ok-btn"
                        className="px-4 py-2 bg-violet-500 text-gray-300 hover:bg-gray-700 hover:text-white font-medium rounded-md w-full shadow-sm hover:bg-violet-600 active:bg-violet-700"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;