# Modal

Modal is a vue 3 plugin for managing modals.

## Installation

**Note:** this package require `animejs` and `shortid` npm package.

### CDN

This package published as `vModal` module in umd.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@termehui/vmodal/dist/style.css"
/>
<script src="https://unpkg.com/@termehui/vmodal"></script>
```

### NPM

```bash
npm i @termehui/vmodal
```

Install modal container with default name (modal):

```ts
import { createApp } from "vue";
import App from "./App.vue";
import vModal from "@termehui/vmodal";

createApp(App).use(vModal).mount("#app");
```

Install modal container with custom name:

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { Container } from "@termehui/vmodal";
createApp(App).component("modal-container", Container).mount("#app");
```

## Options

Modal has three level options:

- global options (used by default for all container)
- container options (passed as container property and override global options)
- modal options (passed on creation time and override container and global options)

| Option          | Type                                                | Description                                        | Default   |
| :-------------- | :-------------------------------------------------- | :------------------------------------------------- | :-------- |
| closable        | `boolean`                                           | modal can close by click on overlay or not         | `false`   |
| enterAnimation  | `AnimeParams`                                       | show animation (animejs animation option)          | scale in  |
| leaveAnimation  | `AnimeParams`                                       | hide animation (animejs animation option)          | scale out |
| refuseAnimation | `AnimeParams`                                       | play when click on overlay and modal not closable  | attention |
| onOpen          | `(firstTime: boolean) => void;`                     | called after modal opened                          | `null`    |
| onAction        | `(key: string, data?: unknown) => Promise<boolean>` | action handler. if return `true` modal will closed | `null`    |
| onClose         | `(mode: "overlay" \| "click" \| "action") => void`  | called after modal close                           | `null`    |

## Usage

### Add Modal Container

To showing modal in your app you need to add modal container component in your template.

```html
<template>
  <modal
    name="default"
    :options="{ closable: false }"
    @modal="totalModalCount = $event"
  />
</template>
```

| Property | Type           | Description                                 | Default   |
| :------- | :------------- | :------------------------------------------ | :-------- |
| name     | `string`       | container name                              | `default` |
| options  | `ModalOptions` | default options used for creating new modal | `{}`      |

**Note:** you can have multiple container in your app. every container must have a unique name.

**Note:** you can use `createModal` and `createSimpleModal` to creating modal for named container or use `createDefaultModal` and `createDefaultSimpleModal` to creating modal for unnamed (default) container.

| Event | Callback Signature        | Description                              |
| :---- | :------------------------ | :--------------------------------------- |
| modal | `(count: number) => void` | This event call when modals count change |

### Show Simple Modal

**Note:** simple modals has no actions. if you want modal with actions support you must use custom modal.

**Note:** simple notifications accept html string as content.

**Note:** title is optional and you can create modal without title.

```ts
import { defineComponent } from "vue";
import { createDefaultSimpleModal } from "@termehui/vmodal";

export default defineComponent({
  setup() {
    function showModal() {
      const globalId = createDefaultSimpleModal(
        {
          title: "Greeting",
          content: "Welcome to our app!",
          class: "my-custom-class",
        },
        {
          closable: true,
          onOpen: (firstTime: boolean) => {
            if (firstTime) {
              console.log("modal opened for first time!");
            } else {
              console.log("modal shown again!");
            }
          },
          onClose: (mode: "overlay" | "click" | "action") => {
            console.log(`modal closed by ${mode} mode`);
          },
        }
      );
      console.log(`new modal by globalId: ${modalId} created!`);
    }

    return { showModal };
  },
});
```

### Custom Modals

To create custom modal you need define a normal vue component with modal library composition api helpers `useModal` and create modal instance using `createModal` function.

**Note:** by default every modal received `globalId` and `options` props. you must define this props in your components and use it to define new modal component.

**Note:** you can define any props in your custom modal component and pass this props when you want create new modal.

#### useModal Parameters

**Caution:** if container not passed modal animations doesn't work!

| Parameter | Type               | Description                                      |
| :-------- | :----------------- | :----------------------------------------------- |
| globalId  | `string`           | global modal id (Automatically passed on create) |
| options   | `ModalOptions`     | modal options (Automatically passed on create)   |
| container | `Ref<HTMLElement>` | modal root node reference                        |

#### useModal Return Values

| Name    | Type                                    | Description                                                        |
| :------ | :-------------------------------------- | :----------------------------------------------------------------- |
| loading | `boolean`                               | on action, loading state will `true` until action promise complete |
| action  | `(key: string, data?: unknown) => void` | helper method to call modal action handler                         |
| close   | `() => void`                            | close modal                                                        |

```vue
<template>
  <div class="v-modal my-custom-modal" ref="container">
    <div v-if="loading">Loading...</div>
    <p>{{ message }}</p>
    <div class="gaper is-auto" v-if="!loading">
      <div class="filler"></div>
      <button class="is-simple" @click.stop="action('yes')">
        {{ yesText || "yes" }}
      </button>
      <button class="is-primary" @click.stop="action('no', 'data')">
        {{ noText || "no" }}
      </button>
      <button @click.stop="close">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ModalOptions, useModal } from "@termehui/vmodal";
export default defineComponent({
  name: "MyModal",
  props: {
    globalId: {
      type: String,
      required: true,
    },
    options: {
      type: Object as () => ModalOptions,
      required: true,
    },
    // custom props
    message: String,
    yesText: String,
    noText: String,
  },
  setup(props, { emit }) {
    const container = ref<HTMLElement>(); // template ref
    const { loading, action, close } = useModal(
      props.globalId,
      props.options,
      container
    );

    return { loading, action, close, container };
  },
});
</script>
```

#### Use Custom Modal

`createModal` method parameters:

**Note:** when using `createDefaultModal` method container parameters not exists.

| Parameter | Type           | Description     |
| :-------- | :------------- | :-------------- |
| container | `string`       | container name  |
| com       | `Object`       | component       |
| props     | `Object`       | component props |
| options   | `ModalOptions` | modal options   |

**Note:** createModal return new modal global id as result.

```typescript
import { defineComponent } from "vue";
import { createDefaultModal } from "@termehui/vmodal";
import MyModal from "./MyModal.vue";
export default defineComponent({
  setup() {
    const showModal = () => {
      createDefaultModal(
        MyModal,
        {
          message: "are you want to delete record?",
          yesText: "Delete",
          noText: "Discard",
        },
        {
          onAction: async (key: string, data?: unknown) => {
            if (key == "yes") {
              const res = await doSomeLongAsyncWork();
              return res ? Promise.resolve(true) : Promise.resolve(false);
            } else {
              Promise.resolve(true);
            }
          },
        }
      );
    };

    return { showModal };
  },
});
```

## Styling

for using default styles you can use one of static (CSS) or termeh (SCSS) predefined files.

**Note**: advanced feature (change default vars, padding classes and color classes) only available in termeh version of style.

```SCSS
// Static
@import "@termehui/vmodal/style.css";
@import "@termehui/vmodal/dist/style.css"; // older node version
// Termeh
@import "@termehui/vmodal/style.scss";
@import "@termehui/vmodal/dist/style.scss"; // older node version
```

### Container Styles

- **is-sub**: add this class to container when use container inside some part of ui (for non-fullscreen containers).

**Note:** Parent node of sub containers must have `position: relative;` style!

### Modal Styles

Modal by default can contains following parts:

- **Header**: default styled header element.

**Note**: this elements must placed directly as modal child.

```html
<div class="v-modal">
  <h1 class="header">{{ header }}</h1>
  <div class="gaper is-auto">
    <div class="filler"></div>
    <button class="is-simple">Cancel</button>
    <button class="is-primary">Approve</button>
  </div>
</div>
```

#### Modal Classes

You could style your custom component by `v-modal` class.

- **is-loading**: add loading ui to modal.
- **is-{gap}-padded**: set modal padding to registered iterable gaps (Termeh only).
- **is-{color}**: set modal color scheme to registered iterable colors (Termeh only).

#### Header Classes

to use pre-defined header in your custom component you should define element with `header` class.

#### Customize Styling

You can override following pre-defined component variable to override default modal styling.

```scss
@include _var("modal", "overlay", rgb(0, 0, 0, 0.75));
@include _var("modal", "primary-border", (1px solid _color("primary")));
```

| Variable         | Description                                            | Default             |
| :--------------- | :----------------------------------------------------- | :------------------ |
| `overlay`        | overlay background                                     | `_color("overlay")` |
| `z-index`        | modal z-index                                          | `1`                 |
| `width`          | modals width                                           | `30rem`             |
| `border`         | default modal border                                   | `none`              |
| `shadow`         | default modal border                                   | a soft shadow       |
| `gaps`           | list of non-iterable gaps to include in modal paddings | `()`                |
| `colors`         | list of non-iterable colors to include in modal colors | `()`                |
| `{color}-border` | colored modal border                                   | `null`              |
| `{color}-shadow` | colored modal shadow                                   | `null`              |
