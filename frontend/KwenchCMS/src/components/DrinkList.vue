<template>
    <div class="drink-list">
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
import { computed, onMounted } from 'vue';
import { useDrinksStore } from '../store/drinksStore';

const drinksStore = useDrinksStore();

const deleteDrink = async (id) => {
    await drinksStore.deleteDrink(id);
}

onMounted(() => {
    drinksStore.fetchDrinks();
})

const drinks = computed(() => drinksStore.drinks);
</script>

<style scoped>
.drink-list {
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    background: #fff;
    color: black;
}
h2 {
    margin-bottom: 10px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom:1px solid #a24a4a;
}
button {
    background: #a24a4a;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
}
button:hover {
    background: darkblue;
}

</style>