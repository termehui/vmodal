<template>
    <div class="v-modal" @click="close" ref="el">
        <h1 class="header" v-if="title">{{ title }}</h1>
        <p v-html="content"></p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ModalOptions } from "./types";
import { useModal } from "./useModal";
export default defineComponent({
    name: "SimpleModal",
    props: {
        globalId: {
            type: String,
            required: true,
        },
        options: {
            type: Object as () => ModalOptions,
            required: true,
        },
        title: String,
        content: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const el = ref<HTMLElement>();
        const { close } = useModal(props.globalId, props.options, el);
        return { close, el };
    },
});
</script>
