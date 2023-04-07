<script lang="ts" setup>
import geoip from "geoip-lite"
import { Database } from "~/types/supabase"

const params = useRoute().params
const client = useSupabaseClient<Database>()

//get the params id
if(!params.id) {
   throw createError({
      statusCode: 404, 
      statusMessage: 'Not found'
   })
}
// fetch the data from the supabase
const { data } = await useAsyncData('link', async () => {
   const { data, error } = await client.from('links').select('*').eq('key', params.id).single()

   if(error) {
      throw createError({
         statusCode: 404, 
         statusMessage: 'Not found'
      })
   }

   return data
})

if(data.value?.long_url) {
   const ua = useUserAgent()

   if(ua && ua.ip) {
      const geoLoc = geoip.lookup(ua.ip)

      const {data: res, error } = await client.from('clicks').insert({
         user_agent: ua.userAgent,
         link_id: data.value.id,
         ip: ua.ip,
         city: geoLoc?.city,
         country: geoLoc?.country,
      })
   }

   useRedirect(data.value?.long_url)
}
</script>
<template>
   <div class="grid place-content-center h-screen">Redirecting...</div>
</template>
<!-- useRedirect(data.value?.long_key) -->



