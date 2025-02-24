import { defineStore } from "pinia";
import {ref } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const useDrinksStore = defineStore('drinks', () => {
    const drinks = ref([]);

    const fetchDrinks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/drinks");
            drinks.value = response.data || [];
        } catch (error) {
            console.error("Error fetching drinks:", error);
            drinks.value = [];
        }
    };

    const addDrink = async (drink) => {
        try {
            const response = await axios.post('http://localhost:5000/drinks', drink);
            drinks.value.push(response.data.drink);
           
        } catch (error) {
            console.error("Error adding drink:", error);
        }
    };

    const updateDrink = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/drinks/${id}`, updatedData);
            console.log("✅ Server response:", response.data);
            
            const updatedDrink = response.data.drink;
            if (!updatedDrink) {
                console.error("🚨 Error: Server did not return updated drink");
                return;
            }

            const index = drinks.value.findIndex(d => d._id === id);

            if (index !== -1) {
                drinks.value[index] = updatedDrink;
            }
        } catch (error) {
            console.error("Error updating drink:", error);
        }
    }

    const deleteDrink = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/drinks/${id}`);
            drinks.value = drinks.value.filter(drink => drink._id !== id);
        } catch (error) {
            console.error("Error deleting drink:", error);
        }
    }

    socket.on("drinkAdded", (newDrink) => {
        drinks.value.push(newDrink);
    })

    socket.on("drinkUpdated", (updatedDrink) => {
        const index = drinks.value.findIndex(drink => drink._id === updatedDrink._id);
        if (index !== -1) {
            drinks.value[index] = updatedDrink;
        }
    })
    socket.on("drinkDeleted", (deletedDrinkId) => {
        drinks.value = drinks.value.filter(drink => drink._id !== deletedDrinkId);
    })


    fetchDrinks();

   

    return { drinks, fetchDrinks, addDrink, deleteDrink, updateDrink };
})