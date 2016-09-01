window.$ = require('jquery');
window.jQuery = $;

$(window).ready(function() {
    $("#compress-object").codeblock({
        editable: true,
        consoleText: "Output from the example appears here",
        consoleClass: "codeblock-console-text",
        runButtonText: "run",
        runButtonClass: "codeblock-console-run",
        console: true,
        resetable: true,
        runnable: true,
        lineNumbers: true,
        editorTheme: "ace/theme/monokai"
    });
    $("#deserialize-object").codeblock({
        editable: true,
        consoleText: "Output from the example appears here",
        consoleClass: "codeblock-console-text",
        runButtonText: "run",
        runButtonClass: "codeblock-console-run",
        console: true,
        resetable: true,
        runnable: true,
        lineNumbers: true,
        editorTheme: "ace/theme/monokai"
    });
});
