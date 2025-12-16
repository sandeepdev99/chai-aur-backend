class ApiResponse {
    constructor(message = "request successful",statusCode = 200, data = null, success = true
    ) {
        this.statusCode = statusCode;   
        this.name = "ApiResponse";
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}

export default ApiResponse;        