const   urls = [
    // "http://field.incheon.go.kr/posts/2237/590?rnum=3&curPage=1",
    // "https://www.yeoncheon.go.kr/index.yeoncheon?menuCd=DOM_000000702003004000",
    // "http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId=10000912688",
    // "https://www.gyeongnam.go.kr/bangjae/index.gyeong?menuCd=DOM_000000205002002000",
    // "http://www.yonhapnews.co.kr/bulletin/2016/09/20/0200000000AKR20160920161700073.HTML",
    // "http://www.itworld.co.kr/news/53411",
    // "http://news.donga.com/3/all/20090623/8747031/1",
    // "http://www.hani.co.kr/arti/society/schooling/766099.html",
    // "https://www.insunet.co.kr/ja/sangsik_cont.asp?sn=943",
    // "https://www.jeju.go.kr/news/bodo/list.htm?act=view&seq=1113489",
    // "http://www.safeleader.org/bbs/tb.php/sub42/47",
    // "http://01048622447.com/bbs/board.php?ca_id=&bo_table=gallery&wr_id=44&sfl=&stx=&sst=wr_datetime&sod=desc&sop=and&page=2",
    // "http://todayenergy.kr/news/articleView.html?idxno=9798",
    // "http://www.nocutnews.co.kr/news/5018208",
    // "http://www.hankookilbo.com/v/489d66fb79e54ae0a3cc9d7c420d1e74",
    // "http://sky0113.com/157",
    // "http://hdjungin.tistory.com/entry/%EA%B3%A4%EC%95%BD%EC%9D%98-%EC%98%A4%ED%95%B4%EC%99%80-%EC%A7%84%EC%8B%A4-%EA%B3%A4%EC%95%BD%EC%9D%98-%EA%B2%80%EC%A6%9D%EB%90%9C-%ED%9A%A8%EB%8A%A5-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%B6%80%EC%9E%91%EC%9A%A9",
    // "http://health.chosun.com/site/data/html_dir/2006/01/17/2006011756014.html",
    // "http://overseas.kuroho.com/korean.html",
    // "https://matcha-jp.com/ko/2748",
    // "http://www.venturesquare.net/763587",
    // "http://news.donga.com/3/all/20150723/72674968/1",
    // "https://ko.wikipedia.org/wiki/%ED%86%B5%EC%97%AD_%EA%B3%A4%EC%95%BD",
    // "http://ssoqubae.tistory.com/2071",
    // "http://bugerbok.tistory.com/325",
    // "http://byuns.tistory.com/294",
    // "http://learningnara.tistory.com/entry/%EC%A4%91%EA%B5%AD-%ED%99%A9%EC%A0%9C%EC%9D%98-%EB%B9%84%EB%A7%8C%EC%9D%84-%EC%98%88%EB%B0%A9%ED%95%9C-%EA%B3%A4%EC%95%BD-%ED%9A%A8%EB%8A%A5",
    // "https://www.instagram.com/p/BjP2Vw-AMsx/",
    // "http://lodowap.xyz/video/category/%EA%B3%A4%EC%95%BD-%ED%9A%A8%EB%8A%A5.html",
    // "https://nl.pinterest.com/pin/701224604453646924/",
    // "https://twitter.com/hashtag/%EA%B3%A4%EC%95%BD%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8?lang=ko",
    // "https://www.sisain.co.kr/25555",
    // "http://exem.tistory.com/967",
    // "https://cpuu.postype.com/post/132269",
    // "http://leekh7411.tistory.com/1",
    // "http://www.hani.co.kr/arti/sports/baduk/734495.html",
    // "http://imnews.imbc.com/replay/2016/nw1800/article/3896746_19830.html",
    // "https://www.natureasia.com/ko-kr/nature/highlights/89679",
    // "https://ko.wikipedia.org/wiki/%EC%95%8C%ED%8C%8C%EA%B3%A0",
    // "http://tmmse.xyz/2016/03/04/alphago/",
    // "http://hanmin-dev.tistory.com/17",
    // "http://everyhark.tistory.com/143",
    // "http://m.blog.naver.com/cbkim53/220652475176",
    // "http://www.joysf.com/forum_sf/4873038",
    // "https://librewiki.net/wiki/%EC%95%8C%ED%8C%8C%EA%B3%A0",
    // "https://byline.network/2016/01/1-49/",
    // "http://www.hellodatascience.com/?p=673",
    // "http://news.chosun.com/site/data/html_dir/2015/11/03/2015110302248.html",
    "http://sports.khan.co.kr/news/sk_index.html?art_id=201705071036003&sec_id=540101",
    "https://namu.wiki/w/%EC%8B%B8%EC%9D%B4",
    "https://ko.wikipedia.org/wiki/%EC%B9%A0%EC%A7%91%EC%8B%B8%EC%9D%B4%EB%8B%A4",
    "http://www.fnnews.com/news/201403101740327162",
    "http://www.nocutnews.co.kr/news/1146424",
    "http://www.aktv.co.kr/news/articleView.html?idxno=11866",
    "http://www.etnews.com/20151103000362",
    "http://m.blog.naver.com/hsjeong0516/221002644128",
    "http://www.joongboo.com/news/articleView.html?idxno=1117547",
    "http://www.ytn.co.kr/_ln/0117_201512191028534683",
    "http://tenasia.hankyung.com/archives/1496314",
    "https://web.stagram.com/tag/%EC%8B%B8%EC%9D%B4%EC%BB%B4%EB%B0%B1",
    "http://grandpassion.tistory.com/711",
    "http://muykr.tistory.com/8",
    "http://www.newspim.com/news/view/20151103000197",
    "http://www.ijnews.net/news/articleView.html?idxno=3241",
    "http://www.hani.co.kr/arti/science/science_general/532746.html",
    "https://ko.wikipedia.org/wiki/%EA%B8%80%EB%A3%A8%ED%83%90%EC%82%B0_%EB%82%98%ED%8A%B8%EB%A5%A8",
    "http://www.newsis.com/view?id=NISX20150512_0013656913",
    "https://glutamate.org/ko/%EA%B8%80%EB%A3%A8%ED%83%80%EB%AF%BC%EC%82%B0%EC%97%BC%EC%97%90-%EB%8C%80%ED%95%B4/",
    "http://www.koreatimes.com/article/206164",
    "http://www.iadi.or.kr/news/articleView.html?idxno=1019",
    "http://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0001487424",
    "http://au-naturel.tistory.com/48",
    "http://m.blog.naver.com/realize66/30028158472",
    "http://blog.koreadaily.com/byunghee/944800",
    "http://bbs.ichannela.com/ch/mboard.cha?tcode=xfile&work=view&no=1973&cmt_p_page=2",
    "https://www.clien.net/service/board/park/3406213",
    "https://www.vanchosun.com/news/main/market_detail.php?main=life2&boardId=36&bdId=42030&cpage1=16",
    "https://www.huffingtonpost.kr/2014/05/20/story_n_5350127.html",
    "http://expedia.tistory.com/41",
    "https://www.skyscanner.co.kr/news/10-best-way-to-enjoy-bangkok",
    "http://gotrip56.com/bangkoktraveltop10/",
    "https://www.tripadvisor.co.kr/Attractions-g293916-Activities-Bangkok.html",
    "https://www.booking.com/landmark/th/grand-palace.ko.html",
    "https://www.voakorea.com/a/2921203.html",
    "https://kr.hotels.com/de1313946-ah/travel-guides-bangkog-taegug/",
    "https://ko.wikipedia.org/wiki/%EB%B0%A9%EC%BD%95",
    "http://tour.interpark.com/freeya/Discovery/View.aspx?seq=11446",
    "https://thai.monkeytravel.com/user/board/board_view.php?code=food&mfcode=&idx=389427",
    "https://brunch.co.kr/@allstay/770",
    "https://www.herenow.city/ko/bangkok/venue/",
    "https://www.facebook.com/media/set/?set=a.414389408689630.1073741841.345071648954740&type=3",
    "http://the-bangkok-cha-cha-suite.bangkokshotels.com/ko/",
    "https://www.tranghotelbangkok.com/ko-kr/attractions",
    "https://realguidebook.com/bangkok-attraction-exciting/"
];

let count = 0,
    DomData = [],
    Files = [],
    midPoint = 48;

function stringifyDOM(filenames, tab) {
    Files.push(filenames);
    console.log(Files);
    exportScreenshot(count);

    chrome.tabs.sendMessage(tab.id, {msg: 'stringifyDOM'}, function() {
        exportDOM(count-1);
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete" && contains(tab.url)) {

        var filename = getFilename();
        document.onload = CaptureAPI.captureToFiles(tab, filename, stringifyDOM, errorHandler);
    }
});

function contains(url) {
    return url.includes("http");
}

function errorHandler(reason) {
    console.log("ERR: " + reason);
}

function getFilename() {
    return 'screencapture' + '-' + (count + midPoint) + '.png';
}

function exportDOM(i) {
    // export dom data
    var val = DomData[i];

    if (val) {
        var blob = new Blob([val], {type: "text/plain; charset=UTF-8"});

        var filename = (i + midPoint) + ".txt";
        var size = blob.size + (1024 / 2);
        var reqFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    
        function onwriteend() {
            // open the file that now contains the blob - calling
            // `openPage` again if we had to split up the image
            var urlName = ('filesystem:chrome-extension://' +
                            chrome.i18n.getMessage('@@extension_id') +
                            '/temporary/' + filename);
    
            chrome.downloads.download({
                url: urlName,
                conflictAction : 'uniquify',
                saveAs: false
            });
        }

        reqFileSystem(window.TEMPORARY, size, function(fs){
            fs.root.getFile(filename, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = onwriteend;
                    fileWriter.write(blob);
                }, errorHandler); // TODO - standardize error callbacks?
            }, errorHandler);
        }, errorHandler);
    }
}

function exportScreenshot(i) {

    // export the screenshot files
    var fileVal = Files[i];

    if (fileVal) {
        chrome.downloads.download({
            url: fileVal[0],
            conflictAction : 'uniquify',
            saveAs: false
        });
    }
    
}

function exportData() {

    // export dom data
    DomData.forEach(function(val, i) {

        expoertDom(i);

    });

    // export the screenshot files
    Files.forEach(function(file, i) {
        exportScreenshot(i);
    }, function() {
        alert("COMPLETE");
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("from " + sender.tab.url);

    if (typeof request === "string" || request instanceof String) {
        DomData.push( request );
        sendResponse({success: true});
        console.log(DomData);

        if (DomData.length == urls.length) {
            exportData();
            return;
        }

        chrome.tabs.update(sender.tab.id, {url: urls[++count]}, function(tab) {
            console.log("updated to " + tab.url);
        });
    } 
});
