<template>
  <div>https://randomuser.me/api/</div>
  <div v-for="user in data?.results">{{ user.gender }}</div>
</template>

<script setup lang="ts">
import { UserApi } from "~/types/user.type";

const { data } = await useFetch<UserApi>(
  "https://randomuser.me/api/?results=5"
);
</script>
