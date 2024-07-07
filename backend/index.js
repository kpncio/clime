// Expects: Nothing:
// https://app.kpnc.io/clime/api/

async function handleRequest(request) {
	const { searchParams } = new URL(request.url);
    let nav = searchParams.get('nav');
    let or = searchParams.get('or');

    let latitude = String(request.cf.latitude);
    let longitude = String(request.cf.longitude);
    let query = latitude + ',' + longitude;

    if (nav != null) {
        if (!/[a-zA-Z]/g.test(nav)) {
            latitude = nav.split(',')[0]; longitude = nav.split(',')[1];
        } else {
            latitude = null; longitude = null;
        }

        query = nav;
    }

	const url = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${query}&aqi=yes`, {
            headers: {
                'content-type': 'application/json; charset=UTF-8',
            },
        });
	const data = await url.json();

    const urltoo = await fetch(
        `https://api.weatherapi.com/v1/astronomy.json?key=${WEATHER_API_KEY}&q=${query}`, {
            headers: {
                'content-type': 'application/json; charset=UTF-8',
            },
        });
	const datatoo = await urltoo.json();

    if (latitude == null) { latitude = String(data.location?.lat) }
    if (longitude == null) { longitude = String(data.location?.lon) }

    const locales = { 'Afghanistan': 'AF', 'Aland Islands': 'AX', 'Albania': 'AL', 'Algeria': 'DZ', 'American Samoa': 'AS', 'Andorra': 'AD', 'Angola': 'AO', 'Anguilla': 'AI', 'Antarctica': 'AQ', 'Antigua and Barbuda': 'AG', 'Argentina': 'AR', 'Armenia': 'AM', 'Aruba': 'AW', 'Australia': 'AU', 'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Barbados': 'BB', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bermuda': 'BM', 'Bhutan': 'BT', 'Bolivia': 'BO', 'Netherlands Antilles': 'BQ', 'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW', 'Bouvet Island': 'BV', 'Brazil': 'BR', 'British Indian Ocean Territory': 'IO', 'Brunei Darussalam': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Cambodia': 'KH', 'Cameroon': 'CM', 'Canada': 'CA', 'Cape Verde': 'CV', 'Cayman Islands': 'KY', 'Central African Republic': 'CF', 'Chad': 'TD', 'Chile': 'CL', 'China': 'CN', 'Christmas Island': 'CX', 'Cocos (Keeling) Islands': 'CC', 'Colombia': 'CO', 'Comoros': 'KM', 'Congo': 'CG', 'Democratic Republic of Congo': 'CD', 'Cook Islands': 'CK', 'Costa Rica': 'CR', 'Cote d\'Ivoire': 'CI', 'Croatia': 'HR', 'Cuba': 'CU', 'Curacao': 'CW', 'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Djibouti': 'DJ', 'Dominica': 'DM', 'Dominican Republic': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV', 'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Falkland Islands': 'FK', 'Faroe Islands': 'FO', 'Fiji': 'FJ', 'Finland': 'FI', 'France': 'FR', 'French Guiana': 'GF', 'French Polynesia': 'PF', 'French Southern Territories': 'TF', 'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH', 'Gibraltar': 'GI', 'Greece': 'GR', 'Greenland': 'GL', 'Grenada': 'GD', 'Guadeloupe': 'GP', 'Guam': 'GU', 'Guatemala': 'GT', 'Guernsey': 'GG', 'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY', 'Haiti': 'HT', 'Heard Island and McDonald Islands': 'HM', 'Vatican City': 'VA', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Isle of Man': 'IM', 'Israel': 'IL', 'Italy': 'IT', 'Jamaica': 'JM', 'Japan': 'JP', 'Jersey': 'JE', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kiribati': 'KI', 'North Korea': 'KP', 'South Korea': 'KR', 'Kuwait': 'KW', 'Kyrgyzstan': 'KG', 'Lao People\'s Democratic Republic': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR', 'Libya': 'LY', 'Liechtenstein': 'LI', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Macao': 'MO', 'Macedonia': 'MK', 'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML', 'Malta': 'MT', 'Marshall Islands': 'MH', 'Martinique': 'MQ', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mayotte': 'YT', 'Mexico': 'MX', 'Federated States of Micronesia': 'FM', 'Moldova': 'MD', 'Monaco': 'MC', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Montserrat': 'MS', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Netherlands': 'NL', 'New Caledonia': 'NC', 'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Niue': 'NU', 'Norfolk Island': 'NF', 'Northern Mariana Islands': 'MP', 'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palau': 'PW', 'Palestine': 'PS', 'Panama': 'PA', 'Papua New Guinea': 'PG', 'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH', 'Pitcairn': 'PN', 'Poland': 'PL', 'Portugal': 'PT', 'Puerto Rico': 'PR', 'Qatar': 'QA', 'Reunion and associated islands': 'RE', 'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW', 'Saint Barthelemy': 'BL', 'Saint Helena': 'SH', 'Saint Kitts and Nevis': 'KN', 'Saint Lucia': 'LC', 'Saint Martin (French part)': 'MF', 'Saint Pierre and Miquelon': 'PM', 'Saint Vincent and the Grenadines': 'VC', 'Samoa': 'WS', 'San Marino': 'SM', 'Sao Tome and Principe': 'ST', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS', 'Seychelles': 'SC', 'Sierra Leone': 'SL', 'Singapore': 'SG', 'Sint Maarten (Dutch part)': 'SX', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Solomon Islands': 'SB', 'Somalia': 'SO', 'South Africa': 'ZA', 'South Georgia and South Sandwich Islands': 'GS', 'South Sudan': 'SS', 'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD', 'Suriname': 'SR', 'Svalbard and Jan Mayen': 'SJ', 'Swaziland': 'SZ', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syrian Arab Republic': 'SY', 'Taiwan': 'TW', 'Tajikistan': 'TJ', 'Tanzania': 'TZ', 'Thailand': 'TH', 'Timor-Leste': 'TL', 'Togo': 'TG', 'Tokelau': 'TK', 'Tonga': 'TO', 'Trinidad and Tobago': 'TT', 'Tunisia': 'TN', 'Turkey': 'TR', 'Turkmenistan': 'TM', 'Turks and Caicos Islands': 'TC', 'Tuvalu': 'TV', 'Uganda': 'UG', 'Ukraine': 'UA', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB', 'United States of America': 'US', 'United States Minor Outlying Islands': 'UM', 'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vanuatu': 'VU', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Virgin Islands': 'VG', 'Virgin Islands of the United States': 'VI', 'Wallis and Futuna': 'WF', 'Western Sahara': 'EH', 'Yemen': 'YE', 'Zambia': 'ZM', 'Zimbabwe': 'ZW'};

    let city = null;
    let region = null;
    let country = null;
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
    
    let override = country;
    if (override == null) { override = request.cf.country }
    if (or != null) { override = or }

    let location = data.location?.name == null ? '?' : data.location.name;

    let satellite = timezone.includes("America/");

    let index = null;
    if (data.current?.air_quality != null) {
        index = data.current.air_quality['us-epa-index'];
    }

    let temperature = null;
    switch(override) {
        case 'US':
            temperature = data.current?.temp_f == null ? '?' : data.current.temp_f + '°F';
            break;
        default:
            temperature = data.current?.temp_c == null ? '?' : data.current.temp_c + '°C';
            break;
    }

    let feelslike = null;
    switch(override) {
        case 'US':
            feelslike = data.current?.feelslike_f == null ? '?' : data.current.feelslike_f + '°F';
            break;
        default:
            feelslike = data.current?.feelslike_c == null ? '?' : data.current.feelslike_c + '°C';
            break;
    }

    let windspeed = data.current?.wind_kph == null ? '?' : data.current.wind_kph;
    switch(override) {
        case 'US':
        case 'GB':
            windspeed = data.current?.wind_mph == null ? '?' : data.current.wind_mph + ' mph'
            break;
        case 'CA': case 'IE': case 'DE': case 'PL': case 'BE': case 'FR': case 'MD': case 'IL': case 'AU':
        case 'AT': case 'CH': case 'IT': case 'SI':  case 'TR': case 'ES': case 'PT': case 'JO':
            windspeed = windspeed == '?' ? '?' : windspeed + ' km/h';
            break;
        case 'MT':
            windspeed = windspeed == '?' ? '?' : (Math.round(((windspeed / 1.852) + Number.EPSILON) * 10) / 10) + ' Knots';
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
            windspeed = windspeed == '?' ? '?' : (Math.round(((windspeed / 3.6) + Number.EPSILON) * 10) / 10) + ' m/s';
            break;
    }

    let pressure = data.current?.pressure_mb == null ? '?' : data.current.pressure_mb;
    switch(override) {
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
    
    let icon = data.current?.condition?.icon == null ? '000' : data.current.condition.icon.replace('.png', '').split('/');
    icon = icon[icon.length - 2] + '/' + icon[icon.length - 1];
    let condition = data.current?.condition?.text == null ? '?' : data.current.condition.text;
    let humidity = data.current?.humidity == null ? '?' : data.current.humidity + '%';
    let winddegree = data.current?.wind_degree == null ? null : data.current.wind_degree;
    let windheading = data.current?.wind_dir == null ? null : data.current.wind_dir;
    let winddirection = winddegree == null ? '?' : winddegree + '°';
    winddirection += windheading == null ? '' : windheading;
    let uvi = data.current?.uv == null ? '?' : data.current.uv + ' of 10';

    let aqi = index == null ? '?' : index + ` (${epa[index]})`;
    let pm25 = data.current?.air_quality?.pm2_5 == null ? '?' : (Math.round((data.current.air_quality.pm2_5 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let pm10 = data.current?.air_quality?.pm10 == null ? '?' : (Math.round((data.current.air_quality.pm10 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let o3 = data.current?.air_quality?.o3 == null ? '?' : (Math.round((data.current.air_quality.o3 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let co = data.current?.air_quality?.co == null ? '?' : (Math.round((data.current.air_quality.co + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let no2 = data.current?.air_quality?.no2 == null ? '?' : (Math.round((data.current.air_quality.no2 + Number.EPSILON) * 10) / 10) + ' μg/m³';
    let so2 = data.current?.air_quality?.so2 == null ? '?' : (Math.round((data.current.air_quality.so2 + Number.EPSILON) * 10) / 10) + ' μg/m³';

    let sunrise = datatoo.astronomy?.astro?.sunrise == null ? '?' : datatoo.astronomy.astro.sunrise;
    let sunset = datatoo.astronomy?.astro?.sunset == null ? '?' : datatoo.astronomy.astro.sunset;
    let moonrise = datatoo.astronomy?.astro?.moonrise == null ? '?' : datatoo.astronomy.astro.moonrise;
    let moonset = datatoo.astronomy?.astro?.moonset == null ? '?' : datatoo.astronomy.astro.moonset;
    let phase = datatoo.astronomy?.astro?.moon_phase == null ? '?' : datatoo.astronomy.astro.moon_phase;
    let illumination = datatoo.astronomy?.astro?.moon_illumination == null ? '?' : datatoo.astronomy.astro.moon_illumination;

    let agency = null;
    let series = null;
    let designator = null;
    let sector = null;
    let resolution = null;

    switch(country) {
        case 'MX':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/mex';
            resolution = '4000x4000';
            break;
        case 'CA':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/can';
            resolution = '9000x4500';
            break;
        case 'KY': case 'BZ': case 'GT': case 'SV': case 'HN': case 'CR': case 'PA': case 'NI':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/cam';
            resolution = '4000x4000';
            break;
        case 'PR':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/pr';
            resolution = '2400x2400';
            break;
        case 'BS': case 'CU': case 'JM': case 'TC': case 'HT': case 'DM': case 'DO': case 'VG': case 'GP': case 'AI': case 'MQ': case 'VC': case 'GD': case 'BB':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/taw';
            resolution = '7200x4320';
            break;
        case 'AW': case 'CW': case 'TT': case 'VE': case 'GY': case 'SR': case 'GF': case 'CO': case 'EC': case 'PE': case 'BR':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/nsa';
            resolution = '7200x4320';
            break;
        case 'BO': case 'CL': case 'PY': case 'UY': case 'AR': case 'FK': case 'GS':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/ssa';
            resolution = '7200x4320';
            break;
        default:
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'CONUS';
            resolution = '5000x3000';
            break;
    }

    if(country == 'US') {
        switch(region) {
            case 'Indiana': case 'Ohio': case 'Michigan':
            agency = 'NOAA/STAR'; series = 'GOES';
            designator = '16'; sector = 'SECTOR/cgl';
            resolution = '2400x2400';
            break;
            case 'Florida': case 'Georgia': case 'North Carolina': case 'South Carolina':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '16'; sector = 'SECTOR/se';
                resolution = '2400x2400';
                break;
            case 'Louisiana': case 'Arkansas': case 'Mississippi': case 'Alabama': case 'Tennessee':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '16'; sector = 'SECTOR/smv';
                resolution = '2400x2400';
                break;
            case 'Texas': case 'Oklahoma':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '16'; sector = 'SECTOR/sp';
                resolution = '2400x2400';
                break;
            case 'Utah': case 'Arizona': case 'Colorado': case 'New Mexico':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '16'; sector = 'SECTOR/sr';
                resolution = '2400x2400';
                break;
            case 'New York': case 'Maine': case 'Vermont': case 'New Hampshire': case 'Massachusetts': case 'Connecticut': case 'Rhode Island':
            case 'Pennsylvania': case 'West Virginia': case 'Virginia': case 'Maryland': case 'New Jersey': case 'Delaware':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '16'; sector = 'SECTOR/ne';
                resolution = '2400x2400';
                break;
            case 'Kansas': case 'Missouri': case 'Illinois': case 'Iowa': case 'Minnesota':
            case 'Wisconsin': case 'North Dakota': case 'South Dakota': case 'Nebraska':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '16'; sector = 'SECTOR/umv';
                resolution = '2400x2400';
                break;
            case 'Montana': case 'Wyoming':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '16'; sector = 'SECTOR/nr';
                resolution = '2400x2400';
                break;
            case 'California': case 'Nevada':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '18'; sector = 'SECTOR/psw';
                resolution = '2400x2400';
                break;
            case 'Washington': case 'Oregon': case 'Idaho':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '18'; sector = 'SECTOR/pnw';
                resolution = '2400x2400';
                break;
            case 'Alaska':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '18'; sector = 'SECTOR/cak';
                resolution = '2400x2400';
                break;
            case 'Hawaii':
                agency = 'NOAA/STAR'; series = 'GOES';
                designator = '18'; sector = 'SECTOR/hi';
                resolution = '2400x2400';
                break;
            default: break;
        }
    }

    let values = {
        "location": {
            "lat": latitude,
            "long": longitude,
            "city": city,
            "region": region,
            "country": country,
            "zone": timezone,
            "data": location
        }, "weather": {
            "icon": icon,
            "condition": condition,
            "temperature": temperature,
            "feelslike": feelslike,
            "humidity": humidity,
            "windspeed": windspeed,
            "winddirection": winddirection,
            "pressure": pressure,
            "uvi": uvi
        }, "airquality": {
            "aqi": aqi,
            "pm25": pm25,
            "pm10": pm10,
            "o3": o3,
            "co": co,
            "no2": no2,
            "so2": so2
        }, "astronomy": {
            "sunrise": sunrise,
            "sunset": sunset,
            "moonrise": moonrise,
            "moonset": moonset,
            "phase": phase,
            "illumination": illumination
        }, "satellite": {
            "access": satellite,
            "agency": agency,
            "series": series,
            "designator": designator,
            "sector": sector,
            "resolution": resolution
        }
    };

    return new Response(JSON.stringify(values), {
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json; charset=UTF-8',
            'status': 200
        }, status: 200
    });
}

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
});
