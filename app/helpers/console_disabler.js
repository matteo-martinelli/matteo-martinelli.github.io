// Disable console.log in production environments
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Logging from local development environment');
} else {
    console.log = function() {};
}