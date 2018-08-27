(function() {

    /* 
    Lib: elementFromAbsolutePoint 
    */
    this.document.elementFromAbsolutePoint = function(x, y) {
        function closestFixed(elm) {
            if (window.getComputedStyle(elm).position === 'fixed') {
              return elm;
            } 
            else {
              if (elm.parentElement && !/body|html/.test(elm.parentElement.tagName.toLowerCase()))
                return closestFixed(elm.parentElement);
              else
                return null;
            }
        }

        var elm, scrollX, scrollY, newX, newY;
        scrollX = window.pageXOffset;
        scrollY = window.pageYOffset;
        window.scrollTo(x, y);
        newX = x - window.pageXOffset;
        newY = y - window.pageYOffset;
        elm = this.elementFromPoint(newX, newY);
        if (closestFixed(elm)) {
          var newElm, display, fixedElm;
          fixedElm = closestFixed(elm);
          display = fixedElm.style.display;
          fixedElm.style.display = 'none';
          newElm = this.elementFromPoint(newX, newY);
          if (!/body|html/.test(newElm.tagName.toLowerCase())) {
            elm = newElm;
          }
          fixedElm.style.display = display;
        }
        window.scrollTo(scrollX, scrollY);
        return elm;
    }

    /*
    Stringify the document
    */
    let self = {
        init: function() {
            let cnt = 0

            function newId(){
                return "" + (cnt++)
            }
        
            function assignSGInfo(elem){
                elem.setAttribute("sg:id", newId())
                elem.setAttribute("sg:rect", JSON.stringify(elem.getBoundingClientRect()))
                let computed_style = getComputedStyle(elem)
                elem.setAttribute("sg:style", JSON.stringify({
                    "cursor": computed_style["cursor"],
                    "font-size": computed_style["font-size"],
                    "font-weight": computed_style["font-weight"]
                }))
                for(let child of elem.children) assignSGInfo(child)
            }

            function getPointData(leap_size){
                scroll(0, 0)
                let width = Math.max(document.body.scrollWidth, document.body.offsetWidth, 
                    document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth );
                let height = Math.max(document.body.scrollHeight, document.body.offsetHeight, 
                    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
                let ret = []
                for(let y=0;y<height;y+=leap_size){
                    ret.push([])
                    for(let x=0;x<width;x+=leap_size){
                        let elem = document.elementFromAbsolutePoint(x, y)
                        if(elem){
                            let sg_id = elem.getAttribute("sg:id")
                            ret[y/16].push(sg_id)
                        }
                        else ret[y/16].push(null)
                    }
                }
                return ret
            }

            // init
            assignSGInfo(document.body);
            document.body.setAttribute('sg:point-data', JSON.stringify(getPointData(16)));

            // sendMessage
            this.transmitData();
        },
        getData: function() {
            return '<html>' + document.documentElement.innerHTML + '</html>';
        },
        transmitData: function() {
            chrome.runtime.sendMessage(self.getData(), function(response) {
                if (!response.success) {
                    console.log("message failed");
                }
                else {
                    console.log("message successful");
                }
            });
        }
    };

    self.init();

    return self;
})();