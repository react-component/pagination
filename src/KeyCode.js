'use strict';

module.exports = {
  ZERO: 48,
  NINE: 57,

  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,

  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,

  ARROW_UP: 38,
  ARROW_DOWN: 40,

  validKeyBinding: function(event) {
    // C-a, C-e, C-k
    if (event.ctrlKey) {
      let keyCode = event.keyCode;
      return [65, 69, 75].indexOf(keyCode) > -1;
    }
  }
};
