<template>
	<MainLayout>
		<div id="ShoppingCartPage" class="mt-4 max-2-[1200px] mx-auto px-2">
			<div
				v-if="!userStore.cart.length"
				class="h-500px flex items-center justify-center"
			>
				<div class="pt-20">
					<img src="/cart-empty.png" alt="" width="250" class="mx-auto" />

					<div class="text-xl text-center mt-4">No items yet?</div>

					<div v-if="!user" class="flex text-center">
						<NuxtLink
							to="/auth"
							class="bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
						>
							Sign in
						</NuxtLink>
					</div>
				</div>
			</div>

			<div v-else class="md:flex gap-4 justify-between mx-auto w-full">
				<div class="md:w-[65%]">
					<div class="bg-white rounded-lg p-4">
						<div class="text-2xl font-bold mb-2">
							Shopping Cart ({{ userStore.cart.length }})
						</div>
					</div>

					<div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
						<div class="text-red-500 font-bold">
							Welcome Deal applicable on 1 item only
						</div>
					</div>

					<div if="Item" class="bg-white rounded-lg p-4 mt-4">
						<div v-for="product of userStore.cart" :key="product.id">
							<CartItem
								:product="product"
								:selectedArray="selectedArray"
								@selectedRadio="selectedRadioFunc"
							/>
						</div>
					</div>
				</div>

				<div class="md:hidden block my-4" />

				<div class="md:w-[35%]">
					<div id="Summary" class="bg-white rounded-lg p-4">
						<div class="text-2xl font-extrabold mb-2">Summary</div>
						<div class="flex items-center justify-between my-4">
							<div class="font-semibold">Total</div>
							<div class="text-2xl font-semibold">
								$ <span class="font-extrabold">{{ totalPriceComputed }}</span>
							</div>
						</div>

						<button
							@click="goToCheckout"
							class="flex items-center justify-center bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
						>
							Checkout
						</button>

						<div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
							<div class="text-lg font-semibold mb-2">Payment methods</div>
							<div class="flex items-center justify-start gap-8 my-4">
								<div v-for="card of cards">
									<img :src="card" alt="" class="h-6" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
import { defineComponent } from 'vue'
import { useUserStore } from '~/stores/user'

export default defineComponent({
	name: 'shoppingcart',
	components: { MainLayout },
})
</script>
<script lang="ts" setup>
const userStore = useUserStore()
const user = useSupabaseUser()

const selectedArray = ref<any[]>([])

onMounted(() => {
	setTimeout(() => (userStore.isLoading = false), 200)
})

const cards = ref(['visa.png', 'mastercard.png', 'paypal.png', 'applepay.png'])

const totalPriceComputed = computed(() => {
	return (
		userStore.cart.reduce((total, prod: any) => total + prod.price, 0) / 100
	)
})

const selectedRadioFunc = (e: any) => {
	if (!selectedArray.value.length) {
		selectedArray.value.push(e)
		return
	}

	const index = selectedArray.value.findIndex((item) => item.id === e.id)

	if (index !== -1) {
		selectedArray.value.splice(index, 1)
	} else {
		selectedArray.value.push(e)
	}
}

const goToCheckout = () => {
	const ids: number[] = selectedArray.value.map((item: any) => item.id)

	const itemsToCheckout: any[] = userStore.cart.filter((item: any) =>
		ids.includes(item.id)
	)

	userStore.checkout = itemsToCheckout.map((item: any) => toRaw(item))

	return navigateTo('/checkout')
}
</script>
