const {Pirate} = require('../models/pirate.model')

module.exports.createPirate = (request, response) => {
    const { name, image_url, num_of_treasures, catch_phrase, crew_position, peg_leg, eye_patch, hook_hand } = request.body;
    Pirate.create({
        name,
        image_url,
        num_of_treasures, 
        catch_phrase,
        crew_position, 
        peg_leg,
        eye_patch,
        hook_hand
    })
        .then(pirate => { console.log("success"); response.json(pirate)})
        .catch(err => response.status(400).json(err));
}

module.exports.getAllPirates = (_request, response) => {
    Pirate.find({})
        .then(pirates => response.json(pirates))
        .catch(err => response.json(err))
}

module.exports.deletePirate = (request, response) => {
    Pirate.findByIdAndDelete(request.params.id)
    .then(() => response.json({status: 'success'}))
    .catch(err => response.json(err))
}

module.exports.getPirate = (request, response) => {
    Pirate.findById(request.params.id)
        .then(pirate => response.json(pirate))
        .catch(err => response.json(err))
}

module.exports.updatePirate = (request, response) => {
    const { name, image_url, num_of_treasures, catch_phrase, crew_position, peg_leg, eye_patch, hook_hand } = request.body;
    Pirate.findByIdAndUpdate(request.params.id, {name, image_url, num_of_treasures, catch_phrase, crew_position, peg_leg, eye_patch, hook_hand}, { new: true, runValidators: true}) 
        .then(updatedPirate => response.json(updatedPirate))
        .catch(err => response.status(400).json(err))
}

