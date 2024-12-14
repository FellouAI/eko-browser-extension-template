declare const eko: any;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  (async () => {
    try {
      switch (request.type) {
        case "page:getDetailLinks": {
          let result = await eko.getDetailLinks(request.search);
          sendResponse(result);
          break;
        }
        case "page:getContent": {
          let result = await eko.getContent(request.search);
          sendResponse(result);
          break;
        }
        case "computer:cursor_position": {
          sendResponse({ coordinate: [eko.lastMouseX, eko.lastMouseY] });
          break;
        }
      }
    } catch (e) {
      console.log("onMessage error", e);
    }
  })();
  return true;
});

document.addEventListener("mousemove", (event) => {
  eko.lastMouseX = event.clientX;
  eko.lastMouseY = event.clientY;
});