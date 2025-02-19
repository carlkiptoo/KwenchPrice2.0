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
    const newDrink = new Drink(req.body)
    await newDrink.save()
    res.status(201).json(newDrink)
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