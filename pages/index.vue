<template>
	<MainLayout>
		<div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
			<div
				class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
			>
				<div v-if="products" v-for="product of products.data" :key="product.id">
					<ProductComponent :product="product" />
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

export default defineComponent({
	name: 'mainPage',
	components: { MainLayout },
})
</script>
<script lang="ts" setup>
const userStore = useUserStore()
const products = ref<any>(null)

onBeforeMount(async () => {
	products.value = await useFetch(`/api/prisma/get-all-products`)
	setTimeout(() => (userStore.isLoading = false), 1000)
})
</script>
