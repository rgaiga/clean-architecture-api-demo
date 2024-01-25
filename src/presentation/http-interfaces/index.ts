export interface HttpRequest<T = unknown> {
    headers: {
        'x-access-token'?: string;
    };
    body: T;
}

export interface HttpResponse<T = undefined> {
    statusCode: number;
    data?: T;
    error?: {
        error: string;
        message: string;
    };
}

export interface Middleware<T = unknown, U = undefined> {
    handleRequest(
        httpRequest: HttpRequest<T>,
    ): Promise<HttpResponse<U>> | HttpResponse<U>;
}
