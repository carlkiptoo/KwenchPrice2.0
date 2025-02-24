<template>
    <div class="drinklist">
        <h2>Drinks List</h2>
        <ul v-if="drinks && drinks.length">
            <li v-for="drink in drinks" :key="drink._id">
                <span>{{ drink.name }} ~ ${{ drink.price }} ({{ drink.quantity }} left)</span>
                <button @click="deleteDrink(drink._id)">Delete</button>
            </li>
        </ul>
        <p v-else>No drinks added yet.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useDrinksStore } from '@/store/drinksStore';

const drinksStore = useDrinksStore();

const deleteDrink = async (id) => {
    await drinksStore.deleteDrink(id);
}

onMounted(() => {
    drinksStore.fetchDrinks();
})

const drinks = drinksStore.drinks
</script>