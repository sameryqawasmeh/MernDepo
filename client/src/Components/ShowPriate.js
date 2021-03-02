import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

export default props => {
    const [pirate, setPirate] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirate/" + props.id)
            .then(res => setPirate(res.data))
    }, [props.id])

    return (
        <div>
            <button onClick={() => navigate("/pirates")}>Crew Board</button>
            <h1>{pirate.name}</h1>
            <h2>About</h2>
            <p>Catch Phrase: {pirate.catch_phrase}</p>
            <p>Crew Position: {pirate.crew_position}</p>
            <p>Treasures: {pirate.num_of_treasures}</p>
            <p>Peg leg: {pirate.peg_leg ? "Yes" : "No"}</p>
            <p>Eye Patch: {pirate.eye_patch ? "Yes" : "No"}</p>
            <p>Hook Hand: {pirate.hook_hand ? "Yes" : "No"}</p>
            <img style={{height: "250px", width: "250px"}} src={pirate.image_url} alt={pirate.name}/><br/>
            <button onClick={()=>navigate("/pirate/" + pirate._id + "/edit")}>Edit</button> {}
        </div>
    )
}
