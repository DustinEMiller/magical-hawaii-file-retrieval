function extractFilename (info, tab) {
    var matches = info.linkUrl.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];
    var filename = info.linkUrl.substring(info.linkUrl.lastIndexOf('/')+1);
    
    doSearch(filename,domain,tab);
}

function doSearch(filename, domain, tab) {
    var tabCreated = false;
    
    if(magicTabId === "") {
        chrome.tabs.create({
            url : "http://contentadmin/resource/LinkSearch",
            selected : false,
            index : tab.index + 1,
        }, 
            function(tabinfo){
                magicTabId = tabinfo.id;
                chrome.tabs.onUpdated.addListener(function(tabId, info) {
                    if (info.status === "complete" && magicTabId === tabId && !tabCreated) {
                        chrome.tabs.executeScript(
                            magicTabId,
                            {file: "content.scripts.js"},
                            function(){
                                chrome.tabs.sendMessage(magicTabId, {
                                filename: filename, 
                                domain: domain}
                            );}
                        );
                        tabCreated = true;
                    }
                });
        });
    } else {
        chrome.tabs.executeScript(
            magicTabId,
            {file: "content.scripts.js"},
            function(){
                chrome.tabs.sendMessage(magicTabId, {
                filename: filename, 
                domain: domain}
            );}
        );
    }
}

function resetContextMenus () {
    chrome.contextMenus.removeAll(
	function() {
	    chrome.contextMenus.create({
                title: "Search HAWAII for file name",
                contexts: ["link"],
                onclick: extractFilename
	    });
	}
    );
}
var magicTabId = "";
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    if(magicTabId === tabId){
        magicTabId = "";
    }
});
resetContextMenus();