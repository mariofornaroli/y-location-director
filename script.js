const address = document.getElementById('address')
const locationContainer = document.getElementById('locationContainer')
const _API_KEY = 'INSERT_KEY_HERE';

function getLocation() {
    locationContainer.classList.add('loading')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            positionCB,
            () => setUiMessage("Geolocation not allowed"))
    } else {
        setUiMessage("Geolocation is not supported by this browser")
    }

}

function positionCB(pos) {
    const {latitude, longitude} = pos.coords;
    reverseGeocoding(latitude, longitude)
}

function reverseGeocoding(lat, lon) {
    const api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
        + '?'
        + 'key=' + _API_KEY
        + '&q=' + encodeURIComponent(lat + ',' + lon);

    axios.get(request_url)
        .then((res) => {
            const {data}=res;
            const firstResult = data.results && data.results[0];
            // console.log(firstResult)
            setUiMessage(firstResult.formatted)
        })
        .catch(() => setUiMessage('An error occurred while detecting the location'))
}

function setUiMessage(txt) {
    address.innerHTML = txt;
    locationContainer.classList.remove('loading')
}

// call getLocation at startup
getLocation()
