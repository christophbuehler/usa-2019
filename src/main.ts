import { configure, Base } from 'airtable';

class ProjectSundown {
    private apiKey = 'key8f9wEmgw2JcUkk';
    private baseName = 'appJOLaDquCu9LtLt';
    private base: Base;

    constructor(
        private map: any,
    ) {
        this.configure();
        this.getRoute();
    }

    private configure() {
        configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: this.apiKey,
        });
        this.base = Base(this.baseName);
    }

    private getRoute() {
        this.base('Route').select().eachPage(records => {
            console.log('records', records);
        });
    }
}

export default (map: any) => new ProjectSundown(map);