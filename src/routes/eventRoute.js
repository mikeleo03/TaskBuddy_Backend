import express from 'express';
import Event from "../models/Event.js";
import handleError from "../utils/eventError.js";

const router = express.Router();
router.use(express.json());

// GET ROUTE
router.get("/", async(req, res)=>{
    const events = await Event.find({});
    try {
       res.status(200).json(events)
    } catch(err){
        handleError(err, res)
    }
});

router.get("/:id/show", async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id);
 
    try {
       res.status(200).json(event)
    } catch(err){
        handleError(err, res)
    }
});

// POST
router.post("/", async(req, res) => {    
    try {
        const newEvent = new Event(req.body);
        console.log(newEvent);
        await newEvent.save();
        res.status(200).json(newEvent);
    } catch(err) {
        handleError(err, res)
    }
})

// PUT
router.put("/:id/update", async (req, res) => {
    const id = req.params.id
    try {
        const event = await Event.findOne({_id : id})
        if (event) {
            Object.assign(event, req.body);
            event.save((err, event) => {
                if (err) {
                    handleError(err, res)
                } else {
                    res.status(200).json(event)
                }
            })
        }   
        if (!event) {
            res.status(404).json({error: "event is not found"})
        }
    } catch (err) {
        console.log(err)
        handleError(err,res)
    }
})

// DELETE
router.delete("/:id/delete", async(req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    } catch(err) {
        handleError(err, res)
    }
})

export default router;