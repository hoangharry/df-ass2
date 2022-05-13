import { useState } from 'react';
import { login, register } from '../../service/authorization';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../../store/userContext';
import { loginUser } from '../../store/authReducer';

const LoginRegister = () => {
    const navigate = useNavigate();
    const [usr, setUsr] = useState('');
    const [pwd, setPwd] = useState('');
    const [errStr, setErrStr] = useState('');
    const dispatch = useAuthDispatch();
    const usrChangeHandler = (e) => {
        setUsr(e.target.value);
    }

    const pwdChangeHandler = (e) => {
        setPwd(e.target.value);
    }

    const onSignin = async (e) => {
        e.preventDefault();
        const result = await login(usr, pwd).catch((ev) => {
            setErrStr('Sign in failed!!!')
        });
        console.log(result);
        if (result.status !== 200) {
            setErrStr('Sign in failed!!!')
            return
        }
        localStorage.setItem('auth-jwt', result.data['token']); 
        localStorage.setItem('uid', result.data['userid']); 
        loginUser(dispatch, result.data['userid'], result.data['token'])
        navigate('/feed');
    }

    const onRegister = async (e) => {
        e.preventDefault();
        const result = await register(usr, pwd).catch((ev) => {
            setErrStr('Register failed!!!')
        });
        if (result.status !== 201) {
            setErrStr('Register failed!!!')
            return
        }
        setErrStr('Register successfully! Please sign in to continue!!!');
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account or Register new account</h2>
                </div>
                <form className="mt-8 space-y-6" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                onChange={usrChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                onChange={pwdChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                    </div>
                    { errStr !== '' && <span className="text-red-400 text-sm italic">{errStr}</span>}
                    <div>
                        <button
                            type="submit"
                            onClick={onSignin}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            </span>
                            Sign in
                        </button>

                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={onRegister}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            </span>
                            Register
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginRegister