import uh from './uniquehex.js'
let uhgene = uh();
export class World {
    constructor(i) { Object.assign(this, i); }
    name;//name是实例的名字
    new(n) { 
        let ret=Object.assign(Object.create(this),n);
        ret.entities=[];
        ret.hash=uhgene()
        return  ret;}
    receive(entity) {
        //在这里检查是否能添加entity
        this.entities.push(entity)
    }
    tick() {}

    description="No description"
    title = "Town.Hamlet";
    id;
    entities = []
    bp = 0
}
export class Entity {
    constructor(i) { Object.assign(this, i); }
    title="John Doe has no title";
    name="JohnDoe"
    id;
    new() { let ret =Object.create(this); ret.hash = uhgene() ;return ret}
    tick(wc, we) {
        wc.bp += 1;
        we.log("hell yeah")
    }
}
export class Prop{
    constructor(n){
        Object.assign(this,n)
    }
    //关于如何解析
    //最简单的是一个字符串，直接体现原obj的键值，没有默认值
    //default;
    //render(){};
    //template"" 会被方块包裹。应该用{{}}插值？
    //template 【】一系列条件对应的{{}}插值
    //形式应该是 [[key,comm,value1,value2,template]]
}