import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';



const Profile = (props) => {

    const getToken = localStorage.getItem('userToken');
    
    const TICKET_URL = `http://localhost:8000/api/ticket-list/${getToken}`;
    
    const [data, setData] = useState({});

    const { promiseInProgress } = usePromiseTracker({area: props.area});

    useEffect(() => {
        if(getToken)
        {
            const getData = async () => {
                
                    const {data: res} = await axios.get(TICKET_URL)
                    setData(res);
                
            }
            trackPromise(getData());
        }
    }, [])

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
                <div className='container d-flex profile justify-content-between'>
                    {data.orders?.map((order) => (
                        <>
                            <div className="card card-ticket text-center">
                                    <div className="card-header">
                                        <div>
                                            Užsakymo numeris: {order.order_nr}
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                    <Dropdown className='w-100'>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='w-100 d-flex justify-content-between align-items-center'>
                                            <div>
                                                Bilietų kiekis: {order.quantity}
                                            </div>
                                            <div>
                                                {order.active === 0 ? 'Laukiantis aktyvavimo' : 'Aktyvuotas'}
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                                <div className='tickets d-flex w-100 justify-content-between'>
                                                <Table striped bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Bilieto numeris</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.tickets.map((ticket) => (
                                                        <tr>
                                                            <td># {ticket.ticketNumber}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                </Table>
                                                </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </div>
                                </div>
                        </>
                    ))}
                </div>
            }
        </>
    )
}

export default Profile;