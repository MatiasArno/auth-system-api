class AppError extends Error {
	errorType: string;
	statusCode: number;

	constructor(errorType: string, message: string, statusCode: number) {
		super(message);

		this.errorType = errorType;
		this.statusCode = statusCode;
	}
}

export default AppError;
