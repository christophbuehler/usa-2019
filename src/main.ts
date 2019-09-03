import { Base } from "airtable";

declare const Airtable: any;
declare const google: any;

class ProjectSundown {
    private apiKey = 'key8f9wEmgw2JcUkk';
    private baseName = 'appJOLaDquCu9LtLt';
    private base: Base;
    private airtable: Airtable;
    private route: any[];
    private pois: any[];

    constructor(
        private map: any,
    ) {
        this.configure();
        this.getRoute();
        this.getPois();
    }

    private configure() {
        this.airtable = new Airtable({
            endpointUrl: 'https://api.airtable.com',
            apiKey: this.apiKey,
        });

        this.base = this.airtable.base(this.baseName);
    }

    private getPois() {
        const pois: any[] = [];
        this.base('POIS').select()
            .eachPage((records: any[], fetchNextPage) => (
                pois.push(...records),
                fetchNextPage()
            ))
            .then(() => this.pois = pois)
            .then(() => {
                const geocoder = new google.maps.Geocoder();

                this.pois.forEach(rec => {
                    const title = rec.get('Title');
                    geocoder.geocode(
                        { 'address': title },
                        (results: any, status: any) => {
                        if (status !== google.maps.GeocoderStatus.OK) return false;
                        const newAddress = results[0].geometry.location;
                        const latlng = new google.maps.LatLng(
                            parseFloat(newAddress.lat()),
                            parseFloat(newAddress.lng()),
                        );
                        const marker = new google.maps.Marker({
                            position: latlng,
                            map: this.map,
                            title,
                        });
                    })
                });
            });

        
    }

    private getRoute() {
        const route: any[] = [];
        this.base('Route').select()
            .eachPage((records: any[], fetchNextPage) => (
                route.push(...records),
                fetchNextPage()
            ))
            .then(() => this.route = route)
            .then(() => this.drawRoute());
    }

    private drawRoute() {
        const coords = this.route
            .sort((a, b) => ~~(~~new Date(a.get('Date from')) - ~~new Date(b.get('Date from'))))
            .map(
                r => ({ lat: r.get('Lat'), lng: -r.get('Lng') }),
            ).filter(({ lat, lng }) => lat && lng);
        const line = new google.maps.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: '#ff0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        line.setMap(this.map);
        const linePlane = new google.maps.Polyline({
            path: [
                coords[0],
                coords[coords.length - 1],
            ],
            geodesic: true,
            strokeColor: '#bbbbbb',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        linePlane.setMap(this.map);
    }
}

export default (map: any) => new ProjectSundown(map);