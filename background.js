const urls = [
    "https://opengov.seoul.go.kr/mediahub/11089478",
    "https://www.byedust.net/02",
    "http://kfem.or.kr/?p=187396",
    "https://www.bbc.com/korean/news-43524873",
    "http://news.jtbc.joins.com/article/article.aspx?news_id=NB11609490"
];

let index = 0,
    data = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      // successful
      if (request) {
        data.push( request );
        sendResponse({success: true});

        chrome.tabs.update(sender.tab.id, {url: urls[++index]}, function(tab) {
            console.log("updated to " + tab.url);
        });
      }
      // fail
      else
        sendResponse({success: false});

      console.log(data);
    }
);