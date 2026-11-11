<script setup>
import { onMounted } from "vue";

const runtimeConfig = useRuntimeConfig();
const baseURL = runtimeConfig.app.baseURL;

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", type: "image/x-icon", href: baseURL + "favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

// Восстанавливаем маршрут после редиректа с 404.html на GitHub Pages
onMounted(() => {
  const router = useRouter();
  const savedPath = sessionStorage.getItem("__nuxt_path");
  if (savedPath) {
    sessionStorage.removeItem("__nuxt_path");
    router.replace(savedPath);
  }
});

const title = "Tapir Nuxt Store";
const description = "Nuxt-приложение на основе предоставленного макета";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
