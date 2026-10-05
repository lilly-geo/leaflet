const map = L.map('map', { 
    center: [13.056039, 80.23819], // [latitude, longitude]
    zoom: 17 // 0 = whole world, ~18-19 = street level
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);   // on by default

const topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const radar = L.tileLayer.wms('https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi', {
    layers: 'nexrad-n0r',
    format: 'image/png',
    transparent: true,
    attribution: 'Weather data &copy; Iowa Environmental Mesonet'
}).addTo(map);

const restaurant = [
    { name: "Maazi Kitchen",  coords: [13.05663662343725, 80.23960747609695], note: "Serves South Indian Food" },
    { name: "Hungry Panda",           coords: [13.056621597907933, 80.23964033353423] },
    { name: "Kavitha Cool Bar",         coords: [13.05655600581036, 80.23960515910744] },
]

const high_schools = [
    {name: "St. Joseph's High School", coords: [13.056901151015445, 80.2370278887584]},
    {name: "Chennai Girls' Higher Secondary School", coords: [13.05707038439074, 80.23870724396556]},
]

// These may or may not be "landmarks", but a square and a garage are hard to miss 
const public_bathroom = [
    { name: "Lake Area Public Restroom",   coords: [13.055728587992597, 80.2379280834614] },
    { name: "364Q+G46 Public Restroom",  coords: [13.05633956384931, 80.23776461083567] }
];

function svgIcon(color) {
    return L.divIcon({
        className: 'poi-icon',
        html: `
            <svg width="25" height="32" viewBox="0 0 25 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.5 12.5 32 12.5 32S25 21.5 25 12.5C25 5.6 19.4 0 12.5 0z"
                    fill="${color}" stroke="#1c2b24" stroke-width="1"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
            </svg>`,
        iconSize:    [25, 32],  // match SVG's width/height
        iconAnchor:  [12, 32],  // the pinpoint — where the actual coordinate is at
        popupAnchor: [0, -28]   // where a popup opens relative to iconAnchor
    });
}

const RESTAURANT_COLOR    = '#a6531c';
const HS_COLOR = '#1fbf78';
const BATHROOM_COLOR    = '#1f78bf'

const fourthcross = [
    [13.056833066772995, 80.23959930534384],
    [13.05666544429888, 80.23958548017042], //
    [13.056473362980766, 80.23958010527305],
    [13.05631397797053, 80.23957407030306],
    [13.05620227775659, 80.23956736478085],
    [13.055358428949305, 80.23952307375232],
    [13.055142483776924, 80.23951014271756],
    [13.055036310664628, 80.2395046008455],
    [13.05473213397916, 80.23949168255713],
];

const corporationschool = [
    [13.057950835196447, 80.23732902191622],
    [13.057804562027275, 80.23741715687538], //
    [13.057804562027275, 80.23741715687538],
    [13.05739436072134, 80.23749549906131],
    [13.05717156232166, 80.2375373670749],
    [13.057068957754668, 80.23755463392544],
    [13.05698990174775, 80.23758744094144],
    [13.056966353145066, 80.23773420917095],
    [13.056957942929268, 80.23820041413526],
    [13.05694448658341, 80.23848359048398],
    [13.05694953271319, 80.23859927838252],
    [13.056927666150056, 80.23887382130596],
    [13.056920106515337, 80.23918682142212],
    [13.056898261587584, 80.2395949508423],
    [13.056882970137014, 80.24001205013984],
    [13.056869863178623, 80.24045605906947],
    [13.056865494192344, 80.24089109812174],
    [13.05683709577962, 80.24140462360096],
    [13.056838055623631, 80.24169184488545],
    [13.056843135992516, 80.24202583389184],
    [13.05683548507976, 80.24234981000299],
    [13.056858437819185, 80.24246761950577],
]

// polygon with holes
// make sure the exterior is counterclockwise and all interiors are clockwise
const tennisstadium = [
    // outer ring
    [
        [13.056584001298003, 80.2387869144055],
        [13.05645241029128, 80.23863832285687],
        [13.056020039347178, 80.23861516573243],
        [13.055771895680989, 80.23884287745628],
        [13.055760616417519, 80.23911111414795],
        [13.055978682086785, 80.23935619371515],
        [13.056414812847917, 80.23938514012072],
        [13.056555803231024, 80.23924619737396],
        [13.056606559749246, 80.23925005689472],
        [13.056696793533678, 80.23916707719873],
        [13.05671747210464, 80.23888726194483],
        [13.056634757810434, 80.23879077392624],
    ],
    // inner tennis court
    [
        [13.056433611570318, 80.23887954290333],
        [13.056427971953742, 80.23914006055352],
        [13.055989961340305, 80.23912269271018],
        [13.056006880219613, 80.23885252625814]
    ],
]

// multipolygon
const tenniscourts = 
[
    // polygon 1
    [
        [
            [13.056633558252088, 80.23810407219413],
            [13.05563546166641, 80.23804908994109],
            [13.055615399612059, 80.23838546506684],
            [13.056606240245912, 80.23844038345128]
        ]
    ],
    // polygon 2
    [
        [
            [13.055216671655115, 80.23791945847215],
            [13.054907788414575, 80.23790065596462],
            [13.054884476456227, 80.23841430628391],
            [13.055165052380344, 80.23843396345089]
        ]
    ]
]

// 1. Make 3 layer groups for the points

const RestaurantLayer = L.layerGroup(
  restaurant.map(f => L.marker(f.coords, { icon: svgIcon(RESTAURANT_COLOR) }) // construct a new array
  .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const HSLayer = L.layerGroup(
  high_schools.map(f => L.marker(f.coords, { icon: svgIcon(HS_COLOR) }) // construct a new array
  .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const BathroomLayer = L.layerGroup(
  public_bathroom.map(f => L.marker(f.coords, { icon: svgIcon(BATHROOM_COLOR) }) // construct a new array
  .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

// 2. Create one layer group for all streets
const linesLayer = L.layerGroup([
    L.polyline(fourthcross, { color: '#a6531c', weight: 4 }),
    L.polyline(corporationschool, { color: '#a6531c', weight: 4 }),
]);

// 3. Create one layer group for all buildings
const polygon_style = {color: '#1f6f78', fillColor: '#1f6f78', fillOpacity: 0.25};

const buildingLayer = L.layerGroup([
    L.polygon(tenniscourts, polygon_style).bindTooltip('Tennis Courts', { direction: 'top', offset: [0, -8]}),
    L.polygon(tennisstadium, polygon_style).bindTooltip('SDAT Tennis Stadium', { direction: 'top', offset: [0, -8]}),
])

// 4. Create the control with all layers
L.control.layers(
    { "Streets": streets, "Topographic": topo, "Satellite": satellite, "OpenStreetMap": osm },
    { "Restaurant": RestaurantLayer, "High Schools": HSLayer, "Bathrooms": BathroomLayer, 
        "Streets": linesLayer, "Buildings": buildingLayer, "Radar": radar }
).addTo(map);
