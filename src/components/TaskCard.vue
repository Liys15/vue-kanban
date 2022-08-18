<script setup lang="ts">
import EventInput from './EventInput.vue';
import { Card_Alias } from "../const";
import type { todoItemInterface } from "../types"
import { ref } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps(['title', 'taskClassNum', 'act'])
const drag = ref(false)

function addTodo(todo: todoItemInterface) {
    props.act[Card_Alias[props.taskClassNum]].push(todo)
}

function deleteTodo(idx: number) {
    props.act[Card_Alias[props.taskClassNum]].splice(idx, 1)
}
</script>

<template>
    <div class="task-card">
        <div class="title">{{ title }}</div>
        <EventInput
            input-class="addTodo"
            placeholder="标题 : 描述"
            @inputTodo="addTodo"
        />
        <draggable
            class="list-group"
            v-model="act[Card_Alias[taskClassNum]]"
            group="todo"
            item-key="title"
        >
            <template #item="{ element, index }">
                <div class="list-group-item">
                    <div class="todo-title">{{ element.title }}</div>
                    <div class="description">{{ element.description }}</div>
                    <div class="button-container">
                        <button
                            class="delete-todo-btn"
                            @click="deleteTodo(index)"
                        ></button>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<style lang="scss" scoped>
.task-card {
    min-width: 240px;
    width: 320px;
    margin: 0 25px;
    position: relative;
    top: 0;
    padding: 10px 18px 30px;
    border-radius: 8px;
    background-color: #F6F8F9;

    .title {
        font-size: 22px;
        text-align: start;
        font-weight: 200;
        font-style: italic;
        margin-bottom: 20px;
    }

    .list-group {
        min-height: 30px;

        .list-group-item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background-color: #fff;
            margin-top: 15px;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            min-height: 50px;
            padding: 0px 10px 10px;
            font-family: Roboto, sans-serif;
            text-align: left;

            &:hover {
                background-color: #F2F7FA;
                cursor: grab;

                .button-container {
                    .delete-todo-btn {
                        background-color: #ca3e47;
                        width: 40px;
                        height: 10px;
                    }
                }

            }

            .todo-title {
                margin: 8px 0;
                font-size: 20px;
                line-height: 22px;
                font-weight: 300;

                &:before {
                    content: "\2022"; //圆点
                    color: #E8693D; //颜色 
                    font-size: 24px; //大小
                    margin-right: 5px;
                }
            }

            .description {
                width: 100%;
                font-size: 18px;
                color: #9c9c9c;
                text-indent: 12px;
                word-break: break-all;
            }

            .button-container {
                min-height: 4px;
                width: 100%;
                position: relative;

                .delete-todo-btn {
                    background-color: #9c9c9c;
                    padding: 0px;
                    border: none;
                    width: 20px;
                    height: 4px;
                    float: right;
                    transition: all 0.6s;

                }
            }
        }
    }


}
</style>