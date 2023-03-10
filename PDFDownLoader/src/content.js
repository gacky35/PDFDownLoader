var y = 0;
var pace = 1;
var state = "stop";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.method) {
        case 'getPDFLink':
            let anchors = document.getElementsByTagName('a');
            let pdfs = [];
            for (anchor of anchors) {
                link = anchor.href;
                if (link && link.endsWith('pdf')) {
                    pdfs.push({'title': anchor.text, 'link': link});
                }
            }
            sendResponse({'data': pdfs});
            break;
        case 'downloadPDF':
            selectOption = request.data;
            for (option of selectOption) {
                let anchor = document.createElement('a');
                anchor.download = option.title + '.pdf';
                document.body.appendChild(anchor);
                anchor.href = option.link;
                anchor.click();
                document.body.removeChild(anchor);
                sleep(1500);
            }
            break;
        default:
            console.log('no method');
    }
})

function sleep(waitMsec) {
    var startMsec = new Date();
    while (new Date() - startMsec < waitMsec);
}