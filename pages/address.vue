<template>
	<MainLayout>
		<div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
			<div class="mx-auto bg-white rounded-lg p-3">
				<div class="text-xl text-bold mb-2">Address Details</div>

				<form @submit.prevent="submit">
					<TextInput
						class="w-full"
						placeholder="Contact Name"
						v-model:input="contactName"
						inputType="text"
						:error="error && error.type === 'contactName' ? error.message : ''"
					/>

					<TextInput
						class="w-full"
						placeholder="Address"
						v-model:input="address"
						inputType="text"
						:error="error && error.type === 'address' ? error.message : ''"
					/>

					<TextInput
						class="w-full"
						placeholder="Zip Code"
						v-model:input="zipCode"
						inputType="text"
						:error="error && error.type === 'zipCode' ? error.message : ''"
					/>

					<TextInput
						class="w-full"
						placeholder="City"
						v-model:input="city"
						inputType="text"
						:error="error && error.type === 'city' ? error.message : ''"
					/>

					<TextInput
						class="w-full"
						placeholder="Country"
						v-model:input="country"
						inputType="text"
						:error="error && error.type === 'country' ? error.message : ''"
					/>

					<button
						:disabled="isWorking"
						type="submit"
						class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
					>
						<div v-if="!isWorking">Update Address</div>
						<Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
					</button>
				</form>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
import { defineComponent } from 'vue'
import { useUserStore } from '~/stores/user'

export default defineComponent({
	name: 'address',
	components: { MainLayout },
})
</script>
<script lang="ts" setup>
const userStore = useUserStore()

const contactName = ref(null)
const address = ref(null)
const zipCode = ref(null)
const city = ref(null)
const country = ref(null)

const currentAddress = ref(null)
const isUpdate = ref(null)
const isWorking = ref(false)
const error = ref<{ type: string; message: string } | null>(null)

watchEffect(() => {
	userStore.isLoading = false
})

const submit = async () => {
	isWorking.value = true
	error.value = null

	if (!contactName.value) {
		error.value = {
			type: 'contactName',
			message: 'A contact name is required',
		}
	} else if (!address.value) {
		error.value = {
			type: 'address',
			message: 'An address is required',
		}
	} else if (!zipCode.value) {
		error.value = {
			type: 'zipCode',
			message: 'A zip code is required',
		}
	} else if (!city.value) {
		error.value = {
			type: 'city',
			message: 'A city is required',
		}
	} else if (!country.value) {
		error.value = {
			type: 'country',
			message: 'A country is required',
		}
	}

	if (error.value) {
		isWorking.value = false
		return
	}

	// MORE HERE
}
</script>
