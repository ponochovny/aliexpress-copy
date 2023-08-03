<template>
	<MainLayout>
		<div id="OrdersPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
			<div class="bg-white w-full p-6 min-h-[150px]">
				<div class="flex items-center text-xl">
					<Icon name="carbon:delivery" color="#5FCB04" size="35" />
					<span class="pl-4">Orders</span>
				</div>
				<div
					v-if="orders && orders.data"
					v-for="order of orders.data"
					class="text-sm pl-[50px]"
				>
					<div class="border-b py-1">
						<p>Stripe ID: {{ order.stripeId }}</p>

						<div class="pt-2"></div>

						<div v-for="item of order.orderItem">
							<NuxtLink
								:to="`/item/${item.productId}`"
								class="flex items-center gap-3 p-1 hover:underline hover:text-blue-500"
							>
								<img :src="item.product.url" width="40" alt="" />
								{{ item.product.title }}
							</NuxtLink>
						</div>

						<div class="pt-2 pb-5">
							Delivery Address: {{ order.name }}, {{ order.address }},
							{{ order.zipcode }}, {{ order.city }}, {{ order.cuntry }}
						</div>
					</div>
				</div>

				<div v-else class="flex items-center justify-center">
					You have no order history
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
	name: 'success',
	components: { MainLayout },
})
</script>
<script lang="ts" setup>
const userStore = useUserStore()
const user = useSupabaseUser()

const orders = ref<any>(null)

onBeforeMount(async () => {
	if (!user.value) return
	orders.value = await useFetch(
		`/api/prisma/get-all-orders-by-user/${user.value.id}`
	)
})

onMounted(() => {
	if (!user.value) {
		return navigateTo('/auth')
	}

	setTimeout(() => (userStore.isLoading = false), 200)
})
</script>
