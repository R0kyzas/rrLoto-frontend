import axios from 'axios';
import { useForm } from 'react-hook-form';

const CancelModal = ({showCancelModal, setShowCancelModal, orderId, setMsg}) => {

    const {
        register, 
        formState: {errors}, 
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            cancel_reason: '',
        }
    });

    const onSubmit = async (data) => {
        await axios.post(`https://jellyfish-app-nxtf7.ondigitalocean.app:8080/app/api/admin/cancel/${orderId}`, data)
        .then((res) => {
            setMsg(res.data.success);
            setShowCancelModal(false);
        })
        .catch((err)=>{console.log(err)})
    }

    const handleClose = () => {
        setShowCancelModal(false);
    }

    return(
        <>
            {showCancelModal && (
                <div className='modal'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Atšaukti užsakymą</h5>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                                <div className='modal-body'>
                                    <div class="form-group">
                                        <label>Nurodyti priežastį:</label>
                                        <textarea class="form-control" {...register("cancel_reason", {required: true})}></textarea>
                                        <div class="invalid-feedback">
                                            {errors.cancel_reason?.type === "required" && "Privaloma įvesti priežastį"}
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-footer'>
                                    <button type='submit' class='btn btn-primary'>Patvirtinti</button>
                                    <button type='submit' class='btn btn-danger' onClick={handleClose}>Atšaukti</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CancelModal;