import mongoose from "mongoose";

const DrinksSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: String, required: true},
    category: {type: String, required: true}
})

export default mongoose.model('Drink', DrinksSchema)