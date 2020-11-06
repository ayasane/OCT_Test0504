export class Stroop{
    constructor(){
        this.instructions = {
            type: "html-keyboard-response",
            stimulus: "<p style='text-align:left'>この課題では，色のついた単語を見ていただきます。</p>"+
                "<p style='text-align:left'>キーボードのどれかを押すと課題が始まります。</p>"
        };
        
        this.stimuli = [
            {stimulus: "<p style='color:red;font-size:60pt;'>赤</p>"},
            {stimulus: "<p style='color:green;font-size:60pt;'>赤</p>"},
            {stimulus: "<p style='color:blue;font-size:60pt;'>赤</p>"},
        
        ];
        
        this.thread = {
            timeline: [{
                type: "html-keyboard-response",
                choices: ["f","j","b"],
                trial_duration: 2000,
                stimulus: jsPsych.timelineVariable('stimulus'),
                prompt: '赤ならf, 青ならb, 緑ならj'
            }],
            timeline_variables: this.stimuli
        };
        console.log("[DEBUG] Constructed Stroop")
    }

    get start() {
        var timeline = [];
        timeline.push(this.instructions);
        timeline.push(this.stroop);
   
        jsPsych.init({
            timeline: timeline,
            on_finish: function(){
                jsPsych.data.displayData('json');
            }
        });
    }
}

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

