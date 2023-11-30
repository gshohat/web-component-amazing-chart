# Web Component Amazing Chart

![NPM License](https://img.shields.io/npm/l/web-component-amazing-chart)

**Lightweight** stock line chart **< 15k** 😎 <br>
Compatible with React, Vue, Angular & other frameworks.
Optional animation.

![amazing-chart](https://github.com/gshohat/web-component-amazing-chart/assets/91323932/ea6568e4-1de0-49aa-94e6-aac885f71c13)

## Vue usage

`npm i web-component-amazing-chart`

main.js
```
import AmazingChart from "web-component-amazing-chart";

customElements.define('amazing-chart', AmazingChart);
```

App.vue
```
onMounted(() => {
  let amazingChartElement = document.querySelector('#amazing-chart');
  amazingChartElement.options = {
      data: [
        { time: 1672084591000, price: 5 }, { time: 1674762991000, price: 6 },
        { time: 1677441391000, price: 5 }, { time: 1679860591000, price: 6 },
        ....
      ],
      animate: true,
    };

});

<template>
<amazing-chart id="amazing-chart"/>
</template
```

vite config:
```
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('amazing-chart')
        }
      }
    })
  ],
```


## Contact
hi@giladshohat.com 💫
