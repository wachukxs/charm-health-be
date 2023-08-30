
const swaggerAutognerator = require('swagger-autogen')();

try {
    // Get port from environment and store in Express.
    const port = parseInt(process.env.PORT, 10) || parseInt(process.env.LOCAL_PORT, 10) || 3051
    const doc = {
        info: {
            title: 'Charm Health Questionnaire API',
            description: 'Swagger documentation of our API endpoints.',
        },
        host: `localhost:${port}`,
        schemes: ['http', 'https'], // TODO: only included 'http' only if in localhost.
        definitions: {
            Answer: {
                id: 1,
                createdAt: "2022-11-25T18:41:24.044Z",
                updatedAt: "2022-11-25T18:41:24.044Z",
            },
            Institution: {
                id: 1,
            },
            Questionnaire: {
                id: 3,
                name: 'Blunt Trauma',
                code: 'CVFU723-UI8',
                createdAt: "2022-11-25T18:41:24.044Z",
                updatedAt: "2022-11-25T18:41:24.044Z",
            },
            Question: {
                id: 45,
                createdAt: "2022-11-25T18:41:24.044Z",
                updatedAt: "2022-11-25T18:41:24.044Z",
            },
            Patient: {
                id: 326,
                createdAt: "2022-11-25T18:41:24.044Z",
                updatedAt: "2022-11-25T18:41:24.044Z",
            }
        },

    };


    const outputFile = './swagger-output.json';
    const endpointsFiles = ['./web/app.js'];

    swaggerAutognerator(outputFile, endpointsFiles, doc);

} catch (error) {
    console.error('Error generating doc', error);
}