<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
//@ts-ignore
import iswv from './isWorldView.vue'
import isev from './isEntityView.vue'
import isStore from './isStore.js'
const store = isStore();
import { worldTemplates } from './exp';
const nwoptions = computed(() => worldTemplates.map(i => { return { label: i.title, value: i.id } }))
const nwoption = ref("")
onMounted(() => {
    nwoption.value = worldTemplates[0].id;
})
const newworldselection = computed(() => {
    let ret; for (let i of worldTemplates) {
        if (i.id === nwoption.value) {
            ret = i;
        }
    }; return ret ?? worldTemplates?.[0]
})//ref(worldTemplates?.[0]);
store.setWorld("exp", newworldselection.value.new({ name: "exp" }))
store.setWorld("lips", newworldselection.value.new({ name: "lips" }))
function tsw(n, v) {
    if (store.getWorld(n)) { alert("已经存在"); return; }
    store.setWorld(n, v);
}
function destructWorld(world) {
    let sd = store.worlds;
    for (const key in sd) {
        if (sd[key] === world) {
            delete sd[key];
            break;
        }
    }
}

</script>
<template>

    <div style="margin:0 auto;display: flex;flex-direction: row;justify-content: center;align-items: center;">
        <n-select :options="nwoptions" v-model:value="nwoption" style="max-width: 200px;"></n-select>
        <n-input type="text" v-model:value="newworldname" style="max-width: 200px;" />
        <n-button @click="tsw(newworldname, newworldselection.new({ name: newworldname }))">NEW</n-button>
    </div>
    <div class="container">
        <iswv v-for="world in store.worlds" :world="world" :wid="world.name" @destruct="destructWorld(world)">{{
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