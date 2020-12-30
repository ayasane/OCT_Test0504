/*
 * Psychomotor Vigilance Task (PVT)
 * author : Seiji Muranaka (Osaka University)
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
      choices: {
        type: jsPsych.plugins.parameterType.STRING,
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

    // check input
    console.log("[DEBUG] load img : " + trial.image);
    console.log("[DEBUG] choice: " + trial.choices);

    // display stimulus
    var html = '<div id="smura-psychomotor-vigilance-buttons-stimulus">'; //+trial.stimulus+'</div>';
    // main thread (count up)
    var rtime;
    var choice = null;
    var start_time = performance.now()
    var main_thread = setInterval(function() {
      rtime = Math.floor(performance.now() - start_time);
      html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
      html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><font size="12"><p>' + rtime + '</p></font></div>';
      display_element.innerHTML = html;

      if (rtime >= trial.max_countup){
        console.log("[DEBUG] MAX COUNT!");
        clearInterval(main_thread);
      }
    },10);

    // display buttons
    var buttons = [];
    if (Array.isArray(trial.button_html)) {
      if (trial.button_html.length == trial.choices.length) {
        buttons = trial.button_html;
      } else {
        console.error('[smura-psychomotor-vigilance]ERROR. The length of the button_html array does not equal the length of the choices array');
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

    // show prompt if there is one
    if (trial.prompt != null){
      html += trial.prompt;
    }
    display_element.innerHTML = html;

    // add event listeners to buttons
    for (var i = 0; i < trial.choices.length; i++){
      display_element.querySelector('#smura-psychomotor-vigilance-buttons-button-' + i).addEventListener('click', function(e){
        var choice = e.currentTarget.getAttribute('data-choice');
        console.log("[smura-psychomotor-vigilance] KEY : " + choice);
        clearInterval(main_thread);
        after_response(choice, rtime);
      });
    }

    // store response
    var response = {
      rt: null,
      button: null
    };

    function after_response(choice, rt) {
      if (rt >= trial.max_countup){
        rt = trial.max_countup;
      }
      response.button = choice;
      response.rt = rt;
      console.log("[smura-psychomotor-vigilance] response: " + choice);
      console.log("[smura-psychomotor-vigilance] response time: " + rt);

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.smura-psychomotor-vigilance-buttons-button button');
      for(var i=0; i<btns.length; i++){
        btns[i].setAttribute('disabled', 'disabled');
      }

      finish_trial();
    }; // after_response

    function finish_trial(){
      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();
      // kill keyboard listeners
      if (typeof response_listener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(response_listener);
      }
      
      // store data
      var trial_data = {
        parameter_name: 'parameter value',
        response_time: response.rt,
        response_button: response.button
      };
  
      display_element.innerHTML = '';
      // end trial
      jsPsych.finishTrial(trial_data);
    }

    var response_listener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.choices,
      rt_method: 'performance',
      persist: true,
      allow_held_key: false
    });

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        finish_trial();
      }, trial.trial_duration);
    }
  };
  return plugin;
})();
