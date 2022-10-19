import React from 'react';

const Checkbox = (props) => {

    const handleInputChange = (e) => {
        const value = e.target.value;
        props.passChildData(value);
    }
    return(
        <div className='form-check'>
            <input className='form-check-input' type={"radio"} name='getValue' value={props.value} onClick={(e)=>handleInputChange(e)} />
            <label className='form-check-label' htmlFor='flexRadio1'>
                {props.labelText}
            </label>
        </div>
    )
}

export default Checkbox;