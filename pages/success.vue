<template>
	<MainLayout>
		<div id="SuccessPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
			<div class="bg-white w-full p-6 min-h-[150px]">
				<div class="flex items-center text-xl">
					<Icon
						name="clarity:success-standard-line"
						color="#5FCB04"
						size="35"
					/>
					<span class="pl-4">Payment Successful</span>
				</div>
				<p class="text-sm pl-[50px]">Thank you! We've received your payment.</p>
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

onMounted(() => {
	setTimeout(() => (userStore.isLoading = false), 300)
})
</script>
