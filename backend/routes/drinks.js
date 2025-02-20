import express from 'express';
import Drink from '../models/Drink.js';

const router = express.Router();

//GEt all drinks
router.get('/', async (req, res) => {
    try {
        const drinks = await Drink.find();
        res.json(drinks);
    } catch (err) {
        console.error('Error fetching drinks:', err);
        res.status(500).send('Error fetching drinks');
    }
  
});

//Add a new drink
router.post('/', async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            const drinks = await Drink.insertMany(req.body);
            return res.status(201).json({message: 'Drinks added', drinks});
        }
         const drink = new Drink(req.body);
         await drink.save();
         return res.status(201).json({message: 'Single drink added',drink});
    } catch (err) {
        console.error('Error adding drink:', err);
        res.status(500).send('Error adding drink');
    }
    
});

//Update Drink
router.put('/:id', async (req, res) => {
    await Drink.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
})

//Delete drink
router.delete('/:id', async (req, res) => {
    await Drink.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

export default router;