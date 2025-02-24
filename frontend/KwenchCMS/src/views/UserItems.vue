<template>
    <div class="menu-container">
        <div class="header">
            <div class="logo-section">
                <img src="../assets/Kwench.png" alt="logo" class="logo" />

            </div>
            <div class="cafe-info">
                <h2>Kwench Tot</h2>
                <hr class="divider" />
                <p class="opening-hours">Mon to Wed Opening hours: 9am - 1am</p>
                <p class="opening-hours">Thur to Sun Opening hours: 9am - 8am</p>
                <p class="font-semibold text-black"><font-awesome-icon :icon="['fas', 'phone']" /> : <a
                        href="tel:+254117390924">+254117390924 </a></p>
                <h2>We Do Delivery...<font-awesome-icon :icon="['fas', 'motorcycle']" /></h2>
            </div>
            <div class="right-section">
                <div class="search-container">
                    <input type="text" placeholder="Search" v-model="searchTerm" @input="filterMenu"
                        class="search-box" />
                </div>
                <a :href="whatsappLink" target="_blank" class="whatsapp-widget" title="Chat with us on WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Order on WhatsApp</span>
                </a>
            </div>
        </div>
        <div class="buttons">
            <button class="filter-btn" @click="filterCategory('Jaba Juice')">Jaba Juice</button>
            <button class="filter-btn" @click="filterCategory('Beers')">Beers/Soft Drinks</button>
            <button class="filter-btn" @click="filterCategory('Cognacs')">Cognacs</button>
            <button class="filter-btn" @click="filterCategory('Liqueurs')">Liqueurs</button>
            <button class="filter-btn" @click="filterCategory('Single Malt Whiskeys')">Single Malt Whiskeys</button>
            <button class="filter-btn" @click="filterCategory('Blended Whiskeys')">Blended Whiskeys</button>
            <button class="filter-btn" @click="filterCategory('Gin')">Gin</button>
            <button class="filter-btn" @click="filterCategory('Vodka')">Vodka</button>
            <button class="filter-btn" @click="filterCategory('Brandy')">Brandy</button>
            <button class="filter-btn" @click="filterCategory('Rum')">Rum</button>
            <button class="filter-btn" @click="filterCategory('Spirits')">Spirits</button>
            <button class="filter-btn" @click="filterCategory('Tequilla')">Tequilla</button>
            <button class="filter-btn" @click="filterCategory('Cigarettes')">Cigarettes</button>
            <button class="filter-btn" @click="filterCategory('Dry Red Wine')">Dry Red Wine</button>
            <button class="filter-btn" @click="filterCategory('Dry White Wine')">Dry White Wine</button>
            <button class="filter-btn" @click="filterCategory('Semi Dry Red')">Semi Dry Red</button>
            <button class="filter-btn" @click="filterCategory('Sweet Red Wine')">Sweet Red Wine</button>
            <button class="filter-btn" @click="filterCategory('Sweet White Wine')">Sweet White Wine</button>
            <button class="filter-btn" @click="filterCategory('All')">Show All</button>
        </div>
        <div class="menu-section">
            <div class="menu-columns">
                <div v-for="category in categories" :key="category" class="menu-column">
                    <div v-if="filteredDrinks.some(drink => drink.category === category)">
                        <h4>{{ category }}</h4>
                        <ul>
                            <li v-for="drink in filteredDrinks.filter(d => d.category === category)" :key="drink._id">
                                <span class="item-name">{{ drink.name }}</span>
                                <span v-if="drink.quantity" class="item-quantity">Quantity: {{ drink.quantity }}</span>
                                <span class="item-price">KES {{ drink.price }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDrinksStore } from '../store/drinksStore';
import { io } from 'socket.io-client';

const drinksStore = useDrinksStore();
const selectedCategory = ref("All")

const categories = computed(() => [...new Set(drinksStore.drinks.map(drink => drink.category))]);

const filteredDrinks = computed(() => {
    return drinksStore.drinks
})

onMounted(() => {
    drinksStore.fetchDrinks();
})

const socket = io("http://localhost:5000");
socket.on('drinkUpdated', (updatedDrink) => {
    drinksStore.updateDrinkInList(updatedDrink)
})

socket.on('drinkAdded', (newDrink) => {
    drinksStore.addDrinkToList(newDrink)
})

socket.on('drinkDeleted', (deletedDrinkId) => {
    drinksStore.deleteDrinkFromList(deletedDrinkId)
})

</script>




<style scoped>
.right-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.whatsapp-widget {
    background-color: #25d366;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.whatsapp-widget:hover {
    transform: translateY(-2px);
    background-color: #128c7e;
}

.whatsapp-widget svg {
    width: 24px;
    height: 24px;
}

.logo-section {
    flex: 1;
}

.buttons {
    margin-bottom: 20px;
}

.filter-btn {
    background: #333333;
    border: none;
    color: white;
    padding: 6px 12px;
    margin: 5px;
    font-size: 15px;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.3s ease, transform 0.3s ease;
    box-shadow: 0px 4px 6px rgba(o, 0, 0, 0.2);
}

.filter-btn:hover {
    background: linear-gradient(135deg, #1a1a1a, #b8860b);
    transform: scale(1.05);
}

.filter-btn:active {
    background: linear-gradient(135deg, #333333, #af9500);
    transform: scale(0.95);
}

.logo {
    width: 150px;
    height: auto;
    max-width: 100%;


}

.menu-container {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 7%, rgba(212, 144, 23, 1) 100%, rgba(15, 195, 224, 1) 100%, rgba(0, 212, 255, 1) 100%);
    background-size: cover;
    background-repeat: no-repeat;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.search-container {
    margin-bottom: 20px;
}

.search-box {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    outline: none;
    box-sizing: border-box;
}

.title-section {
    flex: 1;
}

.opening-hours {
    text-align: right;
    font-style: italic;
}

.divider {
    border: none;
    border-top: 1px solid white;
    margin: 10px 0;
}

.item-name {
    float: left;
    margin-left: 40px;
}

.item-price {
    float: right;
    margin-right: 40px;
}

.item-quantity {
    margin: 0 10px;
    flex: 1;
    text-align: center;
}

li::after {
    content: "";
    display: table;
    clear: both;
}

.menu-column h4 {
    text-align: center;
    font-size: 1.7em;
    margin-bottom: 10px;
    color: #fff;
}

ul {
    color: white;
}

h1,
h2,
h3,
h4,
p {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 15px;
    color: white;
}

h1 {
    font-size: 2em;
}

h2 {
    font-size: 1.5em;
    color: #fff;
}

.cafe-info {
    text-align: right;
    margin-bottom: 20px;
    margin-right: 40px;
}

.cafe-info h2 {
    margin-bottom: 10px;
}

.menu-section {
    margin-bottom: 30px;
}

.menu-columns {
    justify-content: space-between;
}

.menu-column {
    flex: 1;
    margin-right: 20px;
}

.menu-column:last-child {
    margin-right: 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 15px;
}

.price {
    float: right;
    font-weight: bold;
}

@media (max-width: 768px) {
    .logo {
        width: 120px;

        padding-bottom: 15px;
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 3px;
    }

    .filter-btn {
        padding: 4px 8px;
        margin: 3px;


    }

    .menu-title {
        font-size: 1.2rem;
    }

    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    .search-box {
        font-size: 0.9rem;
    }

    .header {
        flex-direction: column;
        align-items: center;
    }

    .opening-hours {
        margin-top: 10px;
        text-align: left;
    }

    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0;
    }

    .item-name {
        text-align: left;
        margin-right: 10px;
        flex: 2;
    }

    .item-quantity {
        text-align: center;
        flex: 1;
    }

    .menu-container {
        padding: 15px;
    }

    .menu-columns {
        padding: 0;
    }

    .search-container {
        margin-bottom: 15px;
    }

    .cafe-info h2 {
        margin-bottom: 5px;

    }
}
</style>