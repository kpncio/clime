// Expects: Nothing:
// https://app.kpnc.io/forecaster/

async function handleRequest(request) {
	const { searchParams } = new URL(request.url);
	let api = searchParams.get('api');
    let nav = searchParams.get('nav');
    let latitude = searchParams.get('debug_lat');
    let longitude = searchParams.get('debug_lon');
    let country = searchParams.get('debug_con');

    if (nav != null) { latitude = nav.split(',')[0]; longitude = nav.split(',')[1] }

    if (latitude == null || longitude == null) { latitude = request.cf.latitude; longitude = request.cf.longitude }

	const url = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=4ed5f0607b694dadbcf84326221807&q=${latitude},${longitude}&aqi=yes`, {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
	const data = await url.json();

    const locales = { 'Afghanistan': 'AF', 'Aland Islands': 'AX', 'Albania': 'AL', 'Algeria': 'DZ', 'American Samoa': 'AS', 'Andorra': 'AD', 'Angola': 'AO', 'Anguilla': 'AI', 'Antarctica': 'AQ', 'Antigua and Barbuda': 'AG', 'Argentina': 'AR', 'Armenia': 'AM', 'Aruba': 'AW', 'Australia': 'AU', 'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Barbados': 'BB', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bermuda': 'BM', 'Bhutan': 'BT', 'Bolivia': 'BO', 'Netherlands Antilles': 'BQ', 'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW', 'Bouvet Island': 'BV', 'Brazil': 'BR', 'British Indian Ocean Territory': 'IO', 'Brunei Darussalam': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Cambodia': 'KH', 'Cameroon': 'CM', 'Canada': 'CA', 'Cape Verde': 'CV', 'Cayman Islands': 'KY', 'Central African Republic': 'CF', 'Chad': 'TD', 'Chile': 'CL', 'China': 'CN', 'Christmas Island': 'CX', 'Cocos (Keeling) Islands': 'CC', 'Colombia': 'CO', 'Comoros': 'KM', 'Congo': 'CG', 'Democratic Republic of Congo': 'CD', 'Cook Islands': 'CK', 'Costa Rica': 'CR', 'Cote d\'Ivoire': 'CI', 'Croatia': 'HR', 'Cuba': 'CU', 'Curacao': 'CW', 'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Djibouti': 'DJ', 'Dominica': 'DM', 'Dominican Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV', 'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Falkland Islands': 'FK', 'Faroe Islands': 'FO', 'Fiji': 'FJ', 'Finland': 'FI', 'France': 'FR', 'French Guiana': 'GF', 'French Polynesia': 'PF', 'French Southern Territories': 'TF', 'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH', 'Gibraltar': 'GI', 'Greece': 'GR', 'Greenland': 'GL', 'Grenada': 'GD', 'Guadeloupe': 'GP', 'Guam': 'GU', 'Guatemala': 'GT', 'Guernsey': 'GG', 'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY', 'Haiti': 'HT', 'Heard Island and McDonald Islands': 'HM', 'Vatican City': 'VA', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Isle of Man': 'IM', 'Israel': 'IL', 'Italy': 'IT', 'Jamaica': 'JM', 'Japan': 'JP', 'Jersey': 'JE', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kiribati': 'KI', 'North Korea': 'KP', 'South Korea': 'KR', 'Kuwait': 'KW', 'Kyrgyzstan': 'KG', 'Lao People\'s Democratic Republic': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR', 'Libya': 'LY', 'Liechtenstein': 'LI', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Macao': 'MO', 'Macedonia': 'MK', 'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML', 'Malta': 'MT', 'Marshall Islands': 'MH', 'Martinique': 'MQ', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mayotte': 'YT', 'Mexico': 'MX', 'Federated States of Micronesia': 'FM', 'Moldova': 'MD', 'Monaco': 'MC', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Montserrat': 'MS', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Netherlands': 'NL', 'New Caledonia': 'NC', 'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Niue': 'NU', 'Norfolk Island': 'NF', 'Northern Mariana Islands': 'MP', 'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palau': 'PW', 'Palestine': 'PS', 'Panama': 'PA', 'Papua New Guinea': 'PG', 'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH', 'Pitcairn': 'PN', 'Poland': 'PL', 'Portugal': 'PT', 'Puerto Rico': 'PR', 'Qatar': 'QA', 'Reunion and associated islands': 'RE', 'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW', 'Saint Barthelemy': 'BL', 'Saint Helena': 'SH', 'Saint Kitts and Nevis': 'KN', 'Saint Lucia': 'LC', 'Saint Martin (French part)': 'MF', 'Saint Pierre and Miquelon': 'PM', 'Saint Vincent and the Grenadines': 'VC', 'Samoa': 'WS', 'San Marino': 'SM', 'Sao Tome and Principe': 'ST', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS', 'Seychelles': 'SC', 'Sierra Leone': 'SL', 'Singapore': 'SG', 'Sint Maarten (Dutch part)': 'SX', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Solomon Islands': 'SB', 'Somalia': 'SO', 'South Africa': 'ZA', 'South Georgia and South Sandwich Islands': 'GS', 'South Sudan': 'SS', 'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD', 'Suriname': 'SR', 'Svalbard and Jan Mayen': 'SJ', 'Swaziland': 'SZ', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syrian Arab Republic': 'SY', 'Taiwan': 'TW', 'Tajikistan': 'TJ', 'Tanzania': 'TZ', 'Thailand': 'TH', 'Timor-Leste': 'TL', 'Togo': 'TG', 'Tokelau': 'TK', 'Tonga': 'TO', 'Trinidad and Tobago': 'TT', 'Tunisia': 'TN', 'Turkey': 'TR', 'Turkmenistan': 'TM', 'Turks and Caicos Islands': 'TC', 'Tuvalu': 'TV', 'Uganda': 'UG', 'Ukraine': 'UA', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB', 'United States of America': 'US', 'United States Minor Outlying Islands': 'UM', 'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vanuatu': 'VU', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Virgin Islands': 'VG', 'Virgin Islands of the United States': 'VI', 'Wallis and Futuna': 'WF', 'Western Sahara': 'EH', 'Yemen': 'YE', 'Zambia': 'ZM', 'Zimbabwe': 'ZW'};

    let city = null;
    let region = null;
    let timezone = null;

    if (nav != null) {
        city = data.location?.name == null ? '?' : data.location.name;
        region = data.location?.region == null ? '?' : data.location.region;
        country = data.location?.country == null ? '?' : locales[data.location.country];
        timezone = data.location?.tz_id == null ? '?' : data.location.tz_id;
    }

    if (city == null) { city = request.cf.city }
    if (region == null) { region = request.cf.region }
    if (country == null) { country = request.cf.country }
    if (timezone == null) { timezone = request.cf.timezone }

    let location = data.location?.name == null ? '?' : data.location.name;

    let index = null;
    if (data.current?.air_quality != null) {
        index = data.current.air_quality['us-epa-index'];
    }

	if (api) {
		let text = `
{
	"generated": {
		"lat": "${latitude}",
		"long": "${longitude}",
		"city": "${city}",
		"region": "${region}",
		"country": "${country}",
		"zone": "${timezone}",
        "data": "${location}"
	}, "weather": {
        "condition": "${data.current?.condition?.text == null ? '?' : data.current.condition.text}",
		"temperature": "${data.current?.temp_c == null ? '?' : data.current.temp_c}",
        "feelslike": "${data.current?.feelslike_c == null ? '?' : data.current.feelslike_c}",
		"humidity": "${data.current?.humidity == null ? '?' : data.current.humidity}",
		"windspeed": "${windspeed == '?' ? '?' : Math.round(((windspeed / 3.6) + Number.EPSILON) * 10) / 10}",
		"winddirection": "${data.current?.wind_degree == null ? '?' : data.current.wind_degree}",
		"pressure": "${data.current?.pressure_mb == null ? '?' : data.current.pressure_mb}",
        "uvi": "${data.current?.uv == null ? '?' : data.current.uv}"
	}, "airquality": {
		"aqi": "${index == null ? '?' : index}",
		"pm25": "${data.current?.air_quality?.pm2_5 == null ? '?' : Math.round((data.current.air_quality.pm2_5 + Number.EPSILON) * 10) / 10}",
		"pm10": "${data.current?.air_quality?.pm10 == null ? '?' : Math.round((data.current.air_quality.pm10 + Number.EPSILON) * 10) / 10}",
		"o3": "${data.current?.air_quality?.o3 == null ? '?' : Math.round((data.current.air_quality.o3 + Number.EPSILON) * 10) / 10}",
		"co": "${data.current?.air_quality?.co == null ? '?' : Math.round((data.current.air_quality.co + Number.EPSILON) * 10) / 10}",
		"no2": "${data.current?.air_quality?.no2 == null ? '?' : Math.round((data.current.air_quality.no2 + Number.EPSILON) * 10) / 10}",
		"so2": "${data.current?.air_quality?.so2 == null ? '?' : Math.round((data.current.air_quality.so2 + Number.EPSILON) * 10) / 10}"
	}
}
		`;

		return new Response(text, {
			headers: { 'content-type': 'text/plain', 'status' : 200 },
		})
	} else {
        let temp = null;
        switch(country) {
            case 'US':
                temp = data.current?.temp_f == null ? '?' : (Math.round(data.current.temp_f)) + '°';
                break;

            default:
                temp = data.current?.temp_c == null ? '?' : (Math.round(data.current.temp_c)) + '°';
                break;
        }

        let temperature = null;
        switch(country) {
            case 'US':
                temperature = data.current?.temp_f == null ? '?' : data.current.temp_f + '°F';
                break;

            default:
                temperature = data.current?.temp_c == null ? '?' : data.current.temp_c + '°C';
                break;
        }

        let feelslike = null;
        switch(country) {
            case 'US':
                feelslike = data.current?.feelslike_f == null ? '?' : data.current.feelslike_f + '°F';
                break;

            default:
                feelslike = data.current?.feelslike_c == null ? '?' : data.current.feelslike_c + '°C';
                break;
        }

        let windspeed = data.current?.wind_kph == null ? '?' : data.current.wind_kph;
        switch(country) {
            case 'US':
            case 'UK':
                windspeed = data.current?.wind_mph == null ? '?' : data.current.wind_mph + ' mph'
                break;

            case 'CA':
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
                windspeed = windspeed == '?' ? '?' : windspeed + ' km/h';
                break;

                case 'MT':
                    windspeed = windspeed == '?' ? '?' : (Math.round(((windspeed / 1.852) + Number.EPSILON) * 10) / 10) + 'Knots';
                    break;

            case 'GR':
                if (windspeed == '?') { windspeed = 'Force ?' }
                if (windspeed < 2) { windspeed = 'Force 0' }
                if (windspeed > 2 && windspeed < 5) { windspeed = 'Force 1' }
                if (windspeed > 5 && windspeed < 11) { windspeed = 'Force 2' }
                if (windspeed > 11 && windspeed < 19) { windspeed = 'Force 3' }
                if (windspeed > 19 && windspeed < 28) { windspeed = 'Force 4' }
                if (windspeed > 28 && windspeed < 38) { windspeed = 'Force 5' }
                if (windspeed > 38 && windspeed < 49) { windspeed = 'Force 6' }
                if (windspeed > 49 && windspeed < 61) { windspeed = 'Force 7' }
                if (windspeed > 61 && windspeed < 74) { windspeed = 'Force 8' }
                if (windspeed > 74 && windspeed < 88) { windspeed = 'Force 9' }
                if (windspeed > 88 && windspeed < 102) { windspeed = 'Force 10' }
                if (windspeed > 102 && windspeed < 117) { windspeed = 'Force 11' }
                if (windspeed > 117) { windspeed = 'Force 12' }
                break;

            default:
                windspeed = windspeed == '?' ? '?' : (Math.round(((windspeed / 3.6) + Number.EPSILON) * 10) / 10) + 'm/s';
                break;
        }

        let pressure = data.current?.pressure_mb == null ? '?' : data.current.pressure_mb;
        switch(country) {
            case 'US':
                pressure = data.current?.pressure_in == null ? '?' : data.current.pressure_in + ' inHg';
                break;

            case 'CA':
                pressure = pressure == '?' ? '?' : (pressure / 10) + ' kPa';
                break;

            case 'RU':
                pressure = data.current?.pressure_in == null ? '?' : (Math.round(((data.current.pressure_in * 25.4) + Number.EPSILON) * 10) / 10) + ' Torr';
                break;

            default:
                pressure =  pressure == '?' ? '?' : pressure + ' hPa';
                break;
        }

        const epa = {0: 'Great', 1: 'Good', 2: 'Moderate', 3: 'Unhealthy For Some', 4: 'Unhealthy', 5: 'Very Unhealthy', 6: 'Hazardous'};

        let icon = data.current?.condition?.icon == null ? null : data.current.condition.icon;
        let condition = data.current?.condition?.text == null ? '?' : data.current.condition.text;
        let humidity = data.current?.humidity == null ? '?' : data.current.humidity + '%';
        let winddegree = data.current?.wind_degree == null ? null : data.current.wind_degree;
        let windheading = data.current?.wind_dir == null ? null : data.current.wind_dir;
        let winddirection = winddegree + windheading == null ? '?' : winddegree + '°' + windheading;
        let uvi = data.current?.uv == null ? '?' : data.current.uv + ' of 10';
        let aqi = index == null ? '?' : index + ` (${epa[index]})`;
        let pm25 = data.current?.air_quality?.pm2_5 == null ? '?' : (Math.round((data.current.air_quality.pm2_5 + Number.EPSILON) * 10) / 10) + ' μg/m³';
        let pm10 = data.current?.air_quality?.pm10 == null ? '?' : (Math.round((data.current.air_quality.pm10 + Number.EPSILON) * 10) / 10) + ' μg/m³';
        let o3 = data.current?.air_quality?.o3 == null ? '?' : (Math.round((data.current.air_quality.o3 + Number.EPSILON) * 10) / 10) + ' μg/m³';
        let co = data.current?.air_quality?.co == null ? '?' : (Math.round((data.current.air_quality.co + Number.EPSILON) * 10) / 10) + ' μg/m³';
        let no2 = data.current?.air_quality?.no2 == null ? '?' : (Math.round((data.current.air_quality.no2 + Number.EPSILON) * 10) / 10) + ' μg/m³';
        let so2 = data.current?.air_quality?.so2 == null ? '?' : (Math.round((data.current.air_quality.so2 + Number.EPSILON) * 10) / 10) + ' μg/m³';
        
        let error = '';
        if (data.error != null) {
            let ecode = data.error.code == null ? '0' : data.error.code;
            let emesg = data.error.message == null ? 'Unknown error!' : data.error.message;
            
            error = `
                <script>
                    window.alert('Weather Data Error: ${ecode}: ${emesg}');
                </script>
            `;
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
            
                            <small>2022 &copy; KPNC Technology // Forecaster: <a href='https://github.com/kpncio/forecaster' target='_blank'>GitHub</a></small><br>
                            <small>External geolocation from: <a href='https://www.maxmind.com/en/home' target='_blank'>Maxmind</a></small><br>
                            <small>Weather data from: <a href='https://www.weatherapi.com/' target='_blank'>WeatherAPI</a></small>
                        </header>
            
                        <header>
                            <div class='weather'>
                                <h1><img src='https:${icon}' alt='🌟'> ${temp}</h1>
                            </div>
                            
                            <h2 id='date'>-------, ------- ----</h2>
                            <h2 id='time'>--:--:-- --</h2>
            
                            <small id="hint">*Browser Location Data*</small>
                        </header>
            
                        <div class='container'>
                            <p><strong>Generated Data:</strong></p><br>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p>&rtrif; Latitude</p></td>
                                        <td><input type='text' class='data' value='${latitude}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Longitude</p></td>
                                        <td><input type='text' class='data' value='${longitude}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; City</p></td>
                                        <td><input type='text' class='data' value='${city}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Region</p></td>
                                        <td><input type='text' class='data' value='${region}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Country</p></td>
                                        <td><input type='text' class='data' value='${country}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Timezone</p></td>
                                        <td><input type='text' class='data' value='${timezone}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Data Point</p></td>
                                        <td><input type='text' class='data' value='${location}'/></td>
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
                                        <td><input type='text' class='data' value='${condition}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Temperature</p></td>
                                        <td><input type='text' class='data' value='${temperature}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Feels Like</p></td>
                                        <td><input type='text' class='data' value='${feelslike}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Humidity</p></td>
                                        <td><input type='text' class='data' value='${humidity}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Wind Speed</p></td>
                                        <td><input type='text' class='data' value='${windspeed}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Wind Direction</p></td>
                                        <td><input type='text' class='data' value='${winddirection}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Pressure</p></td>
                                        <td><input type='text' class='data' value='${pressure}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; UVI</p></td>
                                        <td><input type='text' class='data' value='${uvi}'/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            
                        <br>
                        <div class='container'>
                            <p><strong>Air Quality Data:</strong></p><br>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p>&rtrif; AQI</p></td>
                                        <td><input type='text' class='data' value='${aqi}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; PM 2.5</p></td>
                                        <td><input type='text' class='data' value='${pm25}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; PM 10</p></td>
                                        <td><input type='text' class='data' value='${pm10}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Ozone</p></td>
                                        <td><input type='text' class='data' value='${o3}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Carbon Monoxide</p></td>
                                        <td><input type='text' class='data' value='${co}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Nitrogen Dioxide</p></td>
                                        <td><input type='text' class='data' value='${no2}'/></td>
                                    </tr>
                                    <tr>
                                        <td><p>&rtrif; Sulfur Dioxide</p></td>
                                        <td><input type='text' class='data' value='${so2}'/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            
                        <br>
                        <div class='container'>
                            <p><strong>Map Visualization:</strong></p><br>
                            <div id='map' style='height: 250px; font-size: 11px; text-align: center;'>*Map loading...</div>
                        </div>
                    </main>
            
                    <script>
                        var map = L.map('map').setView([${latitude}, ${longitude}], 11);
                                
                        var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                            maxZoom: 18,
                            attribution: "Map Data & Imagery &copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> & <a href='https://www.mapbox.com/' target='_blank'>Mapbox</a>",
                            id: 'mapbox/dark-v10',
                            tileSize: 512,
                            zoomOffset: -1,
                            accessToken: 'pk.eyJ1IjoiYWxiaWU2NTQ0IiwiYSI6ImNsMjV1YmdmMTJkcTMza3BkZTdmbnY1bTcifQ.YpT_p-H1WckYccV8_HoLHg'
                        }).addTo(map);
                    </script>
            
                    <video playsinline autoplay muted loop src='https://content.kpnc.io/vid/suburb10.mp4' preload='metadata'></video>
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
                    let time = ((((date.getHours() * 60) + date.getMinutes()) * 60) + date.getSeconds()) * 0.1;
            
                    document.querySelector('video').addEventListener('loadeddata', function() {
                        this.playbackRate = 0.1;
                        this.currentTime = time;
                    }, false);
            
                    set(new Date());
            
                    setTimeout(() => window.location.href = window.location.href, 3600000);
                </script>
            
                <script>
                    if('geolocation' in navigator) {
                        if (!new URLSearchParams(window.location.search).has('nav')) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                var url = window.location.href;
                                if (url.indexOf('?') > -1){
                                    url += '&nav=' + position.coords.latitude + ',' + position.coords.longitude;
                                } else {
                                    url += '?nav=' + position.coords.latitude + ',' + position.coords.longitude;
                                }
                                window.location.href = url;
                            }, document.getElementById('hint').remove());
                        }
                    } else {
                        document.getElementById('hint').remove();
                    }
                </script>

                ${error}
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
