<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { ref, computed } from 'vue';

let inputValue = ref('')
const props = defineProps(['inputClass', 'placeholder'])
const emit = defineEmits(['inputAct', 'inputTodo']);

const isCaretShow = computed(() => {
    return inputValue.value ? 'auto' : 'transparent';
})

function handleFocus(event: FocusEvent) {
    const inputEl = event.target;
    (inputEl as HTMLInputElement).placeholder = props.placeholder;
}

function handleOnblur(event: FocusEvent) {
    const inputEl = event.target;
    (inputEl as HTMLInputElement).value = '';
    (inputEl as HTMLInputElement).placeholder = '';
}

function handleEnterKey(event: KeyboardEvent) {
    const inputEl = event.target;
    (inputEl as HTMLInputElement).blur();
    if (props.inputClass === 'addAct') {
        emit('inputAct', inputValue.value)
    } else if (props.inputClass === 'addTodo') {
        const [title, ...description] = inputValue.value.split(/[:?：?]/);
        emit('inputTodo', {
            title: title.trim(),
            description: description.toString().trim(),
        })
    }
}

</script>

<template>
    <div class="fancy-input">
        <input
            type="text"
            placeholder=""
            :style="{ caretColor: isCaretShow }"
            v-model="inputValue"
            @focus="handleFocus"
            @blur="handleOnblur"
            @keyup.enter="handleEnterKey"
        >
    </div>

</template>

<style lang="scss" scoped>
.fancy-input {
    width: 100%;

    input {
        border-width: 0px;
        border-radius: 8px;
        width: 100%;
        min-width: 160px;
        height: 36px;
        margin-top: 10px;
        text-align: center;
        font-size: 16px;
        background-color: #EBF1F1;
        background-image: url('../assets/add.svg');
        background-position: center center;
        background-repeat: no-repeat;
        // caret-color: transparent; //隐藏光标

        &:focus,
        :focus-visible {
            outline: 1px solid #646cff;
            background-image: none;
        }
    }
}
</style>
