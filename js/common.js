function switchLanguage() {
    if (localStorage['isChinese'] === "true") {
        localStorage['isChinese'] = "false";
    } else {
        localStorage['isChinese'] = "true";
    }
}