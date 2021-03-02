import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

export default props => {
    const [name, setName] = useState(""); 
    const [image_url, setImageURL] = useState("");
    const [num_of_treasures, setNumOfTreasures] = useState("");
    const [catch_phrase, setCatchPhrase] = useState("");
    const [crew_position, setCrewPosition] = useState("");
    const [peg_leg, setPegLeg] = useState("");
    const [eye_patch, setEyePatch] = useState("");
    const [hook_hand, setHookHand] = useState("");

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirate/" + props.id)
            .then(res =>{ 
                setName(res.data.name); 
                setImageURL(res.data.image_url); 
                setNumOfTreasures(res.data.num_of_treasures);
                setCatchPhrase(res.data.catch_phrase);
                setCrewPosition(res.data.crew_position);
                setPegLeg(res.data.peg_leg);
                setEyePatch(res.data.eye_patch);
                setHookHand(res.data.hook_hand)
            })
    }, [props.id])

    const onSubmitHandler = e => {
        e.preventDefault();
        setErrors([]);
        axios.put('http://localhost:8000/api/pirate/' + props.id, {
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
        <h1>Edit Pirate</h1>
        <button onClick={() => navigate("/pirates")}>Crew Board</button>
        {errors.map((err, i) => (
            <p key={i} style={{color: "red"}}>{err}</p>
        ))}
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Pirate Name: </label><br/>
                <input type="text" value={name} onChange = {(e)=>setName(e.target.value)} />
            </p>
            <p>
                <label>Url Of Image: </label><br/>
                <input type="text" value={image_url} onChange = {(e)=>setImageURL(e.target.value)} />
            </p>
            <p>
                <label># of Treasure Chests: </label><br/>
                <input type="text" value={num_of_treasures} onChange = {(e)=>setNumOfTreasures(e.target.value)}/>
            </p>
            <p>
                <label>Pirate Catch Phrase: </label><br/>
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
            <button>Update</button>
        </form>
    </>
    )
}