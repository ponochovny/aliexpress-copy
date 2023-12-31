import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({
		isMenuOverlay: false,
		isLoading: false,
		cart: [] as any[],
		checkout: [] as any[],
	}),
	persist: true,
})
