const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    image_url: { type: String, required: [true, "Image URL is required"] },
    num_of_treasures: { type: Number, required: [true, "Number of treasure chests is required"] },
    catch_phrase: { type: String, required: [true, "Catch phrase is required"] },
    crew_position: { type: String, required: [true, "Crew position is required"] },
    peg_leg: {type: Boolean},
    eye_patch: {type: Boolean},
    hook_hand: {type: Boolean},    
}, { timestamps: true });

module.exports.Pirate = mongoose.model('Pirate', PirateSchema);
