/*
 * Psychomotor Vigilance Task (PVT)
 * auther : Seiji Muranaka
 * date   : 2020/11/20
 */

// parameter type : BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX

jsPsych.plugins["psychomotor-vigilance"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "psychomotor-vigilance",
    parameters: {
      image: {
        type: jsPsych.plugins.parameterType.STRING, // img path
        default: undefined
      },
      max_countup: {
        type: jsPsych.plugins.parameterType.INT,
        default: 1000
      },
      repeat: {
        type: jsPsych.plugins.parameterType.INT, // number of repeat thread
        default: 1
      }
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: "Choices"
        default: jsPsych.ALL_KEYS,
        array: true,
        description: 'Keys subject uses to respond to stimuli.'
      }
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null
        description: 'Any content here will be displayed below stimulus.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var countN = 0;

    // interval (display only rectangle)
    function interval() {
        display_element.innerHTML = '<div style="position:absolute; top:20%; left:50%"><img src="' + trial.image + 'width="300px" /></div>';
        var display_time = function() {
            var rand = Math.round(Math.random() * 1000) + 2000;
            console.log("[smura-psychomotor-vigilance] interval duration: " + rand);
            return rand;
        };
    };

    // display feedback (response time)
    var feedback = setTimeout(function(rtime) {
        display_element.innerHTML = '<div style="position:absolute; top:20%; left:50%"><img src="' + trial.image + 'width="300px" /></div>';
        display_element.innerHTML = '<div style="position:absolute; top:30%; left:60%"><font size="12"><p>' + rtime + '</p></font></div>';
    }, 500);

    function get_RT(startTime, performance) {
        return startTime - performance.now()
    }
    // start count up
    var count_up = setInterval(function(startTime) {
        var rtime = function() { return startTime - performance.now()}
        display_element.innerHTML = '<div style="position:absolute; top:20%; left:50%"><img src="' + trial.image + 'width="300px" /></div>';
        display_element.innerHTML = '<div style="position:absolute; top:30%; left:60%"><font size="12"><p>' + rtime + '</p></font></div>';
        return rtime
    }, 1);

    // main thread
    var thread = setInterval(function() {
        interval();
        rtime = count_up(performance.now());
        feedback(rtime);
    }, 25)


    var after_response = function(info) {
        responses.push({
        key_press: info.key,
        rt: info.rt,
        stimulus: current_stim
      });

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-animation-image').className += ' responded';
    };

    var response_listener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.choices,
      rt_method: 'performance',
      persist: true,
      allow_held_key: false
    });

    // data saving
    var trial_data = {
      parameter_name: 'parameter value'
    };


    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
