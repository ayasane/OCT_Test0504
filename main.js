// 課題をインポート
import { MP } from './modules/task01_MP.js'
import { VOLT } from './modules/task02_VOLT.js'
import { F2B } from './modules/task03_F2B.js'
import { AM } from './modules/task04_AM.js'
import { LOT } from './modules/task05_LOT.js'
import { ERT } from './modules/task06_ERT.js'
import { MRT } from './modules/task07_MRT.js'
import { DSST } from './modules/task08_DSST.js'
import { BART } from './modules/task09_BART.js'
import { PVT } from './modules/task10_PVT.js'

// 課題クラスを実体化
const mp = new MP();
const volt = new VOLT();
const f2b = new F2B();
const am = new AM();
const lot = new LOT();
const ert = new ERT();
const mrt = new MRT();
const dsst = new DSST();
const bart = new BART();
const pvt = new PVT();

// main関数(timelineを定義)
function main(){
    var timeline = [];
    //MP
    timeline.push(mp.instructions);
    timeline.push(mp.thread);
    //VOLT
    tmieline.push(volt.instructions);
    timeline.push(volt.thread);
    //F2B
    timeline.push(f2b.instructions);
    timeline.push(f2b.thread);
    //AM
    timeline.push(am.instrcutions);
    timeline.push(am.thread);
    //LOT
    timeline.push(lot.instructions);
    timeline.push(lot.thread);
    //ERT
    timeline.push(ert.instructions);
    timeline.push(ert.thread)
    //MRT
    timeline.push(mrt.instructions);
    timeline.push(mrt.thread);
    //DSST
    timeline.push(dsst.instructions);
    timeline.push(dsst.thread);
    //BART
    timeline.push(bart.instructions);
    timeline.push(bart.thread);
    //PVT
    timeline.push(pvt.instructions);
    timeline.push(pvt.thread);

    jsPsych.init({
        timeline: timeline,
        on_finish: function(){
            jsPsych.data.displayData('json');
        }
    });
}

// main関数を実行
main();


