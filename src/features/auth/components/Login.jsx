import React from 'react'
import { Link, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { logginUserAsync, selectError, selectUsers } from '../authSlice'
import logo_png from "./c_arrow.jpeg"
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const dispatch = useDispatch();
    const user = useSelector(selectUsers)
    const error = useSelector(selectError)
    return (
        <>
            {user && <Navigate to={"/"} replace={true} />}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto rounded-md"
                        src={logo_png}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log-In to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => dispatch(logginUserAsync({ email: data.email, password: data.password })))} >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email", { required: "please Enter your email", pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "please enter valid email address" } })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className='text-red-500'>{error && error.message}</p>

                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <Link to={"#"} className="font-semibold text-pink-800 hover:text-pink-500">
                                        Forgot password?
                                    </Link>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("password", {
                                        required: "please enter your password", pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message: `- at least 8 characters\n
                                                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                                    - Can contain special characters`}
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className='text-red-500'>{error && error.message}</p>

                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-pink-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        New member?{' '}
                        <Link to={"/signup"} className="font-semibold leading-6 text-pink-800 hover:text-pink-500">
                            create an account
                        </Link>

                    </p>
                </div>
            </div>
        </>
    )
}

export default Login