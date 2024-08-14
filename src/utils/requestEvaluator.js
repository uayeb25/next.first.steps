export function EvaluateResponse(response) {

    if( response.status === 403 )
        return '/activate';

    if( response.status === 401 )
        return '/login';

    return "";

}