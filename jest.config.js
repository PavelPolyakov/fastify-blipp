/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	testMatch: [
		"**/?(*.)+(spec|test).[j]s?(x)"
	],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
		"^.+\\.(js|jsx)$": "babel-jest"
	},
	verbose: true,
};

export default config;
