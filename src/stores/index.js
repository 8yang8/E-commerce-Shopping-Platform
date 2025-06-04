import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
export * from '@/stores/categoryStore'
export * from '@/stores/counterStore'
export * from '@/stores/userStore'
export * from '@/stores/cartStore'
