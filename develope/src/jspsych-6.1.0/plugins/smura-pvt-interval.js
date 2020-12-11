/*
 * Psychomotor Vigilance Task (PVT) interval phase
 * author : Seiji Muranaka
 * date   : 2020/11/20
 */

// parameter type : BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX

jsPsych.plugins["pvt-interval"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "pvt-interval",
    parameters: {
      image: {
        type: jsPsych.plugins.parameterType.STRING, // img path
        default: undefined
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    function display_time() {
        var rand = Math.round(Math.random() * 1000) + 2000;
        console.log("[smura-pvt-interval] interval duration: " + rand);
        return rand;
    };

    var html = '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
    var dur = display_time();
    setTimeout(function() {
      display_element.innerHTML = html;
    }, dur);

    // store data
    var trial_data = {
      parameter_name: 'parameter value',
      duration: dur,
    };
  
    display_element.innerHTML = '';
    // end trial
    jsPsych.finishTrial(trial_data);

  };
  return plugin;
})();
