<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
//@ts-ignore
import iswv from './isWorldView.vue'

import isStore from './isStore.js'
const store = isStore();

const nwoptions = computed(() => store.worldTemplates.map(i => { return { label: i.title, value: i.id } }))
const nwoption = ref("")
onMounted(() => {
    nwoption.value = store.worldTemplates[0].id;
})
const nwselection = computed(() => {
    let ret; for (let i of store.worldTemplates) {
        if (i.id === nwoption.value) {
            ret = i;
        }
    }; return ret ?? store.worldTemplates?.[0]
})//ref(worldTemplates?.[0]);
const nwname=ref("")
store.setWorld("exp", nwselection.value.new({ name: "exp" }))
store.setWorld("lips", nwselection.value.new({ name: "lips" }))
function tsw(n, v) {
    if(n,v){if (store.getWorld(n)) { alert("已经存在"); return; }
    store.setWorld(n, v);}
    else{
        tsw(nwname.value, nwselection.value.new({ name: nwname.value }));
    }
}
function destructWorld(world) {
    let sd = store.worlds;
    for (const id in sd) {
        if (sd[id] === world) {
            delete sd[id];
            break;
        }
    }
}
const show = ref()
const showModal = ref()
</script>
<template>
    <n-button style="position:absolute;top:8px;left:8px;" @click="show = !show">setting</n-button>
    <n-drawer v-model:show="show" :width="502">
        <n-drawer-content title="斯通纳" closable>
            这里应该有一堆设置
            <n-button @click="showModal = true"></n-button>
            <n-modal v-model:show="showModal">
                <n-card style="width: 600px" :bordered="false" size="huge" role="dialog" aria-modal="true">这里是一大坨设置
                </n-card>
            </n-modal>
        </n-drawer-content>
    </n-drawer>
    <div style="margin:0 auto;display: flex;flex-direction: row;justify-content: center;align-items: center;">
        <n-select :options="nwoptions" v-model:value="nwoption" style="max-width: 200px;"></n-select>
        <n-input type="text" v-model:value="nwname" style="max-width: 200px;" />
        <n-button @click="tsw">NEW</n-button>
        未来可能加选项
    </div>
    <div class="container">
        <iswv v-for="world in store.worlds" :world="world" :wid="world.id" @destruct="destructWorld(world)">{{
            world }}</iswv>
        <br>
    </div>
</template>
<style scoped>
.container {
    height: 90vh;
    margin: 10px;
    overflow: auto;
    margin-bottom: 20px;
    text-align: left;
    padding-left: 20px;

}

.container::-webkit-scrollbar {
    width: 0.5em;
}

/* div::-webkit-scrollbar-track {
  
} */

.container::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 0.5em;
}
</style>