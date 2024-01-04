<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import isStore from './isStore.js'
const store = isStore();
const props = defineProps(["world", "wid"])
const curWorld = computed(() => store.getWorld(props.wid) ?? props.world)
const curEntities = computed(() => curWorld.value?.entities ?? [])
//@ts-ignore
import isev from './isEntityView.vue'

const timer = ref(0);
function startTimer() { timer.value = setInterval(() => curWorld.value?.tick?.(), 1000) }
function stopTimer() {
    clearInterval(timer.value);
    timer.value = 0;
}
onMounted(startTimer)
onUnmounted(stopTimer)
let fold = ref(false)

const enttpl=computed(()=>store.entityTemplates.map(i=>{return {label:i.label,value:i.id??i.label}}))
const neoption=ref()
onMounted(()=>neoption.value=enttpl.value[0].value)
const nelabel=ref("")
function newEntity(name,from) {
    if(Object.keys(store.entities).length>=store.maxEntity??256){return ;}
    let nn = typeof name==="string"?name:nelabel.value;
    let ni = from?.id??from??neoption.value;
    let ner;
    for (let i of store.entityTemplates) {
        if (i.id === ni) {
            ner = i.new({ label:nn!=""?nn:i.label})
        }
    }
    curWorld.value.receive(ner);
    store.setEntity(nn, ner);
}
function destructEntity(entity, world) {
    world.entities.splice(world.entities.indexOf(entity), 1);
    let se = store.entities;
    for (const key in se) {
        if (se[key] === entity) {
            delete se[key];
            break;
        }
    }
}
const emits = defineEmits(["destruct"])
</script>
<template>
    <n-card class="worldarea" :title="curWorld?.name ?? curWorld?.label ?? ''">
        <n-space justify="space-between">
            <pre>{{ typeof curWorld?.description === "function" ? curWorld?.description() : curWorld.description }}</pre>
            <n-tabs>
                <n-tab-pane v-for="v in curWorld.views" :name="v">{{ v() }}</n-tab-pane>
            </n-tabs>
            <n-space justify="end">
                <button @click="() => curWorld.tick()">single step</button>
                <button @click="() => timer ? stopTimer() : startTimer()">
                    {{ timer ? "stop" : "start" }}</button>
                <button @click="fold = !fold"> fold</button><button @click="emits('destruct')">🗑️</button>
            </n-space>
        </n-space>

        <template #footer v-if="!fold">
            <n-space justify="end">
                <button @click="fold = !fold"> fold</button>
            </n-space>
        </template>

        <br />
        <div v-show="!fold">
            <n-header>
                todo:加入自定义
                
                <n-space >
                    <n-select  :options="enttpl" style="flex-grow:2;max-width:20rem;min-width:8rem" v-model:value="neoption"></n-select>
                    <n-input style="max-width:20rem" v-model:value="nelabel">nihao</n-input>
                    <n-button @click="newEntity">NEW</n-button>
                </n-space>
            </n-header>

            <section class="entityarea">
                <n-collapse hoverable clickable>
                    <isev v-for="entity in curEntities" ref="isevinst" :entity="entity" :world="curWorld" :wid="curWorld.id" :eid="entity.id"
                     @newEntity="(arg1,arg2) => newEntity(arg1,arg2)"   @destruct="() => destructEntity(entity, world)"></isev>
                </n-collapse>
            </section>
        </div>
    </n-card>
</template>
<style>
.worldarea {
    display: block;
    margin-bottom: 30px;
    ;
    backdrop-filter: brightness(150%);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media screen and (max-width: 414px) {}

.entityarea {
    display: flex;
    max-width: 90%;
    flex-direction: column;
    border-radius: 10px;
    gap: 15px;
    margin: 20px;
    margin-left: 3px;
    padding-left: 40px;
}
</style>
