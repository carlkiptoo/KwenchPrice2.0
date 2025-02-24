import { createRouter, createWebHistory } from 'vue-router'
import AdminPanel from '../views/AdminPanel.vue'
import UserItems from '../views/UserItems.vue'

const routes = [
    { path: '/', component: UserItems },
    { path: '/admin', component: AdminPanel },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router