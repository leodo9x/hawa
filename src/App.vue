<template>
  <main class="rounded-lg bg-gray-100 h-[calc(100vh-8px)] flex flex-col">
    <div class="space-y-4 p-4 flex-1">
      <Player
        v-for="(sound, i) in sounds"
        :key="i"
        :src="sound.src"
        :name="sound.name"
        :icon="sound.icon"
      />
    </div>
    <footer class="flex w-full items-center justify-end p-1">
      <a
        target="_blank"
        href="https://github.com/fayazara/hawa"
        class="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      >
        <GithubIcon class="h-4 w-4 text-gray-500" />
      </a>
      <button
        @click="toggle"
        :title="isPlaying ? 'Pause' : 'Play'"
        class="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      >
        <Icon class="text-xs" :name="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" />
      </button>
      <button
        @click="stop"
        title="Stop All"
        class="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      >
        <Icon class="text-xs" name='i-lucide-circle-stop' />
      </button>
      <button
        @click="exitApp"
        title="Exit"
        class="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      >
        <Icon class="text-xs" name="i-lucide-power" />
      </button>
    </footer>
  </main>
</template>
<script setup>
import { platform } from "@tauri-apps/api/os";
import { exit } from "@tauri-apps/api/process";
import { inject, ref } from "vue";
import GithubIcon from "./components/GithubIcon.vue";
import Icon from "./components/Icon.vue";
import Player from "./components/Player.vue";
const emitter = inject("emitter");
const sounds = [
  {
    name: "Rain",
    icon: "i-lucide-cloud-rain",
    src: "/sounds/rain.mp3",
  },
  {
    name: "Thunder",
    icon: "i-lucide-cloud-lightning",
    src: "/sounds/thunder.mp3",
  },
  {
    name: "Wind",
    icon: "i-lucide-wind",
    src: "/sounds/wind.mp3",
  },
  {
    name: "Campfire",
    icon: "i-lucide-flame-kindling",
    src: "/sounds/campfire.mp3",
  },
  {
    name: "Waves",
    icon: "i-lucide-waves",
    src: "/sounds/waves.mp3",
  },
  {
    name: "Coffee Shop",
    icon: "i-lucide-coffee",
    src: "/sounds/coffee-shop.mp3",
  },
  {
    name: "Forest",
    icon: "i-lucide-trees",
    src: "/sounds/forest.mp3",
  },
];
const isPlaying = ref(true);

const exitApp = async () => {
  await exit(1);
};

const stop = () => {
  emitter.emit("stop");
};

const toggle = () => {
  isPlaying.value = !isPlaying.value;
  emitter.emit(isPlaying.value ? "play" : "pause");
};

const setupOs = async () => {
  const platformName = await platform();
  if (platformName) {
    document.body.classList.add(platformName);
  }
};

setupOs();
</script>
