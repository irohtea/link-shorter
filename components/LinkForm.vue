<script lang="ts" setup>
import { nanoid } from "nanoid"
import { Database } from 'types/supabase'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

const form = ref<{
  long_url: string;
  key: string;
}>({
  long_url: "",
  key: "",
});

const errors = ref<{
  long_url: string | null;
  key: string | null;
}>({
  long_url: null,
  key: null,
});

const emit = defineEmits(['created'])

const isLoading = ref<boolean>(false);

const handleCreate = async () => {
   if (!user.value) {
    return
  }

  if (!form.value.long_url) {
    errors.value.long_url = 'Long URL is required'
    return
  }
   if (!form.value.key || form.value.key.length < 6) {
      errors.value.key = 'Short url must be at least 6 characters'
      return
   }

   try {
      isLoading.value = true;
      const { data, error } = await client.from('links').insert({
         user_id: user.value?.id,
         long_url: form.value.long_url,
         key: form.value.key
      })

      if(!error) {
         emit('created')
         form.value.long_url = '';
         form.value.key = nanoid(6)

         errors.value.long_url = ''
         errors.value.key = '';
      }
      
   } catch (err) {
      console.log(err)
   } finally {
      isLoading.value = false;
   }
}

onMounted(() => {
  form.value.key = nanoid(6);
});

</script>

<template>
    <div class="card">
      <form @submit.prevent="handleCreate">
         <div class="md:flex md:gap-5 md:items-center" >
            <div class="w-full mb-5 md:w-5/12">
               <label for="url">Your url</label>
               <input v-model="form.long_url" type="text" id="url">
               <span v-if="errors.long_url" class="text-xs py-1 text-red-500">
                  {{ errors.long_url }}
               </span>
            </div>
            <div class="w-full mb-5 md:w-5/12">
               <label for="shortUrl">short url</label>
               <input v-model="form.key" type="text" id="shortUrl">
               <span v-if="errors.key" class="text-xs py-1 text-red-500">
                  {{ errors.key }}
               </span>
            </div>
            <div class="md:w-2/12">
               <button class="btn-purple py-3 px-3 rounded md:w-full hover:border-indigo-500 transition ease-linear duration-150">
                  <template v-if="isLoading">
                     <div>
                        <svg class="animate-spin h-6 w-6 stroke-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                     </div>
                  </template>
                  <template v-else>
                     Shorten URL
                  </template>
               </button>
            </div>
         </div>
      </form>
   </div>
</template>