<template>
    <div class="layout">
        <modal />
        <demo />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Demo from "./Demo.vue";
export default defineComponent({
    components: { Demo },
});
</script>

<style lang="scss">
@use "@termehui/termeh/termeh.scss" as T;
@use "var";
@use "@termehui/termeh/styles.scss";
@use "@termehui/termeh/layout/container.scss";
@use "@termehui/termeh/layout/grid.scss";
@use "@termehui/termeh/layout/gaper.scss";
@use "@termehui/termeh/components/button.scss";
@use "@termehui/termeh/components/header.scss";
@import "../src/termeh.scss";

.sec {
    height: 70vh;
    background: T.variant("base", "section");
    position: relative;
}
</style>
