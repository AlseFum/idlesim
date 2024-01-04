import {unique} from './util'
export class World {
    constructor(i) { Object.assign(this, i); this.id=this.label;}
    label;
    id;
    digest;
    parody=null;//包
    //params 生成时可用的参数 或许该叫customs
    new(n) {
        let ret=Object.assign(Object.create(this),n);
        ret.entities=[];
        ret.id=unique()
        return  ret;}
    receive(entity) {
        //在这里检查是否能添加entity
        this.entities.push(entity)
    }
    tick() {}
    views = []
    entities = []
    bp = 0
}
export class Entity {
    constructor(i) { Object.assign(this, i);this.id=this.label; }
    label;
    id;
    digest;
    //parody=null;//包
        //params 生成时可用的参数 或许该叫customs

    new(n) {
        let ret=Object.assign(Object.create(this),n);
        ret.id=unique();
        return  ret;}
    tick(we, wc) {
        we.log("hell yeah")
    };
    interactions=[]
    tags=[];
    views=[]
}
