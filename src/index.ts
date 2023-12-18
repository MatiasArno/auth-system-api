import { PORT, areEnvironmentVariablesSetted } from './constants';

if (!areEnvironmentVariablesSetted) {
	console.log('Environment variables are not setted properly');
	process.exit();
}

import app from './app';

app.listen(PORT, () => console.log('Server is running on port', PORT));
