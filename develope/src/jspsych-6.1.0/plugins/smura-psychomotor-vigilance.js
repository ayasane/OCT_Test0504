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
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: "Choices",
        default: jsPsych.ALL_KEYS,
        array: true,
        description: 'Keys subject uses to respond to stimuli.'
      },
      button_html: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button HTML',
        default: '<button class="jspsych-btn">%choice%</button>',
        array: true,
        description: 'The html of the button. Can create own style.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below stimulus.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var countN = 0;

    console.log("[DEBUG] load img : " + trial.image);
    function display_time() {
        var rand = Math.round(Math.random() * 1000) + 2000;
        console.log("[smura-psychomotor-vigilance] interval duration: " + rand);
        return rand;
    };

    // store response
    var response = {
      rt: null,
      button: null
    };

    var html = '<div id="smura-psychomotor-vigilance-buttons-stimulus">'+trial.stimulus+'</div>';
    var buttons = [];
    if (Array.isArray(trial.button_html)) {
      if (trial.button_html.length == trial.choices.length) {
        buttons = trial.button_html;
      } else {
        console.error('Error in html-button-response plugin. The length of the button_html array does not equal the length of the choices array');
      }
    } else {
      for (var i = 0; i < trial.choices.length; i++) {
        buttons.push(trial.button_html);
      }
    }
    html += '<div id="smura-psychomotor-vigilance-buttons-btngroup">';
    for (var i = 0; i < trial.choices.length; i++) {
      var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
      html += '<div class="smura-psychomotor-vigilance-buttons-button" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="smura-psychomotor-vigilance-buttons-button-' + i +'" data-choice="'+i+'">'+str+'</div>';
    }
    html += '</div>';
    html += trial.prompt;
    // main thread
    setInterval(function() {
      // interval
      setTimeout(function() {
        html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
      }, display_time());
      // count up
      var start_time = performance.now();
      setInterval(function() {
        var rtime = Math.floor(performance.now() - start_time);
        html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
        html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><font size="12"><p>' + rtime + '</p></font></div>';
        display_element.innerHTML = html;
        if (rtime >= trial.max_countup){
          after_response("Null", trial.max_countup);
        }
      },5);
      // add event listeners to buttons
      for (var i = 0; i < trial.choices.length; i++) {
        display_element.querySelector('#smura-psychomotor-vigilance-buttons-button-' + i).addEventListener('click', function(e){
          var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
          after_response(choice, rtime);
        });
      }
    }, 25)

    function after_response(choice, rt) {

      // measure rt
      //var end_time = performance.now();
      //var rt = end_time - start_time;
      response.button = choice;
      response.rt = rt;

      // display rt
      display_element.innerHTML = '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
      display_element.innerHTML = '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><font size="12"><p>' + rt + '</p></font></div>';

      console.log("[smura-psychomotor-vigilance] response time: " + rt);

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.smura-psychomotor-vigilance-buttons-button button');
      for(var i=0; i<btns.length; i++){
        //btns[i].removeEventListener('click');
        btns[i].setAttribute('disabled', 'disabled');
      }

      //if (trial.response_ends_trial) {
        //end_trial();
      //}
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
