import axios from "axios"


export const api = axios.create({
    baseURL : "http://localhost:8080"
})


/**
 * 
 * @param {*} photo 
 * @param {*} roomType 
 * @param {*} roomPrice 
 * Adds new room to the database
 */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/addNewRoom", formData)
    if (response.status === 201){
        return true
    }else {
        return false
    }
}

/**
 * get room type
 * 
 * @returns all room types from the database
 */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/roomTypes")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

/**
 * get all rooms
 * 
 * @returns all rooms from the database
 */
export async function getAllRooms() {
    try{
        const result = await api.get("rooms/allRooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
} 


/**
 * deletes a room by the id
 * 
 * @param {*} roomId 
 * @returns success message
 */
export async function deleteRoom(roomId) {
    try {
        const result =await api.delete(`rooms/deleteRoom/${roomId}`)
        return result.data
    }catch (error){
        throw new Error(`Error deleting room ${error.message}`)
    }
}