import React, { useState } from 'react';

const Card = () => {
    const {data, setData} = useState({
        name: '',
        lastname: '',
        ticketNumber: 0,
    });

    return(
        <div className='container d-flex justify-content-center'>
            <div className="card text-center">
                <div className="card-header">
                    Loterijos bilietas
                </div>
                <div className='card-body'>
                <form>
                    <div className='form-group'>
                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Įveskite savo vardą'
                            value={data.name}
                            onChange={(e)=>
                                setData('name', e.target.value)
                            }
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Įveskite savo pavardę'
                            value={data.lastname}
                            onChange={(e)=>
                                setData('lastname', e.target.value)
                            }
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='number' 
                            className='form-control' 
                            placeholder='Įveskite norima skaičių' 
                            value={data.ticketNumber}
                            onChange={(e)=>
                                setData('ticketNumber', e.target.value)
                            }
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Nusipirkti</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Card;