class ProjectSundown {
    constructor(map) {
        this.apiKey = 'key8f9wEmgw2JcUkk';
        this.baseName = 'appJOLaDquCu9LtLt';
        this.map = map;

        this.configure();
        this.loadRoute();
    }

    configure() {
        Airtable.configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: this.apiKey,
        });
        this.base = Airtable.base(this.baseName);
    }

    loadRoute() {
        this.base('Route').select({

        }).eachPage(records => {
            console.log(records);
        });
    }
}