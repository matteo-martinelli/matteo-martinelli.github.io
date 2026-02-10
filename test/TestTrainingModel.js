/*
Unit Test: TrainingModel.js
*/

import { TrainingModel } from "../app/models/TrainingModel.js";


// TODO: Move the mocked data into a separated file; 
// TODO: compute standard fields for the mocked data (i.e., for totalHoursTaught and totaStudentsTaught).
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

    if (url === '/data/db/course-projects.json') {
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

    const model = new TrainingModel();
    console.log('Testing the class', model.constructor.name);
    console.log('Fields under inspection are:');
    Object.keys(model).forEach(field => console.log('🔹', field));
    // console.log('Methods under inspection are:');
    // Object.keys(model).forEach(field => console.log('🔹', field));
    
    var testPassed = true;

    // ### Inspecting fields - START ###
    console.log('\n🔍 Inspecting fields', 
        '\n🔸 Inspecting model.trainingProjects; intial state:', model.trainingProjects, 
        '\n🔸 Inspecting model.totalHoursTaught; intial state:', model.totalHoursTaught, 
        '\n➡️  Calling model.load() to fill model.trainingProjects'
    );
    
    // Testing load()
    await model.load();
    
    // Inspecting model.trainingProjects - START
    console.log(
        '🆗 model.trainingProjects has been loaded;',
        '\n💠 Checking model.trainingProjects after load: ',
        '\n🔹content is', model.trainingProjects,
        '\n🔹content type is', typeof(model.trainingProjects),
        '\n🔍 Check its correctness!'
    );
    // Field populated?
    if (model.trainingProjects == []) {
        testPassed = false;
        console.log('❗model.trainingProjects is still empty❗');
    } else {
        console.log('❇️  No problems about the values so far!');
    }
    // Field of the correct type? 
    if (typeof(model.trainingProjects) != 'object') {
        testPassed = false;
        console.log(
            '❗model.trainingProjects is not an object!', 
            'Received type is', typeof(model.trainingProjects), '; check it out❗'
        );
    } else {
        console.log('❇️  No problems about the type so far!');
    }

    // Inspecting model.totalHoursTaught
    console.log(
        '\n💠 Checking model.totalHoursTaught after load: ',
        '\n🔹content is', model.totalHoursTaught,
        '\n🔹content type is', typeof(model.totalHoursTaught),
        '\n🔍 Check its correctness!'
    );
    // Field populated?
    if (model.totalHoursTaught == null) {
        testPassed = false;
        console.log('❗model.totalHoursTaught is still empty❗');
    } else {
        console.log('❇️  No problems about the values so far!');
    }
    // Field of the correct type? 
    if (typeof(model.totalHoursTaught) != 'number') {
        testPassed = false;
        console.log(
            '❗model.totalHoursTaught is not a number!', 
            'Received type is', typeof(model.totalHoursTaught), '; check it out❗'
        );
    } else {
        console.log('❇️  No problems about the type so far!');
    }

    // Inspecting model.totalStudentsTaught
    console.log(
        '\n💠 Checking model.totalStudentsTaught after load: ',
        '\n🔹content is', model.totalStudentsTaught,
        '\n🔹content type is', typeof(model.totalStudentsTaught),
        '\n🔍 Check its correctness!'
    );
    // Field populated?
    if (model.totalStudentsTaught == null) {
        testPassed = false;
        console.log('❗model.totalStudentsTaught is still empty❗');
    } else {
        console.log('❇️  No problems about the values so far!');
    }
    // Field of the correct type? 
    if (typeof(model.totalStudentsTaught) != 'number') {
        testPassed = false;
        console.log(
            '❗model.totalStudentsTaught is not a number!', 
            'Received type is', typeof(model.totalStudentsTaught), '; check it out❗'
        );
    } else {
        console.log('❇️  No problems about the type so far!');
    }
    // ### Inspecting fields - END ###

    // ### Inspecting methods - START ###
    console.log('\n🔍Inspecting methods',
        '\n🔸 Inspecting model.getTotalTaughtHours();', 
        '\n🔸 Inspecting model.getAllTrainingProjects;'
    );

    // Inspecting model.getTotalTaughtHours()
    console.log('➡️  Calling model.getTotalTaughtHours()');

    const totalTaughtHours = model.getTotalTaughtHours();
    console.log(
        '🆗 model.getTotalTaughtHours() has been called;',
        '\n💠 Checking model.getTotalTaughtHours() after load: ',
        '\n🔹Data from model.getTotalTaughtHours(): ', totalTaughtHours,
        '\n🔹Type of model.getTotalTaughtHours(): ', typeof(totalTaughtHours)
    );

    if (totalTaughtHours === null)  {
        testPassed = false;
        console.log(
            '❗Returned value of model.getTotalTaughtHours() is', totalTaughtHours, 
            ', check it out!');
    } else {
        console.log('❇️  No problems about the value so far!');
    }

    if (typeof(totalTaughtHours) != 'number')  {
        testPassed = false;
        console.log('❗Returned type of model.getTotalTaughtHours() is',
             typeof(totalTaughtHours), '; check it out❗');
    } else {
        console.log('❇️  No problems about the type so far!');
    }

    // Inspecting model.getTotalTaughtHours()
    console.log('\n➡️  Calling model.getAllTrainingProjects()');

    const allTrainingProjects = model.getAllTrainingProjects();

    console.log(
        '🆗 model.getAllTrainingProjects() has been called;',
        '\n💠 Checking model.getAllTrainingProjects() after load: ',
        '\n🔹Data from model.getAllTrainingProjects(): ', allTrainingProjects,
        '\n🔹Type of model.getAllTrainingProjects(): ', typeof(allTrainingProjects)
    );

    if (allTrainingProjects === null)  {
        testPassed = false;
        console.log(
            '❗Returned value of model.getAllTrainingProjects() is', totalTaughtHours, 
            '; check it out❗');
    } else {
        console.log('❇️  No problems about the value so far!');
    }

    if (typeof(allTrainingProjects) != 'object')  {
        testPassed = false;
        console.log(
            '❗Returned type of model.getAllTrainingProjects() is', typeof(totalTaughtHours), 
            '; check it out❗');
    } else {
        console.log('❇️  No problems about the type so far!');
    }
    
    // Inspecting model.getTotalTaughtStudents()
    console.log('\n➡️  Calling model.getTotalTaughtStudents()');

    const allTaughtStudents = model.getTotalTaughtStudents();

    console.log(
        '🆗 model.getTotalTaughtStudents() has been called;',
        '\n💠 Checking model.getTotalTaughtStudents() after load: ',
        '\n🔹Data from model.getTotalTaughtStudents(): ', allTaughtStudents,
        '\n🔹Type of model.getTotalTaughtStudents(): ', typeof(allTaughtStudents)
    );

    if (allTaughtStudents === null)  {
        testPassed = false;
        console.log(
            '❗Returned value of model.getTotalTaughtStudents() is', allTaughtStudents, 
            '; check it out❗');
    } else {
        console.log('❇️  No problems about the value so far!');
    }

    if (typeof(allTaughtStudents) != 'number')  {
        testPassed = false;
        console.log(
            '❗Returned type of model.getTotalTaughtStudents() is', typeof(allTaughtStudents), 
            '; check it out❗');
    } else {
        console.log('❇️  No problems about the type so far!');
    }
    // ### Inspecting methods - END ###
    
    // Global results
    console.log('\n🗒️  Test results:')
    if (testPassed) {
        console.log('✅ Test PASSED');
    } else {
        console.log('❌ Test FAILED');
    }

    console.log('--- Test finished ---');
}

runTest();