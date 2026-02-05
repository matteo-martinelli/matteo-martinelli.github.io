/*
Unit Test: TrainingModel.js
*/

import { TrainingModel } from "../app/models/TrainingModel.js";

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

    if (url === '/_mvc/data/db/course-projects.json') {
        return {
            ok: true, 
            json: async () => (
                {  
                    "course-projects": [
                        {
                            "course_id": "ifts-sw-dev-with-ai",
                            "course_title": "IFTS Software Developer with AI Tools",
                            "provider": "IFOA", 
                            "promoter": null,
                            "language": "Italian",
                            "description": null,
                            "link": "https://www.ifoa.it/corsi/pd-digitale-tecnico-progettazione-e-lo-sviluppo-di-applicazioni-informatiche-software-developer-con-strumenti-ai/",
                            "role": "Trainer",
                            "from": "2026-01",
                            "to": "2026-10",
                            "total_taught_hours": {
                                "value": 84,
                                "unit": "hours"
                            },
                            "notes": null,
                            "editions": [
                                {
                                    "edition_id": "2026-ifts-sw-dev-w-ai-re",
                                    "start_date": "2026-01-07",
                                    "end_date": "2026-02-17",
                                    "delivery_mode": "in-person",
                                    "location": "Reggio nell'Emilia",
                                    "total_hours": {
                                        "value": 84,
                                        "unit": "hours"
                                    },
                                    "participants_count": 25,
                                    "client_type": "individuals",
                                    "client_name": null,
                                    "modules": [
                                        {
                                            "title": "Programming Logics and Object-Oriented Programming Basics",
                                            "topics": [
                                                "programming languages overview", 
                                                "UML diagrams",
                                                "OOP principles",
                                                "Java basics"
                                            ],
                                            "hours_taught": {
                                                "value": 36,
                                                "unit": "hours"
                                            },
                                            "start_date": "2026-01-07",
                                            "end_date": "2026-01-21"
                                        },
                                        {
                                            "title": "Application Development and Data Analysis with Python", 
                                            "topics": [
                                                "Python basic types", 
                                                "Python built-ins",
                                                "Python I/O",
                                                "Python error handling",
                                                "Python OOP",
                                                "Python Dunder Methods",
                                                "Pandas Series",
                                                "Pandas Dataframes",
                                                "Matplotlib plots"
                                            ],
                                            "hours_taught": {
                                                "value": 48,
                                                "unit": "hours"
                                            },
                                            "start_date": "2026-01-21",
                                            "end_date": "2026-02-17"
                                        }
                                    ], 
                                    "feedback": {
                                        "averageRating": null,
                                        "reviewsCount": null
                                    }
                                }
                            ]
                        },
                        {   
                            "course_id": "mecfuture-transition-pro-w-training",
                            "course_title": "Information Systems Innovation: IoT, Machine Learning, and Artificial Intelligence",
                            "provider": "W-Training", 
                            "promoter": null,
                            "language": "Italian",
                            "description": null, 
                            "link": "https://www.wtraining.it/corsi/mechanical-future-competence-professional-growth/", 
                            "role": "Trainer",
                            "from": "2025-12",
                            "to": "2025-12",
                            "total_taught_hours": {
                                "value": 24,
                                "unit": "hours"
                            },
                            "notes": null,
                            "editions": [
                                {
                                    "edition_id": "2025-mecfuture-...-re",
                                    "start_date": "2025-12-02",
                                    "end_date": "2025-12-10",
                                    "delivery_mode": "remote",
                                    "location": "Reggio nell'Emilia",
                                    "total_hours": {
                                        "value": 24,
                                        "unit": "hours"
                                    },
                                    "participants_count": 8,
                                    "client_type": "professionals",
                                    "client_name": null,
                                    "modules": [
                                        {
                                            "title": "Machine Learning and Artificial Intelligence for ERP, MES, CRM, and WMS Optimization",
                                            "topics": [
                                                "intro to AI",
                                                "supervised and unsupervised learning",
                                                "performance evaluation",
                                                "linear and non-linear models",
                                                "hands-on examples"
                                            ],
                                            "hours_taught": {
                                                "value": 12,
                                                "unit": "hours"
                                            },
                                            "start_date": "2025-12-02",
                                            "end_date": "2025-12-10"
                                        }
                                    ],
                                    "feedback": {
                                        "averageRating": null,
                                        "reviewsCount": null
                                    }
                                }
                            ]
                        }
                    ]
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
    console.log('\n--- Starting test for TrainingModel ---');

    var testPassed = true;

    const model = new TrainingModel();
    console.log('Initial state of model.trainingProjects: ', model.trainingProjects);

    // Testing load()
    await model.load();

    console.log('Inspecting model.trainingProjects: ', model.trainingProjects);
    console.log('Inspecting model.totalTaughtHours: ', model.totalHoursTaught);

    if (model.trainingProjects == [] || model.totalHoursTaught === null) {
        testPassed = false;
        console.log('model.totalTaughtHours is', model.totalHoursTaught);
    }

    // Testing getAllTrainingProjects()
    const allData = model.getAllTrainingProjects();
    console.log('Data from model.getAll(): ', allData);

    if (allData == []) {
        testPassed = false;
        console.log('model.getAll() is', allData);
    }

    // Testing getTotalTaughtHours
    var totalTaughtHours = model.getTotalTaughtHours();
    console.log('Data from model.getTotalTaughtHours(): ', totalTaughtHours);
    console.log('Type of model.getTotalTaughtHours(): ', typeof(totalTaughtHours));

    if (totalTaughtHours === null) {
        testPassed = false;
        console.log('model.getTotalTaughtHours() is', totalTaughtHours);
    }

    if (testPassed) {
        console.log('✅ Test PASSED');
    } else {
        console.log('❌ Test FAILED');
    }

    console.log('--- Test finished ---');
}

runTest();