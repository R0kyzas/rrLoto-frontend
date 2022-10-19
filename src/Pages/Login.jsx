import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { useNavigate } from 'react-router-dom'

const LOGIN_URL = '/login';

const Login = (props) => {
    const loginToken = sessionStorage.getItem('loggedIn');
    const { promiseInProgress } = usePromiseTracker({area: props.area});
    const navigate = useNavigate()

    useEffect(()=>{
        if(loginToken)
        {
            navigate('/admin');
        }
    },[]);
    
    const {
        register, 
        formState: {errors}, 
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const postUserData = async (data) => {
        await axios.post('http://localhost:8000/api/login',data)
        .then((res) => {
            if(res.status === 200)
            {
                sessionStorage.setItem("loggedIn", res.data.token);
                navigate('/admin');
            }
        })
        .catch((err)=>{console.log(err)})
    }
    
    const onSubmit = (data) => {
        trackPromise(postUserData(data));
    }

    return(
        <>
            {promiseInProgress &&
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    position: 'absolute', 
                    top: '0', 
                    left: '0', 
                    right: '0', 
                    height: '100%', 
                    alignItems: 'center'
                }}>
                    <CircularProgress />
                </Box>
            }
            {!promiseInProgress &&
                <div className='container d-flex justify-content-center'>
                    <div className="card text-center">
                        <div className="card-header">
                             Prisijungimas
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(onSubmit)} method="POST" >
                                    <div className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control' 
                                            placeholder='Įveskite slapyvardį'
                                            {...register("username", {required: true})}
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {errors.username?.type === "required" && "Slapyvardis privalomas"}
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            type='password' 
                                            className='form-control' 
                                            placeholder='Įveskite slaptažodį'
                                            {...register("password", {required: true})}
                                         />
                                    </div>
                                    <div class="invalid-feedback">
                                        {errors.password?.type === "required" && "Slaptažodis privalomas"}
                                    </div>
                                    <button 
                                        type='submit' 
                                        className='btn btn-primary'
                                    >
                                        Prisijungti
                                    </button>
                                </form>
                        </div>
                     </div>
                </div>
            }
        </>
    )
}

export default Login;