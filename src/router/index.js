import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Cart',
    component: Cart
  },
  {
    path: '/Category',
    component: Category
  },
  {
    path: '/Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
