import { PublicationsModel } from "../app/models/PublicationsModel.js";

// Mocking a fetch function
global.fetch = async (url) => {
    console.log('[Mock fetch] Intercepted request to ${url}');

    if (url === '/data/projects.json') {
        return {
            ok: true, 
            json: async () => ([
                {id: 'proj1', name: 'Fake Project 1'},
                {id: 'proj2', name: 'Fake Project 2'}
            ]),
        };
    }

    if (url === '/data/db/publications.json') {
        return {
            ok: true, 
            json: async () => (
                {
                    "scientific-articles": {
                        "a-multi-simulation-bridge-for-iot-digital-twins": {
                            "type":"preprint",
                            "title":"A multi simulation bridge for IoT Digital Twins",
                            "authors":"M. Picone, S. Burattini, M. Melloni, P. Talasila, D. Ziglioli, M. Martinelli, N. Bicocchi, A. Ricci, P. G. Larsen",
                            "publisher":"Arxiv",
                            "journal-issue-conference":"Arxiv Preprint",
                            "year":"2025",
                            "reference-doi-link":"https://doi.org/10.48550/arXiv.2510.08164"
                        },
                        "on-device-ai-and-digital-twins-a-synergistic-approach-towards-cps": {
                            "type":"journal",
                            "title":"On-device AI and Digital Twins: a synergistic approach towards Cyber-Physical Systems",
                            "authors":"A. Barbone, N. Bicocchi, M. Martinelli, R. Morandi, M. Picone",
                            "publisher":"Elsevier",
                            "journal-issue-conference":"Future Generation Computers Systems",
                            "year":"2025",
                            "reference-doi-link":"https://doi.org/10.1016/j.future.2025.108068"
                        },
                        "the-two-faces-of-interoperability-bridging-cyber-and-phyisical-spaces-with-digital-twins": {
                            "type":"conference",
                            "title":"The two faces of Interoperability: bridging Cyber and Phyisical Spaces with Digital Twins",
                            "authors":"M. Picone, M. Martinelli, S. Burattini, A. Giulianelli, A. Ricci",
                            "publisher":"IEEE",
                            "journal-issue-conference":"2025 21st International Conference on Distributed Computing in Smart Systems and the Internet of Things (DCOSS-IoT)",
                            "year":"2025",
                            "reference-doi-link":"https://doi.org/10.1109/DCOSS-IoT65416.2025.00078"
                        }
                    }
                }
            ),
        };
    }

    return {
        ok: false, 
        statusText: 'Not Found'
    }
}

async function runTest() {
    // TODO: Follow the TestTrainingModel.js setup: first test fields, then methods.
    console.log('\n--- Starting test for PublicationModel ---');

    const model = new PublicationsModel();
    console.log('Initial state of model.publications: ', model.publications);

    // Testing load()
    await model.load();

    const allData = model.getAll();
    console.log('Data from model.getAll(): ', allData);
    console.log('Final State of model.publications: ', model.publications);

    if (model.publications.length > 0) {
        console.log('✅ Test PASSED: array populated');
    } else {
        console.log('❌ Test FAILED: array is still empty');
    }

    console.log('--- Test finished ---');
}

runTest();