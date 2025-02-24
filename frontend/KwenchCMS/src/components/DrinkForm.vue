<template>
    <form @submit.prevent="handleSubmit" class="drink-form">
        <input v-model="name" placeholder="Drink name" type="text" required>
        <input v-model="price" placeholder="Price" type="number" required>
        <input v-model="quantity" placeholder="Quantity" type="number" required>
        <button type="submit">Add Drink</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useDrinksStore } from '../store/drinksStore';

const drinksStore = useDrinksStore();
const name = ref('');
const price = ref('');
const quantity = ref('');

const handleSubmit = () => {
    drinksStore.addDrink({ name: name.value, price: price.value, quantity: quantity.value });
    name.value = '';
    price.value = '';
    quantity.value = '';
}

</script>

<style scoped>
.drink-form {
   display: flex;
   flex-direction: column;
   gap: 10px;
   padding: 10px;
   border: 1px solid white;
   border-radius: 5px;
   background: #fff;
}
input {
    padding: 8px;
    border: 1px solid #a24a4a;
    border-radius: 3px;
}
button{
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