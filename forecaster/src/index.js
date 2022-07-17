// Expects: Nothing:
// https://app.kpnc.io/forecaster/

async function handleRequest(request) {
	const { searchParams } = new URL(request.url);
	let api = searchParams.get('api');

    let lat = searchParams.get('debug_lat');
    let lon = searchParams.get('debug_lon');
    let loc = searchParams.get('debug_loc');
    if (lat == null) { lat = request.cf.latitude }
    if (lon == null) { lon = request.cf.longitude }
    if (loc == null) { loc = request.cf.country }

    const foo = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=08a24e19cc61923175a239e65bdcad1ca6dab5ac`;
	const one = await fetch(foo, {headers: {'content-type': 'application/json;charset=UTF-8',},});
	const aqicn = await one.json();

    const bar = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=c7dcbf45-98aa-4280-9705-98c2074d99f9`;
	const two = await fetch(bar, {headers: {'content-type': 'application/json;charset=UTF-8',},});
	const iqair = await two.json();

	if (api) {
		let text = `
{
	"generated": {
		"lat": "${lat}",
		"long": "${lon}",
		"city": "${request.cf.city}",
		"region": "${request.cf.region}",
		"country": "${loc}",
		"zone": "${request.cf.timezone}"
	}, "weather": {
        "condition": "${iqair.data.current?.weather.ic == null ? '?' : iqair.data.current?.weather.ic}",
		"temperature": "${iqair.data.current?.weather.tp == null ? '?' : iqair.data.current?.weather.tp}",
		"humidity": "${iqair.data.current?.weather.hu == null ? '?' : iqair.data.current?.weather.hu}",
		"windspeed": "${iqair.data.current?.weather.ws == null ? '?' : iqair.data.current?.weather.ws}",
		"winddirection": "${iqair.data.current?.weather.wd == null ? '?' : iqair.data.current?.weather.wd}",
		"pressure": "${iqair.data.current?.weather.pr == null ? '?' : iqair.data.current?.weather.pr}"
        "uvi": "${aqicn.data.forecast.daily.uvi == null ? '?' : aqicn.data.forecast.daily.uvi[1]?.avg}"
	}, "airquality": {
		"aqi": "${aqicn.data.aqi == null ? '?' : aqicn.data.aqi == null}",
		"pm25": "${aqicn.data.iaqi.pm25?.v == null ? '?' : aqicn.data.iaqi.pm25?.v}",
		"pm10": "${aqicn.data.iaqi.pm10?.v == null ? '?' : aqicn.data.iaqi.pm10?.v}",
		"o3": "${aqicn.data.iaqi.o3?.v == null ? '?' : aqicn.data.iaqi.o3?.v}",
		"co": "${aqicn.data.iaqi.co?.v == null ? '?' : aqicn.data.iaqi.co?.v}",
		"no2": "${aqicn.data.iaqi.no2?.v == null ? '?' : aqicn.data.iaqi.no2?.v}",
		"so2": "${aqicn.data.iaqi.so2?.v == null ? '?' : aqicn.data.iaqi.so2?.v}"
	}
}
		`;

		return new Response(text, {
			headers: { 'content-type': 'text/plain', 'status' : 200 },
		})
	} else {
        let conditions = {
            '01d': 'Clear Sky',
            '01n': 'Clear Sky',
            '02d': 'Few Clouds',
            '02n': 'Few Clouds',
            '03d': 'Scattered Clouds',
            '04d': 'Broken Clouds',
            '09d': 'Rain Showers',
            '10d': 'Rain Showers',
            '10n': 'Rain Showers',
            '11d': 'Thunderstorms',
            '13d': 'Snowy',
            '50d': 'Foggy'
        };

        let cond = conditions[iqair.data.current?.weather.ic];
        let pres = iqair.data.current?.weather.pr + ' hPa';
        let temp = Math.round(iqair.data.current?.weather.tp) + '°C';
        let wind = iqair.data.current?.weather.ws;
        
        switch(loc) {
            case 'US':
                pres = `${Math.round(((iqair.data.current?.weather.pr * 0.029529983071445) + Number.EPSILON) * 100) / 100} inHg`
                temp = `${Math.round((iqair.data.current?.weather.tp * (9 / 5)) + 32)}°F`;
                wind = `${Math.round(((wind * 2.237) + Number.EPSILON) * 10) / 10} mph`
                break;

            case 'CA':
                pres = `${Math.round(((iqair.data.current?.weather.pr * 0.1) + Number.EPSILON) * 100) / 100} kPa`
                wind = `${Math.round(((wind * 3.6) + Number.EPSILON) * 10) / 10} km/h`
                break;

            case 'UK':
                wind = `${Math.round(((wind * 2.237) + Number.EPSILON) * 10) / 10} mph`
                break;

            case 'IE':
            case 'DE':
            case 'PL':
            case 'BE':    
            case 'FR':
            case 'MD':
            case 'AT':
            case 'CH':
            case 'IT':
            case 'SI':
            case 'TR':
            case 'ES':
            case 'PT':
            case 'JO':
            case 'IL':
            case 'AU':
                wind = `${Math.round(((wind * 3.6) + Number.EPSILON) * 10) / 10} km/h`
                break;

            case 'MT':
                wind = `${Math.round(((wind * 1.94384) + Number.EPSILON) * 10) / 10} Knots`
                break;

            case 'RU':
                pres = `${Math.round(((iqair.data.current?.weather.pr * 0.7500616827) + Number.EPSILON) * 100) / 100} Torr`
                wind = `${wind} m/s`
                break;

            case 'GR':
                if (wind < 0.5) {wind = 'Force 0'}
                if (wind > 0.5 && wind < 1.5) {wind = 'Force 1'}
                if (wind > 1.5 && wind < 3.5) {wind = 'Force 2'}
                if (wind > 3.5 && wind < 5.5) {wind = 'Force 3'}
                if (wind > 5.5 && wind < 8) {wind = 'Force 4'}
                if (wind > 8 && wind < 11) {wind = 'Force 5'}
                if (wind > 11 && wind < 14) {wind = 'Force 6'}
                if (wind > 14 && wind < 17) {wind = 'Force 7'}
                if (wind > 17 && wind < 21) {wind = 'Force 8'}
                if (wind > 21 && wind < 24.5) {wind = 'Force 9'}
                if (wind > 24.5 && wind < 28.5) {wind = 'Force 10'}
                if (wind > 28.5 && wind < 32.5) {wind = 'Force 11'}
                if (wind > 32.5) {wind = 'Force 12'}
                break;

            default:
                wind = `${wind} m/s`
                break;
        }

        if (iqair.status == 'fail') {
            cond = 'Could not locate station...';
            temp = '?';
            wind = '?';
            pres = '?';
        }

		let html = `
		    <!DOCTYPE html>
            <html lang='en'>
                <head>
                    <title>KPNC Forecaster</title>
                    <meta charset='UTF-8'>
                    <meta name='theme-color' content='#1472FC'>
                    <meta name='author' content='KPNC Technology'>
                    <meta name='description' content='KPNC Technology: Forecaster: Current environmental conditions...'>
                    <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0'>
                    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
                    <link href='https://content.kpnc.io/' rel='preconnect'>
                    <link href='https://content.kpnc.io/css/forecaster.css' rel='stylesheet'>
                    <link href='https://content.kpnc.io/css/roboto-mono.css' rel='stylesheet'>
                    <link href='https://content.kpnc.io/img/kpnc/favicon.png' rel='icon'>
                    <link href='https://content.kpnc.io/lib/leaflet/leaflet.css' rel='stylesheet'>
                    <script src='https://content.kpnc.io/lib/leaflet/leaflet.js'></script>
                </head>
                <body>
                    <main>
                        <header>
                            <a href='https://www.kpnc.io'>
                                <img src='https://content.kpnc.io/img/kpnc/logodark.webp' alt='~KPNC~'>
                            </a>

                            <small>2022 &copy; KPNC Technology // Forecaster: <a href='https://github.com/kpncio/forecaster' target='_blank'>GitHub</a></small>
                        </header>

                        <header>
                            <div class='weather'>
                                <h1><img src='https://content.kpnc.io/img/kpnc/weather/${iqair.data.current?.weather.ic}.webp' alt='🌟'> ${temp.slice(0, -1)}</h1>
                            </div>
                            
                            <h2 id='date'>-------, ------- ----</h2>
                            <h2 id='time'>--:--:-- --</h2>
                        </header>

                        <div class='container'>
                            <p><strong>Generated Data:</strong></p><br>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p>&rtrif; Latitude</p></td>
                                        <td><input type='text' class='data' value='${lat}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Longitude</p></td>
                                        <td><input type='text' class='data' value='${lon}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; City</p></td>
                                        <td><input type='text' class='data' value='${request.cf.city}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Region</p></td>
                                        <td><input type='text' class='data' value='${request.cf.region}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Country</p></td>
                                        <td><input type='text' class='data' value='${loc}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Timezone</p></td>
                                        <td><input type='text' class='data' value='${request.cf.timezone}'/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <br>
                        <div class='container'>
                            <p><strong>Weather Data:</strong></p><br>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p>&rtrif; Condition</p></td>
                                        <td><input type='text' class='data' value='${cond}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Temperature</p></td>
                                        <td><input type='text' class='data' value='${temp}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Humidity</p></td>
                                        <td><input type='text' class='data' value='${iqair.data.current?.weather.hu == null ? '?' : iqair.data.current?.weather.hu + '%'}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Wind Speed</p></td>
                                        <td><input type='text' class='data' value='${wind}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Wind Direction</p></td>
                                        <td><input type='text' class='data' value='${iqair.data.current?.weather.wd == null ? '?' : iqair.data.current?.weather.wd + '°'}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Pressure</p></td>
                                        <td><input type='text' class='data' value='${pres}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; UVI</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.forecast.daily.uvi == null ? '?' : aqicn.data.forecast.daily.uvi[1]?.avg} of 10'/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <br>
                        <div class='container'>
                            <p><strong>Air Quality Data:</strong></p><br>
                            <small style="margin-left: 10px;">*Values on AQI Scale...</small>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p>&rtrif; AQI</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.aqi == null ? '?' : aqicn.data.aqi}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; PM 2.5</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.iaqi.pm25?.v == null ? '?' : aqicn.data.iaqi.pm25?.v}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; PM 10</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.iaqi.pm10?.v == null ? '?' : aqicn.data.iaqi.pm10?.v}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Ozone</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.iaqi.o3?.v == null ? '?' : aqicn.data.iaqi.o3?.v}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Carbon Monoxide</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.iaqi.co?.v == null ? '?' : aqicn.data.iaqi.co?.v}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Nitrogen Dioxide</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.iaqi.no2?.v == null ? '?' : aqicn.data.iaqi.no2?.v}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Sulfur Dioxide</p></td>
                                        <td><input type='text' class='data' value='${aqicn.data.iaqi.so2?.v == null ? '?' : aqicn.data.iaqi.so2?.v}'/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <br>
                        <div class='container'>
                            <p><strong>Map Visualization:</strong></p><br>
                            <div id='map' style='height: 250px; font-size: 11px; text-align: center;'>*Map loading...</div>
                        </div>

                        <div class='container'>
                            <small>*If client geolocation is blocked, locational data is gathered via GeoIP...</small>
                        </div>
                    </main>

                    <script>
                        var map = L.map('map').setView([${lat}, ${lon}], 11);
                                
                        var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                            maxZoom: 18,
                            attribution: "Map Data & Imagery &copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> & <a href='https://www.mapbox.com/' target='_blank'>Mapbox</a>",
                            id: 'mapbox/dark-v10',
                            tileSize: 512,
                            zoomOffset: -1,
                            accessToken: 'pk.eyJ1IjoiYWxiaWU2NTQ0IiwiYSI6ImNsMjV1YmdmMTJkcTMza3BkZTdmbnY1bTcifQ.YpT_p-H1WckYccV8_HoLHg'
                        }).addTo(map);
                    </script>

                    <video playsinline autoplay muted loop src='https://content.kpnc.io/vid/dubai16.mp4' preload='metadata'></video>
                </body>

                <script>
                    let days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
                    let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

                    function ordinal(i) {
                        var j = i % 10,
                            k = i % 100;
                        if (j == 1 && k != 11) {
                            return i + "st";
                        }
                        if (j == 2 && k != 12) {
                            return i + "nd";
                        }
                        if (j == 3 && k != 13) {
                            return i + "rd";
                        }
                        return i + "th";
                    }

                    function set(now) {
                        document.getElementById('date').innerHTML = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + ordinal(now.getDate());
                        document.getElementById('time').innerHTML = now.toLocaleTimeString()
                    }

                    setInterval(() => set(new Date()), 1000);

                    let date = new Date();
                    let time = ((((date.getHours() * 60) + date.getMinutes()) * 60) + date.getSeconds()) * 0.0625;

                    document.querySelector('video').addEventListener('loadeddata', function() {
                        this.playbackRate = 0.0625;
                        this.currentTime = time;
                    }, false);

                    set(new Date());

                    setTimeout(() => window.location.href = window.location.href, 3600000);
                </script>
            </html>
		`;

		return new Response(html, {
			headers: { 'content-type': 'text/html;charset=UTF-8', 'status' : 200 },
		});
	}
}

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})
