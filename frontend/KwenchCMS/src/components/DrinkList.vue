<template>
    <div class="drink-list">
        <h2>Drinks List</h2>
        <ul v-if="drinks && drinks.length">
            <li v-for="drink in drinks" :key="drink._id">
                <span>{{ drink.name }} ~ ${{ drink.price }} ({{ drink.quantity }} left)</span>
                <button @click="selectDrink(drink)">Edit</button>
                <button @click="deleteDrink(drink._id)">🗑 Delete</button>
            </li>
        </ul>

        <div v-if="selectedDrink !== null" class="edit-form">
            <h3>Edit drink</h3>
            <label>Name: <input v-model="selectedDrink.name" type="text"></label>
            <label>Quantity: <input v-model="selectedDrink.quantity" type="number"></label>
            <label>Price: <input v-model="selectedDrink.price" type="number"></label>
            <button @click="saveChanges">Save</button>
            <button @click="selectedDrink = null">Cancel</button>
        </div>

        <p v-else>No drinks added yet.</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDrinksStore } from '../store/drinksStore';


const selectedDrink = ref(null);
const drinks = computed(() => drinksStore.drinks);
const drinksStore = useDrinksStore();

const selectDrink = (drink) => {
    selectedDrink.value = { ...drink }; // Clone the object to avoid direct mutation
};

const saveChanges = async () => {
    if (!selectedDrink.value || !selectedDrink.value._id) {
        console.error("Error: Selected drink is missing id or undefined", selectedDrink.value);
        return;
    }
    console.log("🔄 Updating drink:", selectedDrink.value);

    // const drinkToUpdate = { ...selectedDrink.value };

    try {
        await drinksStore.updateDrink(selectedDrink.value._id, {
            name: selectedDrink.value.name,
            quantity: Number(selectedDrink.value.quantity), // Ensure correct type
            price: Number(selectedDrink.value.price), // Ensure correct type
            category: selectedDrink.value.category,
        });
        selectedDrink.value = null;
    } catch (error) {
        console.error("Error updating drink:", error);
    }

}

const deleteDrink = async (id) => {
    if (confirm("Are you sure you want to delete this drink?")) {
        await drinksStore.deleteDrink(id);
    }
}

onMounted(() => {
    drinksStore.fetchDrinks();
});
</script>

<style scoped>
.drink-list {
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    background: #fff;
    color: black;
}
.edit-form {
    margin-top: 20px;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 5px;
}
label {
    display: block;
    margin: 5px 0;
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
    border-bottom: 1px solid #a24a4a;
}
button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background: rgb(13, 104, 183);
  color: white;
}
button:nth-child(3) {
  background: rgb(5, 129, 134);
  color: white;
}
/* button {
    background: #a24a4a;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
}

button:hover {
    background: darkblue;
} */
</style>