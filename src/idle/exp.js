import { World, Entity, Prop } from './types.js'
import uh from './uniquehex.js'
const uhgene = uh();

export const dw = new World();
dw.id="duskworld"
dw.title = "Duskworld"
Object.assign(dw,{
    bloodamount:0,
    meatamount:0,
    boneamount:0,
    soulamount:0,
    photos:0
})
dw.description=function(){
    return `Pool:B${this.bloodamount} M${this.meatamount} B${this.boneamount} S${this.soulamount}
    Photos:${this.photos}`;
}
dw.flexible = ["distance", new Prop({
    name: "ddd", render(n) {
        return "[]" + JSON.stringify(n) + "[]"
    }
})]
dw.tick=function(){
    
}
// flatworld.stable = ["STR", "HP"]
const mindless=new Entity();
mindless.name="mindless";
mindless.distance=0;
const Mode={go:0,idle:1,attack:2,hang:3}
mindless.mode=0;
mindless.target=4;
mindless.tick=function(wc,we){
    if(this.mode==Mode.go){
        we.log("moving "+this.distance+"->"+this.target)
        if(this.distance<this.target)this.distance++;
        if(this.distance==this.target){we.log("arrived "+this.target);this.mode=Mode.idle;}
        if(this.distance>this.target)this.distance--;
    }
    if(this.mode==Mode.idle&&Math.random()>0.5){
        wc.boneamount++;
        if(Math.random()>0.7){
            this.hasPhoto=true;
            this.target=0;
            this.mode=Mode.go;
            we.log("["+this.distance+"]"+"找到了一张旧照片")
        }
    }
    if(this.target==0&&this.hasPhoto==true&&this.distance==0){
        we.log("上交了。")
        this.hasPhoto=false;
        wc.photos++;
        this.target=Math.floor(Math.random()*10);
        this.mode=Mode.go;
    }
}
export const reader=new Entity()
reader.name="reader"
reader.process=0;
reader.distance=0;
reader.tick=function(wc,we){
    if(this.process!==0){
        this.process++;
        we.log("阅读中")
        if(this.process===0){
            wc.soulamount++;
            we.log("读完了。获得了一颗灵魂")
        }
    }else if(this.process===0){
        if(wc.photos>0){
            wc.photos--;
            this.process-=Math.floor(Math.random()*6);
            we.log("开始阅读")
        }
    }

}
export const entityTemplates=[new Entity(),mindless,reader]
export const worldTemplates=[dw]