import Home from './Home.jsx';
import './Signin.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';


function Signin() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [isInvalid, setIsInvalid] = useState(false)
    const [isUsers, setIsUsers] = useState(true)

    const signin = (values) => {

        const items = localStorage.getItem('users')

        const itemsArray = JSON.parse(items)

        if (itemsArray == null) {
            setIsUsers(false)
            reset()
        }
        else {

            const found = itemsArray.find(item => values.email === item.email)

            if (!(found == undefined)) {
                if (values.email === found.email && values.password === found.password) {

                    navigate(`/Persona/${found.id}`)
                }
                else {
                    setIsInvalid(true);
                }
            }

            else {
                setIsInvalid(true);

            }
        }

    }

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

            <div className="signin-containter">

                <h1>Sign In</h1>



                <form onSubmit={handleSubmit(signin)}>

                    <input
                        type="text"
                        placeholder="Enter your email"
                        name="email"
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

                    <input type="submit" className='signin_btn' value="Sign In" />


                </form>

            </div>

            {isInvalid &&
                <span className='invalidUser'>Invalid email or password</span>
            }
            {!isUsers &&
                <span className='usersNotFound'>Users not found</span>
            }

        </>
    )
}

export default Signin

