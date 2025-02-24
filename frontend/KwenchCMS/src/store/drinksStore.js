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
            socket.emit('drinkAdded', response.data.drink);
        } catch (error) {
            console.error("Error adding drink:", error);
        }
    };

    socket.on('drinkAdded', (newDrink) => {
        drinks.value.push(newDrink)
    });

    return { drinks, fetchDrinks, addDrink };
})