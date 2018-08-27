const   matches = ['http://*/*', 'https://*/*', 'ftp://*/*', 'file://*/*'],
        noMatches = [/^https?:\/\/chrome.google.com\/.*$/];

let Filenames = [];

function isValidUrl(url) {
    
    // couldn't find a better way to tell if executeScript
    // wouldn't work -- so just testing against known urls
    // for now...
    var r, i;
    for (i = noMatches.length - 1; i >= 0; i--) {
        if (noMatches[i].test(url)) {
            return false;
        }
    }
    for (i = matches.length - 1; i >= 0; i--) {
        r = new RegExp('^' + matches[i].replace(/\*/g, '.*') + '$');
        if (r.test(url)) {
            return true;
        }
    }
    return false;
}

function initiateCapture(tab, callback) {
    chrome.tabs.sendMessage(tab.id, {msg: 'scrollPage'}, function() {
        callback();
    });
}

function capture(data, screenshot, sendResponse) {
    chrome.tabs.captureVisibleTab(null, {format: 'png', quality: 100}, function(dataURI) {
        if (dataURI) {
            var image = new Image();
            image.onload = function() {
                data.image = {width: image.width, height: image.height};

                // given device mode emulation or zooming, we may end up with
                // a different sized image than expected, so let's adjust to
                // match it!
                if (data.windowWidth !== image.width) {
                    var scale = image.width / data.windowWidth;
                    data.x *= scale;
                    data.y *= scale;
                    data.totalWidth *= scale;
                    data.totalHeight *= scale;
                }

                // lazy initialization of screenshot canvases (since we need to wait
                // for actual image size)
                if (!screenshot.length) {
                    Array.prototype.push.apply(
                        screenshot,
                        _initScreenshots(data.totalWidth, data.totalHeight)
                    );
                    if (screenshot.length > 1) {
                        console.error("screenshot too long to be processed as a single image");
                    }
                }

                // draw it on matching screenshot canvases
                _filterScreenshots(
                    data.x, data.y, image.width, image.height, screenshot
                ).forEach(function(screenshot) {
                    screenshot.ctx.drawImage(
                        image,
                        data.x - screenshot.left,
                        data.y - screenshot.top
                    );
                });

                // send back log data for debugging (but keep it truthy to
                // indicate success)
                sendResponse(JSON.stringify(data, null, 4) || true);
            };
            image.src = dataURI;
        }
    });
}


function _initScreenshots(totalWidth, totalHeight) {
    // Create and return an array of screenshot objects based
    // on the `totalWidth` and `totalHeight` of the final image.
    // We have to account for multiple canvases if too large,
    // because Chrome won't generate an image otherwise.
    //
    var badSize = (totalHeight > MAX_PRIMARY_DIMENSION ||
                   totalWidth > MAX_PRIMARY_DIMENSION ||
                   totalHeight * totalWidth > MAX_AREA),
        biggerWidth = totalWidth > totalHeight,
        maxWidth = (!badSize ? totalWidth :
                    (biggerWidth ? MAX_PRIMARY_DIMENSION : MAX_SECONDARY_DIMENSION)),
        maxHeight = (!badSize ? totalHeight :
                     (biggerWidth ? MAX_SECONDARY_DIMENSION : MAX_PRIMARY_DIMENSION)),
        numCols = Math.ceil(totalWidth / maxWidth),
        numRows = Math.ceil(totalHeight / maxHeight),
        row, col, canvas, left, top;

    var canvasIndex = 0;
    var result = [];

    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            canvas = document.createElement('canvas');
            canvas.width = (col == numCols - 1 ? totalWidth % maxWidth || maxWidth :
                            maxWidth);
            canvas.height = (row == numRows - 1 ? totalHeight % maxHeight || maxHeight :
                             maxHeight);

            left = col * maxWidth;
            top = row * maxHeight;

            result.push({
                canvas: canvas,
                ctx: canvas.getContext('2d'),
                index: canvasIndex,
                left: left,
                right: left + canvas.width,
                top: top,
                bottom: top + canvas.height
            });

            canvasIndex++;
        }
    }

    return result;
}


function _filterScreenshots(imgLeft, imgTop, imgWidth, imgHeight, screenshot) {
    // Filter down the screenshot to ones that match the location
    // of the given image.
    //
    var imgRight = imgLeft + imgWidth,
        imgBottom = imgTop + imgHeight;
    return screenshot.filter(function(screenshot) {
        return (imgLeft < screenshot.right &&
                imgRight > screenshot.left &&
                imgTop < screenshot.bottom &&
                imgBottom > screenshot.top);
    });
}


function getBlobs(screenshot) {
    return screenshot.map(function(s) {
        var dataURI = s.canvas.toDataURL();

        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // create a blob for writing to a file
        var blob = new Blob([ab], {type: mimeString});
        return blob;
    });
}


function saveBlob(blob, filename, index, callback, errback) {
    filename = _addFilenameSuffix(filename + count,index);

    function onwriteend() {
        // open the file that now contains the blob - calling
        // `openPage` again if we had to split up the image
        var urlName = ('filesystem:chrome-extension://' +
                       chrome.i18n.getMessage('@@extension_id') +
                       '/temporary/' + filename);

        callback(urlName);
    }

    // come up with file-system size with a little buffer
    var size = blob.size + (1024 / 2);

    // create a blob for writing to a file
    var reqFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    reqFileSystem(window.TEMPORARY, size, function(fs){
        fs.root.getFile(filename, {create: true}, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = onwriteend;
                fileWriter.write(blob);
            }, errback); // TODO - standardize error callbacks?
        }, errback);
    }, errback);
}

function _addFilenameSuffix(filename, index) {
    if (!index) {
        return filename;
    }
    var sp = filename.split('.');
    var ext = sp.pop();
    return sp.join('.') + '-' + (index + 1) + '.' + ext;
}


function captureToBlobs(tab, callback, errback) {
    var screenshot = [],
        noop = function() {};

    callback = callback || noop;
    errback = errback || noop;

    if (!isValidUrl(tab.url)) {
        errback('invalid url'); // TODO errors
        return;
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        if (request.msg === 'capture') {
            capture(request, screenshot, sendResponse);

            // https://developer.chrome.com/extensions/messaging#simple
            //
            // If you want to asynchronously use sendResponse, add return true;
            // to the onMessage event handler.
            //
            return true;
        }
    });

    chrome.tabs.executeScript(tab.id, {file: 'screenshot.js'}, function() {
        initiateCapture(tab, function() {
            callback(getBlobs(screenshot));
        });
    });
}


function captureToFiles(tab, filename, callback, errback) {
    captureToBlobs(tab, function(blobs) {
        var i = 0,
            len = blobs.length;

        (function doNext() {
            saveBlob(blobs[i], filename, i, function(filename) {
                i++;
                Filenames.push(filename);
                i >= len ? callback() : doNext();
            }, errback);
        })();
    }, errback);
    
    console.log(Filenames);
}

function errorHandler(reason) {
    console.log(reason);
}

function getFilename(contentURL) {
    var name = contentURL.split('?')[0].split('#')[0];
    if (name) {
        name = name
            .replace(/^https?:\/\//, '')
            .replace(/[^A-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^[_\-]+/, '')
            .replace(/[_\-]+$/, '');
        name = '-' + name;
    } else {
        name = '';
    }
    return 'screencapture' + name + '-' + Date.now() + '.png';
}

/*
 * Init screenshot
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    let filename = getFilename(tab.url);
    document.onload = captureToFiles(tab, filename, self.init, errorHandler);
})
