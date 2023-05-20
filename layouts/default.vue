<template>
  <NuxtLink to="/">Home page</NuxtLink>
  <NuxtLink to="/counter">Counter page</NuxtLink>
  <NuxtLink to="/counter-pina">Counter pina page</NuxtLink>
  <NuxtLink to="/map">map page</NuxtLink>

  <slot />
</template>

<style>
* {
  box-sizing: border-box;
}
html,
body,
#__nuxt {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
