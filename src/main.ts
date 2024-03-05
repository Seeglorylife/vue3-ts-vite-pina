import { createApp } from "vue";
import pinia from "./store";
import LocalApp from "./LocalApp.vue";
import router from "./router";
import i18n from "./language";
import directives from "./directives";
import filters from "./filters";
import "./style.scss";

const app = createApp(LocalApp);

directives(app); // 自定义指令
app.config.globalProperties.$filters = filters; // 全局过滤器

app
  .use(i18n) // 国际化
  .use(pinia) // 注册store
  .use(router)
  .mount("#app");
