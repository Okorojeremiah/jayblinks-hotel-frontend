import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import { Col } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { FaTrashAlt, FaEye, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom'




const ExistingRooms = () => { 
    const[rooms, setRooms] = useState([{id:"", roomType:"", roomPrice:""}])
    const[currentPage, setCurentPage] = useState(1)
    const[roomsPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([{ id:"", roomType:"", roomPrice:""}])
    const[selectedRoomType, setSelectedRoomType] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage, setSuccessMessage] = useState("")


    
    useEffect(() =>{
        fetchRooms()
    }, [])

    const fetchRooms = async() =>{
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }


    useEffect(() => {
        
        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        }else {
            const filtered = rooms.filter((room)=> room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurentPage(1)
    }, [rooms, selectedRoomType])

   
    const handlePaginationClick  = (pageNumber) =>{
        setCurentPage(pageNumber)
    }

    const handleDelete = async(roomId) =>{
        try {
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room No. ${roomId} was deleted`)
                fetchRooms()
            }else {
                console.error( `Error deleting room : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    
    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) =>{
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length :  rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }


    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    console.log("filtered rooms", filteredRooms)
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)



    return (
        <>
            {isLoading ? (
                <p>Loading existing rooms</p>
            ): (
               
                <section className='mt-5 mb-5 container'>
                    <div className='d-flex justify-content-center mb-3 mt-5'>
                        <h2>Existing Rooms</h2>
                    </div>
                    <Col md={6} className='mb-3 mb-md-0'>
                        <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                    </Col>

                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr className='text-centered'>
                                <th>ID</th>
                                <th>Room Type</th>
                                <th>Rooom Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentRooms.map((room) => (
                               <tr key={room.id} className='text-center'>
                                    <td>{room.id}</td>
                                    <td>{room.roomType}</td>
                                    <td>{room.roomPrice}</td>
                                    <td className='gap-2'>
                                        <Link to={`/edit-room/${room.id}`}>
                                            <span className='btn btn-info btn-sm'>
                                                <FaEye/>
                                            </span>

                                            <span className='btn btn-warning btn-sm'>
                                                <FaEdit/>
                                            </span>
                                        </Link>


                                        <button
                                        className='btn btn-danger btn-sm'
                                        onClick={() => handleDelete(room.id)}>  
                                           <FaTrashAlt/>
                                        </button>
                                    </td>
                               </tr>
                            ))}
                        </tbody>
                    </table>
                    <RoomPaginator 
                        currentPage={currentPage}
                        totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                        onPageChange={handlePaginationClick}
                    />
                </section>
            )}
        </>
    )
}

export default ExistingRooms