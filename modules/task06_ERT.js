export class ERT {
    constructor(){
        this.instructions = {
            type: "html-keyboard-response",
            stimulus: "<p style='text-align:left'>この課題では，hogehoge </p>"+
                      "<p style='text-align:left'>キーボードのどれかを押すと課題が始まります。</p>"
        };

        //刺激を指定
        this.stimuli = [];

        //実験の設定（使用キー，提示時間等）
        this.thread = {
            timeline: [{
                type: "html-keyboard-response",
                choices: ["f","j","b"],
                trial_duration: 2000,
                stimulus: jsPsych.timelineVariable('stimulus'),
                prompt: 'hogehogehoge'
            }],
            timeline_variables: this.stimuli 
        };
    }
}


