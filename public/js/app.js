const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageError = document.querySelector('#Forecast-Error')
const messageForecast = document.querySelector('#Forecast')



weatherForm.addEventListener('submit', (event) => {
    const location = searchElement.value
    event.preventDefault()

    messageError.textContent = 'Loading...'
    messageForecast.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageError.textContent = data.error
                console.log(data.error)
            } else {
                messageError.textContent = data.location
                messageForecast.textContent = data.forecast
                console.log(data)
            }
        })
        
    })
})



