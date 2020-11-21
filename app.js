var xhr = new XMLHttpRequest();


/**
 * var xhr = getHttpRequest()
 xhr.open('GET', 'http://localhost/demo', true)
 // On envoit un header pour indiquer au serveur que la page est appellée en Ajax
 xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
 // On lance la requête
 xhr.send()
 * @type {Element}
 */


var form = document.querySelector('#contact')
var button = form.querySelector('button[type=submit]')
var buttonText = button.textContent

form.addEventListener('submit', function () {
    //Avoid double submission
    button.disabled = true
    buttonText = 'Chargement...'

    var errorElements = form.querySelectorAll('.has-error')
    for(var i = 0; i < errorElements.length; i++) {
        errorElements[i].classList.remove('has-error')
        var span = errorElements[i].querySelector('.help-block')
        if(span) {
            span.parentNode.removeChild(span)
        }
    }

    e.preventDefault()

    var data = new FormData(form);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status !== 200) {
                var errors = JSON.parse(xhr.responseText)
                var errorsKey = Object.keys(errors)

                for(i = 0; i < errorsKey.length; i++) {
                    var key = errorsKey[i]
                    var error = errors[key]
                    var input = document.querySelector('[name=' + key + ']')
                    var span = document.createElement('span')
                    span.className = 'help-block'
                    span.innerHTML = error
                    input.parentNode.classList.add('has-error')
                }
            } else {
                var results = JSON.parse(xhr.responseText)
                console.log(results.success)

                //Clean all inputs after submission
                var inputs = form.querySelectorAll('input, textearea')
                for(var i = 0; i < inputs.length; i++) {
                    inputs[i].value = ""
                }
            }

            button.disabled = false
            button.textContent = buttonText
        }
    }

    xhr.open('POST', form.getAttribute('action'), true)
    //Header needed to post the data
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send(data)

})