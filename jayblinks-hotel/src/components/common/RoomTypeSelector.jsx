import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { getRoomTypes } from '../utils/ApiFunctions'


const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const[roomTypes, setRoomTypes] = useState([""])
    const[showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const[newRoomTypes, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) =>{
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () =>{
        if (newRoomTypes !== null){
            setRoomTypes([...roomTypes, newRoomTypes])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }


    return (
        <>

            {roomTypes.length > 0 && (
                <div>
                    <select
                    id='roomType'
                    name='roomType'
                    value={newRoom.roomType}
                    onChange={(e) => {
                        if (e.target.value === "Add New"){
                            setShowNewRoomTypeInput(true)
                        }else {
                            handleRoomInputChange(e)
                        }
                    }}>
                        <option value={""}> select a room type</option>
                        <option value={"Add New"}> Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}> 
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className='input-group'>
                            <input 
                            className='form-control'
                            type='text'
                            placeholder='Enter a new room type'
                            onChange={handleNewRoomTypeInputChange}
                            />
                            <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>
                                Add</button>
                        </div>
                    )}


                </div>

            )}


        </>
    );
};

RoomTypeSelector.propTypes = {
    handleRoomInputChange: PropTypes.func.isRequired,
    newRoom: PropTypes.object.isRequired,
};

export default RoomTypeSelector