<script setup>
let props = defineProps([
    "entity",  "world","wid"
])
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import isStore from './isStore.js'
//@ts-ignore

const store = isStore();
const curEntity = computed(() => props.entity ?? store.getEntity(props.eid))
const curWorld=computed(()=>store.getWorld(props.wid)??props.world)
function cetick() { curEntity.value.tick(WEnv.value, props.world) }
const timer = ref(0);
const WEnv = ref({
    log(str) {
        lines.value.push(str);
    },
    self_destruct() {
        emits("destruct");
    },
    newEntity(arg1,arg2) {
        if(curWorld.value?.entities?.length>=store.maxEntityPerWorld??128)return;
        if(arg2!=undefined){
            emits("newEntity",arg1,arg2)
        }else{
            emits("newEntity",arg1,curEntity.value.__proto__)
        }
    }
})
const emits = defineEmits(["destruct"])
const lines = ref([])
const newestline = computed(() => lines.value[lines.value.length - 1])
const linesInst = ref();

watch(newestline, () => {
    nextTick(() => {
        linesInst.value?.scrollTo({ position: 'bottom', silent: true })
    })

})

defineExpose({ newestline })

function startTimer() { timer.value = setInterval(cetick, 1000) }
function stopTimer() { clearInterval(timer.value); timer.value = 0; }
onMounted(startTimer)
onUnmounted(stopTimer)

function dealTag(content){
    if(typeof content ==="string"){
        return content;
    }
}
</script>
<template>
    <n-collapse-item ref="ci">
        <template #header>
            {{ curEntity.label }}&nbsp;&nbsp; <i style="font-size:8pt;">{{ curEntity.id }}</i>&nbsp;&nbsp;
            <n-ellipsis style="max-width: 400px" :tooltip="{style:'maxWidth: 360px'}">
                <n-tag v-for=" t in curEntity.tags">{{ dealTag(t) }}{{ t }}</n-tag>
            </n-ellipsis>
        </template>
        <template #header-extra>
            {{ newestline }}
        </template>
        <section class="singleentity">
            <div class="leftarea">
                <button v-for="i in curEntity.interactions" @click="lines.push(i)">actions{{ i }}</button><br>
                <n-ellipsis style="max-width: 240px;max-height:4em">
                    {{ curEntity.digest??"digest here" }}  </n-ellipsis>
            </div>
            <n-tabs placement="left" animated>
                <n-tab-pane name="log">
                    <n-log ref="linesInst" :lines="lines" rows="8" style="flex-grow:2;"
                        @click="linesInst.scrollTo({ position: 'bottom', silent: true })"></n-log>
                </n-tab-pane>
                <n-tab-pane v-for="(v,key) in curEntity.views" :name="key">todo:{{ v }}</n-tab-pane>
            </n-tabs>
            <div class="rightarea">
                <button @click="cetick">⏩</button>
                <button @click="timer ? stopTimer() : startTimer()"> {{ timer ? '⏸️' : "▶️" }} </button>
                <button @click="lines = []">🗑️</button>
                <button @click="emits('destruct')">🗑️</button>
            </div>
        </section>
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
    padding-right: 20px;
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
