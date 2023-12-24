<script setup>
let props = defineProps([
    "entity", "ehash", "world"
])
import { ref, onMounted, onUnmounted, computed, onUpdated, watch } from 'vue'
import isStore from './isStore.js'
//@ts-ignore

const store = isStore();
const curEntity = computed(() => props.entity ?? store.getEntity(props.eid))
function cetick() { curEntity.value.tick(props.world, WEnv.value) }
const timer = ref(0);
const WEnv = ref({
    log(str) {
        lines.value.push(str);
    }
})
const emits = defineEmits("destruct")
const lines = ref([])
const newestline = computed(() => lines.value[lines.value.length - 1])
const linesInst = ref();
onUpdated(() => linesInst.value?.scrollTo({ position: 'bottom', silent: true }))
const showDetail = ref(false)

defineExpose({ newestline })

function startTimer() { timer.value = setInterval(cetick, 1000) }
function stopTimer() { clearInterval(timer.value); timer.value = 0; }
onMounted(startTimer)
onUnmounted(stopTimer)

</script>
<template>
    <n-collapse-item ref="ci"  :title="curEntity.hash + ' ' + curEntity.name">

        <template #header-extra>
            {{ newestline }}
        </template>
        <section class="singleentity">
            <div class="leftarea">
                <button v-for="i in 3" @click="lines.push(i)">actions</button>
            </div>
            <n-log ref="linesInst" :lines="lines" rows="8" style="flex-grow:2;"></n-log>
            <div class="rightarea">
                <button @click="cetick">⏩</button>
                <button @click="timer ? stopTimer() : startTimer()"> {{ timer ? '⏸️' : "▶️" }} </button>
                <button @click="lines = []">🗑️</button>
                <button @click="emits('destruct')">🗑️</button>
            </div>
        </section>
        <article class="singleentity" @click.stop="store.entityOnEdit = curEntity">

        </article>
    </n-collapse-item>
</template>
<style scoped>
.singleentity {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    justify-items: stretch;


    backdrop-filter: brightness(160%);
    text-align: left;
    margin: 10px;
    padding-left: 20px;

 
}

.leftarea {
    width: 30%;
    overflow-x: hidden;
}

.centerarea {
    flex-grow: 2;
    word-wrap: break-word;
    max-height: 10rem;
    overflow-y: scroll;

    align-self: center;
    padding: 3px;
}

.rightarea {
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-self: end;
    padding-right:20px;
}

.rightgroup button {
    width: 30px;
    height: 30px;
    align-items: center;
    font-size: 24px;
    text-align: center;
}

div::-webkit-scrollbar {
    width: 0.5em;
}

/* div::-webkit-scrollbar-track {
  
} */

div::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 0.5em;
}
</style>
