import React, { useState, useEffect } from 'react'
import months from '../data/months'

const AddPlayer = () => {
    const [player, setPlayer] = useState({
        name: "",
        availability: "",
    })
    const handleInput = (e) => {
        const { name, value } = e.target
        setPlayer({
            ...player,
            [name]: value
        })
    }
    const addPlayer = async (e) => {
        e.preventDefault()
        const { name, availability } = player
        try {
            const res = await fetch("/addplayer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, availability
                })
            })
            const data = await res.json()
            console.log(data);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    // date
    const [date, setDate] = useState("")
    useEffect(() => {
        const date = new Date()
        // 
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        setDate(`${day} ${months[month]} ${year}`)
    }, [])
    // 
    return (
        <div className='container mt-2 rounded shadow border p-2'>
            <p className="mb-4">Fill the form below to enroll your name for the football game that will be played on <strong>{date}</strong>.</p>
            <div className="row align-items-center justify-content-between gap-md-0 gap-2">
                <div className="col-md-6">
                    <input type="text" className="form-control" name='name' value={player.name} onChange={handleInput} placeholder='Enter your name' />
                </div>
                <div className="col-md-6">
                    <select className="form-control" name='availability' value={player.availability} onChange={handleInput}>
                        <option value="">Availability</option>
                        <option>Confirmed</option>
                        <option>Not Confirmed</option>
                    </select>
                </div>
                <div className="col-12 text-end mt-2">
                    <button className="btn btn-primary bg-gradient" onClick={addPlayer}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddPlayer
