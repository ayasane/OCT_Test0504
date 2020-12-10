/*
 * Psychomotor Vigilance Task (PVT)
 * author : Seiji Muranaka
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
    html += trial.prompt;
    // main thread
    // interval
    html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
    setTimeout(function() {
      display_element.innerHTML = html;
    }, display_time());
    // count up
    var start_time = performance.now();
    setInterval(function() {
      var rtime = Math.floor(performance.now() - start_time);
      html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
      html += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><font size="12"><p>' + rtime + '</p></font></div>';
      display_element.innerHTML = html;
      if (rtime >= trial.max_countup){
        start_time = performance.now();
        after_response(null, trial.max_countup);
      } else {
        // add event listeners to buttons
        for (var i = 0; i < trial.choices.length; i++) {
          let selector = display_element.querySelector('#smura-psychomotor-vigilance-buttons-button-' + i);
          if (selector != null){
            selector.addEventListener('click', function(e){
              var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
              start_time = performance.now();
              after_response(choice, rtime);
            });
          }
        }
      }
    },5);

    function after_response(choice, rt) {
      response.button = choice;
      response.rt = rt;

      // display rt
      var html_ar = '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><img src="' + trial.image + '" width="300px"/></div>';
      html_ar += '<div style="position:absolute; top:20%; left:50%; transform:translateX(-50%); -webkit-transform:translateX(-50%); -ms-transform:translateX(-50%);"><font size="12"><p>' + rt + '</p></font></div>';

      setTimeout(function(){
        display_element.innerHTML = html_ar;
      }, 3000); // default : 500ms
      console.log("[smura-psychomotor-vigilance] response time: " + rt);

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.smura-psychomotor-vigilance-buttons-button button');
      for(var i=0; i<btns.length; i++){
        btns[i].removeEventListener('click');
        btns[i].setAttribute('disabled', 'disabled');
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

    };

    var response_listener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.choices,
      rt_method: 'performance',
      persist: true,
      allow_held_key: false
    });

  };

  return plugin;
})();
