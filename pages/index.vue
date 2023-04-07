<script lang="ts" setup>
useHead({
  title: "LinkShort - Simple and fast URL shortener with statistics",
})
</script>

<template>
   <section class="h-screen grid place-content-center">
      <div class="max-w-3xl mx-auto text-center">
         <h1 class="text-4xl md:text-5xl font-bold heading">Simple and fast URL shortener</h1>
         <p class="my-10 text-lg w-10/12 md:w-2/3 mx-auto">
            Track link popularity by click-through statistics for your link. Find out the ip address, country and city from which the link was clicked.
         </p>
         <NuxtLink 
            :to="{name: 'dashboard'}"
            class="btn btn-primary"
         >
            Start now
         </NuxtLink>
      </div>
   </section>
</template>
