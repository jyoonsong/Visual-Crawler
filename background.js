const   urls = [
                "https://opengov.seoul.go.kr/mediahub/11089478",
                "https://www.byedust.net/02",
                "http://kfem.or.kr/?p=187396",
                "https://www.bbc.com/korean/news-43524873",
                "http://news.jtbc.joins.com/article/article.aspx?news_id=NB11609490"
                ];

let count = 0,
    DomData = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("from " + sender.tab.url);

    console.log(typeof request);

    if (typeof request === "string" || request instanceof String) {
        DomData.push( request );
        sendResponse({success: true});
        console.log(DomData);

        if (count == urls.length)
            return;

        chrome.tabs.update(sender.tab.id, {url: urls[++count]}, function(tab) {
            console.log("updated to " + tab.url);
        });
    } 
});
