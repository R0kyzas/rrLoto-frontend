import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RandomReveal } from "react-random-reveal";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Other = (props) => {

    const [ticket, setTicket] = useState({});
    const { promiseInProgress } = usePromiseTracker({area: props.area});

    useEffect(() => {
        const getTickets = async () => {
            const {data: res} = await axios.get('/api/lottery-tickets');
            setTicket(res.ticket);
        }
        trackPromise(getTickets());
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
                <div className='container d-flex admin-panel justify-content-center'>
                    <div className="card text-center">
                        <div className="card-header">
                            Loterijos laimėtojas
                        </div>
                        <div className='card-body'>
                            <div>
                                <RandomReveal
                                    isPlaying
                                    duration={20}
                                    revealDuration={3}
                                    characters={String(ticket.ticketNumber) || ''}
                                    characterSet={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                                    onComplete={() => ({ shouldRepeat: false, delay: 3 })}
                                />
                            </div>
                            <div>
                            <RandomReveal
                                    isPlaying
                                    duration={20}
                                    revealDuration={3}
                                    characters={ticket.name || ''}
                                    onComplete={() => ({shouldRepeat: false, delay: 3})}
                            
                                /> 
                            </div>
                            <div>
                                <RandomReveal
                                    isPlaying
                                    duration={20}
                                    revealDuration={3}
                                    characters={ticket.lastname || ''}
                                    onComplete={() => ({shouldRepeat: false, delay: 3})}
                                
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Other;