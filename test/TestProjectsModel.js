/*
Unit Test: ProjectsModel.js
*/

import { ProjectsModel } from "../app/models/ProjectsModel.js";

// Mocking a fetch function
global.fetch = async (url) => {
    console.log('[Mock fetch] Intercepted request to ${url}');

    if (url === '/data/db/fake-industrial-projects.json') {
        return {
            ok: true, 
            json: async () => ([
                {id: 'proj1', name: 'Fake Project 1'},
                {id: 'proj2', name: 'Fake Project 2'}
            ]),
        };
    }

    if (url === '/data/db/industrial-projects.json') {
        return {
            ok: true, 
            json: async () => (
                {
                    "dxf2plc-coordinates-extractor": {
                        "title": "DXF2PLC Coordinates Extractor 🤖",
                        "links": {
                            "presentation-link": "/assets/docs/dxf2plc/dxf2plc-presentation-website_version.pdf",
                            "essay-link": "/assets/docs/dxf2plc/dxf2plc-essay-website_version.pdf"
                        }
                    },
                    "assembly-line-redesign": {
                        "title": "Assembly Line Redesign 🧑🏽‍🏭",
                        "links": {
                            "presentation-link": "/assets/docs/assembly_line_redesign/assembly_line_redesign-presentation-website_version.pdf"
                        }
                    },
                    "intelligent-poka-yoke": {
                        "title": "Intelligent Poka Yoke 📹",
                        "links":{
                            "presentation-link": "/assets/docs/intelligent-poka-yoke/intelligent_poka_yoke-presentation-website_version.pdf",
                            "scientific-article-link": "https://www.mdpi.com/2076-3417/12/21/11071"
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
    console.log('\n--- Starting test for ProjectsModel ---');

    const model = new ProjectsModel();
    console.log('Initial state of model.projects: ', model.projects);

    // Testing load()
    await model.load();

    const allData = model.getAll();
    console.log('Data from model.getAll(): ', allData);
    console.log('Final State of model.projects: ', model.projects);
    console.log('Number of links in the first project: ', Object.keys(model.projects[0]['intelligent-poka-yoke'].links).length);

    var passed = true;

    if (Object.keys(model.projects[0]['intelligent-poka-yoke'].links).length !== 2) {
        passed = false;
    }

    if (model.projects.length <= 0) {
        passed = false;
    }

    if (passed) {
        console.log('✅ Test PASSED: array populated and checks verified');
    } else {
        console.log('❌ Test FAILED: array is still empty, some checks did not passed!');
    }

    console.log('--- Test finished ---');
}

runTest();
