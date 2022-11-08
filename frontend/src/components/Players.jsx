import React, { useState, useEffect } from 'react'
import { FaTrash } from "react-icons/fa"

const Players = () => {
    // fetch players
    const [players, setPlayers] = useState([])
    const fetchPlayers = async () => {
        try {
            const res = await fetch("/fetchplayers")
            const data = await res.json()
            console.log(data);
            if (res.status === 200) {
                setPlayers(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPlayers()
    }, [])

    // delete player
    const deletePlayer = async (id) => {
        try {
            const res = await fetch("/deleteplayer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            })
            const data = await res.json()
            console.log(data);
            fetchPlayers()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container mt-4 rounded shadow border p-2'>
            <h1>Players :</h1>
            {
                players.length === 0 ? <p className='mt-2'>No player in the list</p> :


                    <div className="overflow-auto">
                        <table className="table table-bordered border-dark border-bottom mt-2">
                            <thead>
                                <tr>
                                    <th>Sr no</th>
                                    <th>Name</th>
                                    <th>Availability</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    players.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.availability}</td>
                                                <td className='text-end'>
                                                    <button className="btn btn-danger bg-gradient" onClick={() => deletePlayer(item._id)}><FaTrash /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default Players
