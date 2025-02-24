import { createRouter, createWebHistory } from 'vue-router'
import AdminPanel from '../views/AdminPanel.vue'

const routes = [
    { path: '/', component: AdminPanel },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router