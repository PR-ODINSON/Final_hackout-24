import Visited from "../models/VisitedModel.js";
export const AddVisit=async(req,res)=>{
   try {
    const {userId,planetName}=req.body;
    // const visited=await Visited.create({userId,planetName});
    const newVisited=new Visited({
      userId,planetName
    })
    if(newVisited){
        await newVisited.save();
        res.status(201).json({
            _id:newVisited._id,
            userId:newVisited.userId,
            planetName:newVisited.planetName
        })
    }
    else{
        res.status(400).json({error:"inavlid visited data"})
    }
    res.status(200).json(visited);
   } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"err in adding visit"})
   }
}
export const visited=async(req,res)=>{
    try {
        const visited=await Visited.find();
        res.status(200).json(visited);
    } catch (error) {
        res.status(500).json({error:"internal server get visit error"})
    }
}