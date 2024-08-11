import mongoose from "mongoose";
const visitedSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
    planetName: String,
    visitedAt: { type: Date, default: Date.now },
});


const Visited = mongoose.model('Visited', visitedSchema)
export default Visited;
