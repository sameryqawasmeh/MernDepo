import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router';
import axios from 'axios';

export default () => {
    const [pirates, setPirates] = useState(null); 

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pirates')
            .then(response=>setPirates(response.data))
            .catch((err)=>console.log(err))
    }, [])

    const deleteHandler = (id) => {
        axios.delete('http://localhost:8000/api/pirate/' + id)
        .then(() => setPirates(pirates.filter(pirate => pirate._id !== id)))
        .catch((err)=>console.log(err))  
    }

    if (pirates === null) return "In Process";

    return (
        <>
            <h1>Pirate Crew</h1>
            <button onClick={() => navigate("/pirate/new")}>Add Pirate</button>
            {pirates.map((pirate, index)=>{
                    return (
                        <div key={index}>
                            <p>{pirate.name} { }
                            <button onClick={()=>navigate("/pirate/" + pirate._id)}>View Pirate</button> { } | { }
                            <button onClick={()=>deleteHandler(pirate._id)}>Delete</button> { } | { }
                            <button onClick={()=>navigate("/pirate/" + pirate._id + "/edit")}>Edit</button>
                            </p>
                        </div>
                    )
            })}
        </>
    )
}
