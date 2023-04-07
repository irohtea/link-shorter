<script lang="ts" setup>
const user = useSupabaseUser()
const auth = useSupabaseAuthClient()

const handleLogout = async () => {
  await auth.auth.signOut()

  useRouter().push({
    name: 'index'
  })

}
const links = ref<{to: string, label: string}[]>([
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/dashboard',
    label: 'Dashboard'
  },
])
</script>

<template>
  <header class="fixed top-0 left-0 right-0 border-b border-white/20 bg-blur z-50">
    <nav class="container py-4 flex items-center justify-between">
      <NuxtLink 
        class="text-xl md:text-2xl font-bold" 
        :to="{name: 'index'}"
      >
        LinkShort
      </NuxtLink>
      <ul class="flex items-center gap-3 md:gap-4">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to" class="hover:text-amber-500 transition ease-linear duration-150 text-sm sm:text-base"> {{ link.label }} </NuxtLink>
        </li>
        <li v-if="!user">
          <NuxtLink 
            :to="{name: 'auth'}" 
            class="btn btn-primary inline-flex items-center gap-1"
          >
            <span class="text-sm sm:text-base">Sign in</span> 
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </NuxtLink>
        </li>
        <li v-else>
          <button 
            class="btn btn-primary inline-flex items-center gap-1" 
            @click="handleLogout"
          >
            <span class="text-sm sm:text-base">Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

