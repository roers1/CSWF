module.exports = {
	logger: require('tracer').dailyfile({
		root: '.',
		maxLogFiles: 10,
		allLogsFileName: 'cswf',
	}),
};
