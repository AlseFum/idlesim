import { World, Entity } from './types.js'
import { unique } from './util.js';

export const dw = new World({
    bloodamount: 0,
    meatamount: 0,
    boneamount: 0,
    soulamount: 0,
    photos: 0,
    id: "duskworld",
    label: "Duskworld"
});


dw.description = function () {
    return `
    Pool:B${this.bloodamount} M${this.meatamount} B${this.boneamount} S${this.soulamount}
    Photos:${this.photos}`;
}
export const worldTemplates = [dw]
export const entityTemplates = []

class stage {
    static Encounter = 1;
    static Combat = 2;
    static Support = 3;
    constructor(stages) {
        this.type = [stage.Encounter, stage.Combat, stage.Support][Math.floor(Math.random() * 3)]
    }
    type;
    nextfloor = false;
}
class Floor {
    stages = 0
    next() {
        let ret = new stage(this.stages);
        ret.stages = this.stages;
        return ret;
    }
}
const ceobe = new Entity({
    id: "Ceobe",
    title: "Ceobe",
    label: "Ceobe",
    name: "Ceobe",
    floor: null,
    stage: null,

    hope: 0,
    ingot: 0,
    life: 0,
    maxdeploy: 0,

    squad: {
        get power() { return 18; },
    },
    tags:["long"],
    views:{sexexperience:"zero"},
    status() {
        return ["hope:" + this.hope, "ingot:" + this.ingot, "life:" + this.life]
    },
    tick(we, wc) {
        we.newEntity("救兵")
        if (this.failed) {
            we.log("驻足于此")
        }
        else if (this.stage === null) {
            if (this.floor === null) {
                this.floor = new Floor();
                this.life = 18;
                we.log("开局18life")
            }
            this.stage = this.floor?.next?.();
        } else if (this?.stage?.finished) {
            this.stage = this.floor?.next?.();
            we.log("下一stage咯")
            this.tags.push("hahaha")
        } else if (this.nextfloor) {
            this.floor = new Floor();
            this.stage = this.floor?.next?.();
            we.log("下一层喽")
        } else {
            switch (this.stage.type) {
                case stage.Encounter:
                    {
                        this.stage.finished = true;
                        break;
                    }
                case stage.Combat:
                    {
                        this.stage.finished = true;
                        this.life--;
                        
                        break;
                    }
                case stage.Support:
                    {
                        this.stage.finished = true;
                        
                        break;
                        
                    }
            }


            if (this.life <= 0) {
                this.failed = true;
                
            }
        }
        //开局
        //进入stage，打完
        //如果有打完结算，结算
        //或者事件，随机选择
        //或者进入下一个场景
        //stage就是简单的obstacle与power的对比
        //都是动态结算

    }
})
entityTemplates.unshift(ceobe)