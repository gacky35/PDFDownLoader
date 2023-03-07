function showPDFList() {
    let content = "";
    let div = document.getElementById('windowList');
    chrome.tabs.query({'active': true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {method: 'getPDFLink'}, (data) => {
            for (datum of data.data) {
                content += `<div><input type='checkbox' id='${datum.link}' name='activeWindow' value='${datum.title}' checked/><label for='${datum.link}'>${datum.title}</label></div>`
            }
            content += `<div id="download"><input type="button" id="downloadAsName" name='${tabs[0].id}' value="名前で保存"><input type="button" id="downloadAsNumber" name='${tabs[0].id}' value="講演番号で保存"></div>`
            div.innerHTML = content;
        })
    });
}

$(document).on('click', '#downloadAsName', function() {
    console.log('downloadAsName');
    selectOption = document.querySelectorAll("input[name=activeWindow]:checked");
    data = [];
    for (option of selectOption) {
        data.push({'title': option.value, 'link': option.id})
    }
    tabId = document.getElementById('downloadAsName').name;
    chrome.tabs.sendMessage(Number(tabId), {method: "downloadPDF", data: data});
})

document.addEventListener('DOMContentLoaded', showPDFList());