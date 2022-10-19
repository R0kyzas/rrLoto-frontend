import React, {useState, useEffect, useRef} from "react";
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
// import { usePromiseTracker, trackPromise } from "react-promise-tracker";
// import { tabsClasses } from "@mui/material";

const Modal = ({showModal, postMessage, props, promiseInProgress, handleClose}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef(0);

    // const { promiseInProgress } = usePromiseTracker({area: props.area});

    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, []);

    
    
    return (
        <>
            {showModal && postMessage && (
                <div className='modal'>
                    <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                        <h5 className='modal-title'>{postMessage}</h5>
                        </div>
                        <div className='modal-body'>
                        <p>Jūsų loterijos bilietas numeris: <span className='ticket-color'>#</span></p>
                        <p>Parodykite arba pasakykite vedėjui savo bilieto numerį, kad jį patvirtintu.</p>
                        <p>Po patvirtinimo prie savo bilieto matysite: <span className='active-color'>"aktyvus"</span></p>
                        </div>
                        <div className='modal-footer'>
                        {promiseInProgress &&
                            <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                            variant="contained"
                            sx={buttonSx}
                            disabled={!loading}
                            onClick={handleClose}
                            >
                            Tvirtinu
                            </Button>
                            {!loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                            )}
                        
                        </Box>
                        }
                        {!promiseInProgress &&
                            <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                            variant="contained"
                            sx={buttonSx}
                            disabled={loading}
                            onClick={handleClose}
                            >
                            Tvirtinu
                            </Button>
                            {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                            )}
                        
                        </Box>
                        }
                        {/* <button type='button' class='btn btn-primary' onClick={handleClose}>Supratau</button> */}
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;