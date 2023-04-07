import { useNuxtApp } from "#app";
import { sendRedirect } from 'h3'

export default function useRedirect(url: string, code: number = 302) {
   // checking is the url is valid
   if(/^(https?:\/\/)/.test(url)) {

      if(process.server) {
         const nuxtApp = useNuxtApp()
         if(nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            return nuxtApp.callHook('app:redirected').then(() => {
               if(nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
                  return sendRedirect(nuxtApp.ssrContext.event, url, code)
               }
            })
         }
      } else {
         window.location.href = url
      }
   } else {
      throw new Error('Invalid url')
   }

}