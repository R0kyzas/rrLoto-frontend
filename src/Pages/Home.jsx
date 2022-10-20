import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Components/Modal';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import Checkbox from '../Components/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const TICKET_URL = '/ticket';

const Home = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [postMessage, setPostMessage] = useState('');
    const [childData, setChildData] = useState(null);

    const { promiseInProgress, notWorkingNeedToChange } = usePromiseTracker({area: props.area});

    const cookies = new Cookies();

    useEffect(() => {
        if(!localStorage.getItem('userToken'))
        {
            const getTokens = async () => {
                const {data: res} = await axios.get('https://jellyfish-app-nxtf7.ondigitalocean.app:8080/app/api/token');
                localStorage.setItem('userToken', res.token);
            };
            trackPromise(getTokens());
        }
    },[]);

    const cookieData = new Date();
    cookieData.setTime(cookieData.getTime() + ( 60 * 10000));

    const {
        register, 
        formState: {errors}, 
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            lastname: "",
            token: '',
            quantity: 0,
        }
    });

    const postTicketData = async (data) => {
        await axios.post(TICKET_URL, data)
        .then((res) => {
            setPostMessage(res.data.success);
        })
        .catch((err)=>{console.log(err)})
    }

    const onSubmit = (data) => {
        data.token = localStorage.getItem('userToken');
        data.quantity = childData;
        const userToAdd = {name: data.name, lastname: data.lastname, token: data.token, quantity: data.quantity};
        const prevUsers = cookies.get('users') || [];
        let filteredUser = prevUsers.filter(prev => prev.name !==userToAdd.name || prev.lastname !== userToAdd.lastname);
    
        const newUsers = [...filteredUser, userToAdd];
        cookies.set('users', newUsers, {path: '/', expires: cookieData})

        setShowModal(true);
        trackPromise(postTicketData(data));
    }

    const handleClose = () => {
        setShowModal(false);
    }
    
    return(
        <>
            {notWorkingNeedToChange &&
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
            {!notWorkingNeedToChange &&
                <>
                    <Modal showModal={showModal} postMessage={postMessage} childData={childData} handleClose={handleClose} promiseInProgress={promiseInProgress}/>
                    <div className='container d-flex profile justify-content-center'>
                        <div className="card text-center">
                            <div className="card-header">
                                Loterijos bilietas
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                                    <div className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control' 
                                            placeholder='Įveskite savo vardą'
                                            {...register("name", {required: true})}
                                        />
                                        <div class="invalid-feedback">
                                            {errors.name?.type === "required" && "Vardas yra privalomas"}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control' 
                                            placeholder='Įveskite savo pavardę'
                                            {...register("lastname", {required: true})}
                                        />
                                        <div class="invalid-feedback">
                                            {errors.lastname?.type === "required" && "Pavardė yra privaloma"}
                                        </div>
                                    </div>
                                    <p>Pasirinkite bilietų kiekį:</p>
                                    <Checkbox labelText={'1 bilietas'} value={1} passChildData={setChildData}/>
                                    <Checkbox labelText={'5 bilietas'} value={5} passChildData={setChildData}/>
                                    <Checkbox labelText={'10 bilietas'} value={10} passChildData={setChildData}/>
                                    <Checkbox labelText={'15 bilietas'} value={15} passChildData={setChildData}/>
                                    <Checkbox labelText={'20 bilietas'} value={20} passChildData={setChildData}/>
                                    <Checkbox labelText={'30 bilietas'} value={30} passChildData={setChildData}/>
                                    <Checkbox labelText={'50 bilietas'} value={50} passChildData={setChildData}/>
                                    <Checkbox labelText={'100 bilietas'} value={100} passChildData={setChildData}/>

                                    <p>Pasirinkite mokėjimo būdą:</p>
                                    <Checkbox labelText={'Grynais'} value={'cash'} passChildData={setChildData}/>
                                    <Checkbox labelText={'Internetu'} value={'bank'} passChildData={setChildData}/>
                                    <button 
                                        type='submit' 
                                        className='btn btn-primary'
                                    >
                                        Nusipirkti
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Home;