const   urls = [
                "https://opengov.seoul.go.kr/mediahub/11089478",
                "http://kfem.or.kr/?p=187396",
                "https://www.bbc.com/korean/news-43524873",
                "http://news.jtbc.joins.com/article/article.aspx?news_id=NB11609490"
                ];

let count = 0,
    DomData = [],
    Files = [];

function stringifyDOM(filenames, tab) {
    Files.push(filenames);
    console.log(Files);

    chrome.tabs.sendMessage(tab.id, {msg: 'stringifyDOM'}, function() {
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete" && contains(tab.url)) {

        var filename = getFilename();
        document.onload = CaptureAPI.captureToFiles(tab, filename, stringifyDOM, errorHandler);
    }
});

function contains(url) {
    let core = url.replace(/^https?:\/\//, '').split(",");
    return urls[count].includes(core[0]);
}

function errorHandler(reason) {
    console.log("ERR: " + reason);
}

function getFilename() {
    return 'screencapture' + '-' + count + '.png';
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("from " + sender.tab.url);

    if (typeof request === "string" || request instanceof String) {
        DomData.push( request );
        sendResponse({success: true});
        console.log(DomData);

        if (count == urls.length) {
            alert("COMPLETE");
            return;
        }

        chrome.tabs.update(sender.tab.id, {url: urls[++count]}, function(tab) {
            console.log("updated to " + tab.url);
        });
    } 
});
