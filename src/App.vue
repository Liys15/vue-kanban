<script setup lang="ts">
import { CARD_TITLE } from "./const";
import type { ActivityInterface } from "./types"
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import EventInput from './components/EventInput.vue';
import TaskCard from './components/TaskCard.vue';
import draggable from 'vuedraggable'

const storeData: ActivityInterface[] = [
  {
    activityName: 'Default',
    isActived: true,
    todo: [],
    inProgress: [],
    completed: []
  }
];

const store = useStorage('kanban-data', storeData)

const activedActivity = computed(() => {
  const actNum: number = store.value.findIndex(item => item.isActived)
  return actNum
})

function handleClick(key: number) {
  store.value.forEach((item, idx) => {
    if (idx === key && !item.isActived) {
      item.isActived = true
    } else {
      item.isActived = false
    }
  })
}

function addActivity(actName: string) {
  store.value.forEach(item => item.isActived = false);
  store.value.push({
    activityName: actName,
    isActived: true,
    todo: [],
    inProgress: [],
    completed: []
  });
}

function removeActivity() {
  const idx = store.value.findIndex(item => item.isActived)
  store.value.splice(idx, 1)
  store.value[idx - 1 < 0 ? 0 : idx - 1].isActived = true
}

</script>

<template>
  <div class="nav-activity">
    <h1 class="title">.kanban</h1>
    <EventInput
      input-class="addAct"
      placeholder="活动"
      @inputAct="addActivity"
    />
    <draggable
      class="list-group-act"
      :list="store"
      group="activities"
    >
      <template #item="{ element, index }">
        <div
          class="list-group-item"
          :class="{ active: element.isActived }"
          @click="handleClick(index)"
        >{{ element.activityName }}</div>
      </template>
    </draggable>
  </div>
  <div class="task-view">
    <div class="header">
      <div class="title">All Tasks</div>
      <button @click="removeActivity">Remove this Event</button>
    </div>
    <div class="activity-content">
      <TaskCard
        v-for="(item, idx) in CARD_TITLE"
        :title="item"
        :taskClassNum="idx"
        :act="store[activedActivity]"
      > </TaskCard>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.nav-activity {
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin: 10px 0;
  padding: 0 10px;
  height: calc(100vh - 20px);
  border-right: 2px solid rgba(0, 0, 0, 0.2);

  .title {
    margin: 10px 30px;
    font-family: Impact, 'Arial Narrow Bold';
    font-size: 48px;
    color: #E8693D;
  }

  .list-group-act {
    width: 100%;
    margin-top: 10px;

    .list-group-item {
      background-color: #EBF1F1;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 8px;
      margin: 20px auto;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;

      &.active {
        background-color: #E8693D;
        color: #fff;
      }
    }
  }
}

.task-view {
  position: relative;
  width: calc(100vw - 222px);

  .header {
    min-height: 110px;
    padding: 35px 0px;
    display: flex;

    .title {
      font-size: 32px;
      font-weight: bold;
      margin: auto 30px;
    }
  }

  .activity-content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-x: auto;
    height: calc(100vh - 110px);
    padding: 40px 60px;

    &::-webkit-scrollbar {
      margin: 0 10px;
      width: 10px;
      border-radius: 5px;
      background-color: #F5F5F5;
      position: absolute;
      bottom: 0;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

  }
}
</style>
