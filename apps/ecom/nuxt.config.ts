// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    public: {
      STRIPE_PK_KEY: "",
    },
  },
  supabase: {
    redirect: false,
    // redirectOptions: {
    //   login: "/auth",
    //   callback: "/auth",
    // },
  },
  app: {
    head: {
      script: [{ src: "https://js.stripe.com/v3/", defer: true }],
      link: [{ rel: "icon", type: "image/x-svg", href: "/favicon.svg" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  imports: {
    dirs: ["stores"],
  },
});
