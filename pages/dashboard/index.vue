<script lang="ts" setup>
import { Database } from "~/types/supabase"
useHead({
  title: "Dashboard",
})

definePageMeta({
   middleware: 'auth'
})
const user = useSupabaseUser()
const client = useSupabaseClient<Database>()

const { data, refresh } = useAsyncData('links', async () => {
   const { data, error } = await client.from('links').select('*').eq('user_id', user.value?.id).order('created_at', { ascending: false })

   return data
})

console.log({ data })
</script>

<template>
   <main class="pt-24">
      <section class="container">
         <h1 class="text-3xl">Dashboard</h1>
      </section>
      <section class="container mt-10">
         <LinkForm @created="refresh"/>
      </section>
      <section class="container mt-10">
         <h2 class="text-2xl mb-4">Your links</h2>
         <UserLink
            v-for="link in data"
            :key="link.id" 
            :link="{
               created_at: link.created_at,
               shortUrl: link.key,
               longUrl: link.long_url || '',
               id: link.id,
               totalClicks: link.total_clicks
            }"
            class="mb-5" 
         />
      </section>
   </main>
</template>