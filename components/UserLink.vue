<script lang="ts" setup>
const props = defineProps<{
   link: {
      created_at: string | null
      shortUrl: string,
      longUrl: string,
      id: number,
      totalClicks: number
   }
}>()

const config = useRuntimeConfig()

const handleCopy = () => {
   navigator.clipboard.writeText(`${config.public.appUrl}/${props.link.shortUrl}`)
   console.log('copyed')
}
</script>
<!-- link.created_at?.slice(0, 10) -->
<template>
     <div class="card flex justify-between hover:border-teal-500/50 transition ease-linear duration-150">
         <div class="flex flex-col gap-4">
            <NuxtLink :to="`/dashboard/${link.shortUrl}`" class="text-teal-500 font-bold text-2xl hover:underline">{{ link.shortUrl }}</NuxtLink>
            <div class="text-xs text-white/50">{{ link.longUrl.slice(0, 25) + '...' }}</div>
         </div>
         <div class="flex gap-4 items-center">
            <div class="flex flex-col items-end">
               <div title="total clicks" class="flex items-center gap-2 ">
                  <svg class="stroke-amber-700 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                     <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                  <span class="text-xl">
                     {{ link.totalClicks }}
                  </span>
               </div>
               <div>
                  {{ link.created_at?.slice(0, 10) }}
               </div>
            </div>
            <CopyButton
               :data="config.public.appUrl + '/' + link.shortUrl"
            />
         </div>
      </div>
</template>