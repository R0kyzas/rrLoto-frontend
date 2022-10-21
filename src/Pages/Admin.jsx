import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'
import CancelModal from '../Components/CancelModal';
 

const Admin = () => {

    const navigate = useNavigate();
    const sessionToken = sessionStorage.getItem("loggedIn");
    const [data, setData] = useState({});
    const [msg, setMsg] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if(!sessionToken)
        {
            navigate('/login');
        }
        const getData = async () => {
            const {data: res} = await axios.get('http://139.59.202.149:90/api/admin');
            setData(res);
        }
        getData();
    }, [msg])
    
    const handleAccept = async (data) => {
        await axios.post(`/api/admin/confirm/${data}`)
        .then((res) => {
            setMsg(res.data.success)
        })
        .catch((err)=>{console.log(err)})
    }

    const handleCancel = (value) => {
        setOrderId(value);
        setShowCancelModal(true);
    }

    const handleClick = async() => {
        
        // await axios.post(`http://localhost:8000/api/admin/get-winner`) https://jellyfish-app-nxtf7.ondigitalocean.app/ 
        
        // .then((res) => {
        //     setMsg(res.data.success)
        // })
        // .catch((err)=>{console.log(err)})
    }

    return(
        <>
            {sessionToken &&
            <>
                <CancelModal showCancelModal={showCancelModal} setShowCancelModal={setShowCancelModal} orderId={orderId} setMsg={setMsg}/>
                <div className='container d-flex admin-panel justify-content-center'>
                    <div className="card card-ticket text-center">
                        <div className="card-header">
                            Admin
                        </div>
                        <div className='card-body'>
                        <div class="input-group">
                            <div class="form-outline">
                                <input 
                                    type="search" 
                                    class="form-control" 
                                    placeholder='search'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="input-group">
                            <button
                            onClick={handleClick}
                            >

                            </button>
                        </div>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Name,Lastname</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.orders?.filter((order) => 
                                        order.order_nr.includes(searchQuery) ||
                                        order.tickets[0].name.includes(searchQuery) ||
                                        order.tickets[0].lastname.includes(searchQuery) 
                                        ).map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.order_nr}</td>
                                            <td>{order.tickets[0].name} {order.tickets[0].lastname}</td>
                                            <td>
                                                
                                                {order.active === 0 && (
                                                    <>
                                                        <button className='btn btn-primary admin-table' onClick={() => handleAccept(order.id)}>Accept</button> 
                                                        <button className='btn btn-primary admin-table' onClick={() => handleCancel(order.id)}>Cancel</button>
                                                    </>
                                                )}
                                                {order.active === 1 && (
                                                    <p>Aktyvuotas</p>
                                                )}
                                                {order.active === 2 && (
                                                    <p>Atšauktas</p>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default Admin;
