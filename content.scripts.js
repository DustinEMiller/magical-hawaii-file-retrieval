chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(executeForm(request));
});

function executeForm(args) {

    /*switch (args.domain) {
        case 'medicare.healthalliance.org':
        case 'www.medicare.healthalliance.org':
            document.getElementById('SiteId').value = '2';
            break;
        case 'healthalliance.org': 
        case 'www.healthalliance.org': 
            document.getElementById('SiteId').value = '5';
            break;
        case 'medicaid.healthalliance.org':
        case 'www.medicaid.healthalliance.org':
            document.getElementById('SiteId').value = '8';
            break;
        default: 
            document.getElementById('SiteId').value = '';
    }*/
    
    document.getElementById('FileName').value = args.filename;
    document.getElementsByTagName('form')[0].submit();
}
