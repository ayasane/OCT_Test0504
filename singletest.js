//課題をインポート
import { Stroop } from './modules/tmp_stroop.js'

const stp = new Stroop();
var timeline = [];
timeline.push(stp.instructions);
timeline.push(stp.thread);
jsPsych.init({
    timeline: timeline,
    on_finish: function(){
        jsPsych.data.displayData('json');
    }
});


