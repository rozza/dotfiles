/*jslint
  white: true,
  nomen: true
*/
/*globals slate, _, S */

// Slate configuration:
// https://github.com/jigish/slate/wiki/JavaScript-Configs

slate.config('defaultToCurrentScreen', true);
slate.config('checkDefaultsOnLoad', true);

// Monitors
var monLaptop = "1280x800";
var monDell = "1920x1080";

// Operations
var lapChat = S.op("corner", {
  "screen" : monLaptop,
  "direction" : "top-right",
  "width" : "screenSizeX/9",
  "height" : "screenSizeY"
});
var lapMain = lapChat.dup({ "direction" : "top-left", "width" : "4*screenSizeX/9" });

var dellFull = S.op("move", {
  "screen" : monDell,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});
var dellTop = dellFull.dup({ "height" : "screenSizeY/2" });
var dellTopLeft = dellTop.dup({ "width" : "screenSizeX/2" });
var dellTopMid = dellTopLeft.dup({ "x" : "screenOriginX+screenSizeX*.17", "width":  "screenSizeX*.66" });
var dellTopRight = dellTopLeft.dup({ "x" : "screenOriginX+screenSizeX/2" });
var dellMid = dellTopMid.dup({"y": "screenOriginY+screenSizeY*.1", "height": "screenSizeY*.8", "direction" : "top-left"});
var dellMidL = dellTopMid.dup({"y": "screenOriginY+screenSizeY*.06", "x": "screenOriginX+screenSizeX*.14", "height": "screenSizeY*.8", "direction" : "top-left"});
var dellBottom = dellTop.dup({ "y" : "screenOriginY+screenSizeY/2" });
var dellBottomLeft = dellBottom.dup({ "width" : "screenSizeX/3" });
var dellBottomMid = dellBottomLeft.dup({ "x" : "screenOriginX+screenSizeX*.12", "width":  "screenSizeX*.75", "y" : "screenOriginY+screenSizeY*.49" });
var dellBottomRight = dellBottomLeft.dup({ "x" : "screenOriginX+2*screenSizeX/3" });
var dellLeft = dellTopLeft.dup({ "height" : "screenSizeY" });
var dellRight = dellTopRight.dup({ "height" : "screenSizeY" });

// common layout hashes
var lapMainHash = {
  "operations" : [lapMain],
  "ignore-fail" : true,
  "repeat" : true
};
var adiumHash = {
  "operations" : [lapChat, lapMain],
  "ignore-fail" : true,
  "title-order" : ["Contacts"],
  "repeat-last" : true
};
var dellTopHash = {
  "operations" : [dellTop],
  "repeat" : true
};
var dellTopMidHash = {
  "operations" : [dellTopMid],
  "repeat" : true
};
var dellMidHash = {
  "operations" : [dellMid],
  "repeat" : true
};
var dellMidLHash = {
  "operations" : [dellMidL],
  "repeat" : true
};
var iTermHash = {
  "operations" : [dellBottomMid, dellBottomLeft, dellBottomRight, lapMain],
  "sort-title" : true,
  "repeat-last" : true
};

// 2 monitor layout
var twoMonitorLayout = S.lay("twoMonitor", {
  "Adium" : adiumHash,
  "iTerm" : iTermHash,
  "Google Chrome" : dellMidHash,
  "Sublime Text 2" : dellMidLHash,
  "Safari" : lapMainHash,
  "Firefox" : lapMainHash,
  "Spotify" : lapMainHash
});

// 1 monitor layout
var oneMonitorLayout = S.lay("oneMonitor", {
  "Adium" : adiumHash,
  "iTerm" : lapMainHash,
  "Google Chrome" : lapMainHash,
  "Firefox" : lapMainHash,
  "Safari" : lapMainHash,
  "Sublime Text 2" : lapMainHash,
  "Spotify" : lapMainHash
});

// Defaults
S.def([monLaptop, monDell], twoMonitorLayout);
S.def([monLaptop], oneMonitorLayout);

// Layout Operations
var twoMonitor = S.op("layout", { "name" : twoMonitorLayout });
var oneMonitor = S.op("layout", { "name" : oneMonitorLayout });
var universalLayout = function() {
  // Should probably make sure the resolutions match but w/e
  if (S.screenCount() === 2) {
    twoMonitor.run();
  } else if (S.screenCount() === 1) {
    oneMonitor.run();
  }
};

// Bindings
// Batch bind everything. Less typing.
S.bnda({
  // Layout Bindings
  "h:ctrl;alt;cmd" : universalLayout,
  "r:ctrl;alt;cmd": S.op('relaunch'),

  // Resize Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl" : S.op("resize", { "width" : "+10%", "height" : "+0" }),
  "left:ctrl" : S.op("resize", { "width" : "-10%", "height" : "+0" }),
  "up:ctrl" : S.op("resize", { "width" : "+0", "height" : "-10%" }),
  "down:ctrl" : S.op("resize", { "width" : "+0", "height" : "+10%" }),
  "right:alt" : S.op("resize", { "width" : "-10%", "height" : "+0", "anchor" : "bottom-right" }),
  "left:alt" : S.op("resize", { "width" : "+10%", "height" : "+0", "anchor" : "bottom-right" }),
  "up:alt" : S.op("resize", { "width" : "+0", "height" : "+10%", "anchor" : "bottom-right" }),
  "down:alt" : S.op("resize", { "width" : "+0", "height" : "-10%", "anchor" : "bottom-right" }),

  // Push Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl;shift" : S.op("push", { "direction" : "right", "style" : "bar-resize:screenSizeX/3" }),
  "left:ctrl;shift" : S.op("push", { "direction" : "left", "style" : "bar-resize:screenSizeX/3" }),
  "up:ctrl;shift" : S.op("push", { "direction" : "up", "style" : "bar-resize:screenSizeY/2" }),
  "down:ctrl;shift" : S.op("push", { "direction" : "down", "style" : "bar-resize:screenSizeY/2" }),

  // Nudge Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl;alt" : S.op("nudge", { "x" : "+10%", "y" : "+0" }),
  "left:ctrl;alt" : S.op("nudge", { "x" : "-10%", "y" : "+0" }),
  "up:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "-10%" }),
  "down:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "+10%" }),

  // Throw Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "pad1:ctrl;alt" : S.op("throw", { "screen" : "2", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "pad2:ctrl;alt" : S.op("throw", { "screen" : "1", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "pad3:ctrl;alt" : S.op("throw", { "screen" : "0", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "right:ctrl;alt;cmd" : S.op("throw", { "screen" : "right", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "left:ctrl;alt;cmd" : S.op("throw", { "screen" : "left", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "up:ctrl;alt;cmd" : S.op("throw", { "screen" : "up", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "down:ctrl;alt;cmd" : S.op("throw", { "screen" : "down", "width" : "screenSizeX", "height" : "screenSizeY" }),

  // Focus Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:cmd" : S.op("focus", { "direction" : "right" }),
  "left:cmd" : S.op("focus", { "direction" : "left" }),
  "up:cmd" : S.op("focus", { "direction" : "up" }),
  "down:cmd" : S.op("focus", { "direction" : "down" }),
  "up:cmd;alt" : S.op("focus", { "direction" : "behind" }),
  "down:cmd;alt" : S.op("focus", { "direction" : "behind" }),

  // Window Hints
  "esc:cmd" : S.op("hint"),

  // Switch currently doesn't work well so I'm commenting it out until I fix it.
  //"tab:cmd" : S.op("switch"),

  // Grid
  "esc:ctrl" : S.op("grid")
});
