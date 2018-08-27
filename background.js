const urls = [
    "https://opengov.seoul.go.kr/mediahub/11089478",
    "https://www.byedust.net/02",
    "http://kfem.or.kr/?p=187396",
    "https://www.bbc.com/korean/news-43524873",
    "http://mnews.jtbc.joins.com/News/Article.aspx?news_id=NB11609490"
];

let data = [];

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs);
    var tab = tabs[0];
    console.log(tab);
    console.log(tab.url);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      // successful
      if (request) {
        data.push( request );
        sendResponse({success: true});
      }
      // fail
      else
        sendResponse({success: false});

      console.log(data);
    }
);