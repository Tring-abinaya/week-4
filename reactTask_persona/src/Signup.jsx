import Home from './Home.jsx';
import './Signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';


function Signup() {

    const [isUserExist, setIsUserExist] = useState(false)

    let details = []

    const navigate = useNavigate();

    const signup = (values) => {

        const items = localStorage.getItem('users')
        const itemsArray = JSON.parse(items)
        if(itemsArray!==null)
        {
            const found = itemsArray.find(item => values.email === item.email)
    
            if (!(found == undefined)) {
                if (values.email === found.email) {
                    setIsUserExist(true)
                    reset()
                }
                return
            }
            else {
                let length = itemsArray.length
                details = [...itemsArray, { id: length + 1, ...values,personas:[] }]
            }
    
        }
        else if (itemsArray === null) {
            details = [{ id: 1, ...values,personas:[] }]
        }
        
        localStorage.setItem("users", JSON.stringify(details))

        navigate('/Signin')
    }

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    return (
        <>
            <Home />

            <div className="signup-containter">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(signup)}>


                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: {
                                value: true, message: "Email is required"
                            }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Enter valid email" }
                        })}
                    />
                    {errors.email && <span className='error'>{errors.email.message}</span>}
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        {...register("password", {
                            required: {
                                value: true, message: "Password is required"
                            }
                        })}
                    />
                    {errors.password && <span className='error'>{errors.password.message}</span>}

                    <span onClick={togglePasswordVisibility} className="password-eye-icon">
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    <input
                        type="number"
                        placeholder="Enter your age"
                        name="age"
                        {...register("age", {
                            min: { value: 0, message: "Age must be greater than 0" }, max: { value: 100, message: "Age must be less than 100" }, required: {
                                value: true, message: "Age is required"
                            }
                        })}
                    />
                    {errors.age && <span className='error'>{errors.age.message}</span>}

                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        name="phone"
                        {...register("phone", {
                            maxLength: { value: 10, message: "Phone number must be of length 10" }, pattern: { value: /^[7-9]\d{9}$/, message: "Phone number must be 10 digits" }, required: {
                                value: true, message: "Phone number is required"
                            }
                        })}
                    />
                    {errors.phone && <span className='error'>{errors.phone.message}</span>}

                    <input type="submit" className='signup_btn' value="Sign up" />
                </form>
            </div>

            {isUserExist &&
                <span className='existUser'>User already exists</span>
            }
        </>
    )
}

export default Signup