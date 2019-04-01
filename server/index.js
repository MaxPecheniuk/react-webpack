'use strict';

const hapi = require('hapi');

const port = 5000;
const url = 'localhost';

const server = hapi.server({
	host: url,
	port: port
})

const html = renderToString(
	<Provider store={store}>
		<App/>
	</Provider>
)

const preloadedState  = store.gerState()

const init = async () => {
	server.route({
		method: 'GET',
		path: '/',
		handler: (request, reply) => {
			return `<h1>Test</h1>`
		}
	})

	await server.start();
	console.log(`Server running at: ${url}:${port}`)
}

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});

init();