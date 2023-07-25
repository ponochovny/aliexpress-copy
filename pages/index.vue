<template>
	<MainLayout>
		<div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
			Index Page
		</div>
	</MainLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'

export default defineComponent({
	name: 'mainPage',
	components: { MainLayout },
})
</script>
<script lang="ts" setup></script>
