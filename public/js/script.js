function changeLanguage() {
    const language = document.getElementById('language').value
    const obj = {
        language
    }

    $.ajax({
        url: '/language',
        type: 'POST',
        data: obj,
        success: function () {

            if(window.location.href.includes('hy') && language === 'en') {
                window.location.href = window.location.href.replace('hy', 'en')
            }
            if(window.location.href.includes('en') && language === 'hy') {
                window.location.href = window.location.href.replace('en', 'hy')
            }
        },
        error: function (data) {
            console.log('User creation failed' + data)
        }
    })
}