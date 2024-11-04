function GetTime() {
    document.getElementById('time').innerHTML = Math.round(Date.now() / 1000)
}

GetTime()
setInterval(GetTime, 1000);