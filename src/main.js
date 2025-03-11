import { createApp } from "vue";
import "./styles.css";
import mitt from "mitt";
import App from "./App.vue";

const emitter = mitt();

const app = createApp(App);
app.provide("emitter", emitter);
app.mount("#app");
