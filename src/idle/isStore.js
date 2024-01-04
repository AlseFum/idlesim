import { defineStore } from "pinia"
import {worldTemplates,entityTemplates} from './exp'
export default defineStore("idlesim", {
    state: () => {
        return {
            worlds: {},
            entities: {},
            idleTime: 0,
            entityOnEdit:null,

            worldTemplates: worldTemplates??[],
            entityTemplates:entityTemplates??[],

            maxEntityPerWorld:8,
            maxEntity:64
        }
    },
    actions: {
        setWorld(name, value) {
            this.worlds[name] = value;
        },
        getWorld(id) {
            return this.worlds[name]
        },
        setEntity(name, value) {
            this.entities[name] = value;
        },
        getEntity(name) {
            return this.entities[name]
        }
        ,
        getEntityList(arr) {
            return arr.map(e => this.getEntity(e))
        }
    },
}
)