import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Paper } from '@material-ui/core';

export default () => {
    const [name, setName] = useState(""); 
    const [image_url, setImageURL] = useState("");
    const [num_of_treasures, setNumOfTreasures] = useState("");
    const [catch_phrase, setCatchPhrase] = useState("");
    const [crew_position, setCrewPosition] = useState("");
    const [peg_leg, setPegLeg] = useState(true);
    const [eye_patch, setEyePatch] = useState(true);
    const [hook_hand, setHookHand] = useState(true);

    const [errors, setErrors] = useState([]);
  
    const onSubmitHandler = e => {
        e.preventDefault();
        setErrors([]);
        axios.post('http://localhost:8000/api/pirate', {
            name,
            image_url,
            num_of_treasures,
            catch_phrase,
            crew_position,
            peg_leg,
            eye_patch,
            hook_hand
        })
            .then(() => navigate("/pirates"))
            .catch(err => {
                const errs = [];
                const innerErrors = err.response.data.errors;

                for (const key in innerErrors){
                    errs.push(innerErrors[key].message);
                }
                setErrors(errs);
            })
    }

    return (
        <>
        <Paper elevation={3}>
        <h1>Add Pirate</h1>
        </Paper>
        <button onClick={() => navigate("/pirates")}>Crew Board</button>
        {errors.map((err, i) => (
            <p key={i} style={{color: "red"}}>{err}</p>
        ))}
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Pirate_Name </label><br/>
                <input type="text" value={name} onChange = {(e)=>setName(e.target.value)} />
            </p>
            <p>
                <label>URL Of Image </label><br/>
                <input type="text" value={image_url} onChange = {(e)=>setImageURL(e.target.value)}/>
            </p>
            <p>
                <label>Number of Treasure Chests </label><br/>
                <input type="text" value={num_of_treasures} onChange = {(e)=>setNumOfTreasures(e.target.value)}/>
            </p>
            <p>
                <label>Pirate Catch Phrase </label><br/>
                <input type="text" value={catch_phrase} onChange = {(e)=>setCatchPhrase(e.target.value)}/>
            </p>
            <p>
                <label>Crew Position: </label><br/>
                <select onChange = {(e)=>setCrewPosition(e.target.value)} name="crew_position" value={crew_position}>
                    <option value="">Select Crew Position</option>
                    <option value="Captain">Captain</option>
                    <option value="First Mate">First Mate</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                </select><br></br>
            </p>
            <p>
                <label>Peg Leg: </label><br/>
                <input type="checkbox" value={peg_leg} onChange = {()=>setPegLeg(!peg_leg)} checked={peg_leg}/>
            </p>
            <p>
                <label>Eye Patch: </label><br/>
                <input type="checkbox" value={eye_patch} onChange = {()=>setEyePatch(!eye_patch)} checked={eye_patch}/>
            </p>
            <p>
                <label>Hook Hand: </label><br/>
                <input type="checkbox" value={hook_hand} onChange = {()=>setHookHand(!hook_hand)} checked={hook_hand}/>
            </p>
            <button>Add Pirate</button>
        </form>
    </>
    )
}
