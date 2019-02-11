var ws = new WebSocket("ws://localhost:3000");

ws.onopen = function() {
    console.log("Connected to Hot Metal");
}

ws.onclose = function() {
    console.log("DISCONNECTED");
}

function setStep(message) {
    ws.send(JSON.stringify({
        func: "setStep",
        step: message}));
}

ws.onmessage = function(payload) {
    console.log(payload.data);
    var obj = JSON.parse(payload.data);
    console.log(obj);
    if (obj.func == "gradeSAI") {
        // CTATCommShell.commShell.addGlobalEventListener({
        //     processCommShellEvent: function(event, message) {
        //         console.log(event);
        //         if (event != "CorrectAction" && event != "InCorrectAction") return;
        //         var sai = message.getSAI();
        //         console.log(sai.getSelection(), sai.getAction(), sai.getInput());
        //     }
        // });

        CTATCommShell.commShell.gradeSAI(obj.selection, obj.action, obj.input);
    } else if (obj.func == "setStep") {
        console.log(obj.step);
    } else if (obj.func == "reset") {
        console.log("reset");
        //CTATTutor.initTutor(CTATConfiguration.generateDefaultConfigurationObject());
        window.location.reload();
    }
}

document.getElementById("button2").onclick = function() {
    ws.send(JSON.stringify({
        func: "gradeSAI",
        selection: "button1", 
        action: "ButtonPressed", 
        input: "-1"}));
}

