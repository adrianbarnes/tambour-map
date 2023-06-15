// var font = this.get("value");
// console.log(json.options.font);
function getFont(font) {
    switch (font) {
        case "12px Arial, sans-serif":
            font = "Arial, sans-serif";
            break;
        case "12px Tahoma, sans-serif":
            font = "Tahoma, sans-serif";
            break;
        case "12px Times New Roman, serif":
            font = "Times New Roman, serif";
            break;
        case "12px Verdana, sans-serif":
            font = "Verdana, sans-serif";
            break;
    }
    return font;
}

function getFontSize(fontsize) {

    if (fontsize == undefined) {
        var maplocation = getVar(maplocation);
        switch (maplocation) {
            case 'mexico':
            case 'mexico':
            case 'pa':
            case 'oh':
            case 'ca':
            case 'florida':
            case 'Bolivia':
            case 'fl':
            case 'ky':
            case 'tn':
            case 'az':
            case 'in':
            case 'mi':
            case 'san-salvador':
            case 'ireland':
            case 'africa':
            case 'uscanadamexico':
                return "9px";
                break;
            default:
                return "12px";
        }
    } else {
        return fontsize;
    }

}

/*
This function works like $_GET on php.
*/
function getVar(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}
 
function validateEmail(email) {
    const re = /(^mailto):(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validURL(str) {
    // var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        
    // this second one accepts:  https://clearlawinstitute.com/covid-19-resources-me/#googtrans/en/es.
    var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;


    if (pattern.test(str) == false && validateEmail(str) == false) {
        alert('Please insert a valid URL (including http://)');
        return '';
    } else {
        return str;
    }
}