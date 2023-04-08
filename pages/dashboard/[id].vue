<script lang="ts" setup>
import { Database } from "~/types/supabase"
const config = useRuntimeConfig();
const { id } = useRoute().params
const client = useSupabaseClient<Database>()

const { data } = useAsyncData(id.toString(), async () => {
   const {data:res, error} = await client.from('links').select('*, clicks(*)').eq('key', id).single()

   return res
})

</script>

<template>

   <section v-if="data" class="pt-32 container">
      <div>
         <div class="flex items-center gap-3">
            <h1 class="text-5xl font-bold text-teal-500">/{{ data.key }}</h1>
            <CopyButton
               :data="config.public.appUrl  + '/' + data.key"
            />
         </div>
         <div class="mt-2"><span class="text-white/40">Created at:</span>  {{ data.created_at?.slice(0, 10) }}</div>
      </div>
      <div class="flex gap-5 mt-10 flex-wrap md:flex-nowrap">
         <div class="card gap-2">
            <div class="text-4xl font-bold text-white/70">{{ data.total_clicks }}</div>
            <div class="text-white/70">Total Clicks</div>
         </div>
         <div class="card w-full flex items-center justify-between flex-wrap gap-2">
            <div > {{ data.long_url.slice(0, 40) }}...</div>
            <CopyButton 
            :data="data.long_url"
            />
         </div>
      </div>
      <div class="mt-10">
         <h2 class="text-2xl mb-5 text-white/70">Clicks logs</h2>
         <div class="flex flex-col gap-4">
            <div 
               v-for="click in data.clicks" 
               :key="click?.id" 
               class="card"
            >
            <template v-if="click && typeof click === 'object'">
               <div class="flex justify-between gap-4 flex-wrap md:flex-nowrap">
                  <div class="flex flex-col gap-2">
                     <div >
                        <span class="text-white/50">ip: </span> 
                        <span class="text-orange-700">{{ click.ip }}</span> 
                     </div>
                     <div>
                        <span class="text-white/50">Clicked at: </span> 
                        <span class="text-white/70">{{ click.created_at }}</span> 
                     </div>
                  </div>
                  <div class="flex flex-col gap-2">
                     <div v-if="click.country">Country: {{ click.country }}</div>
                     <div v-if="click.city">City: {{ click.city }}</div>
                  </div>
               </div>
            </template>
            </div>
         </div>
      </div>
   </section>

 </template>