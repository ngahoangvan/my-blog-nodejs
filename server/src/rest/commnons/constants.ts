export const ERRORS_CODE = {
    'BAD_REQUEST': {
        'code': 400,
        'message': 'Bad request'
    },
    'UNAUTHORIZED': {
        'code': 401,
        'message': 'Authorization failed with the provided credentials.'
    },
    'MISSING_FIELD': {
        'code': 402,
        'message': 'Must provide field when creating a obj.'
    },
    'DUPLICATE_VALUE': {
        'code': 403,
        'message': 'This {obj} is already exits. Please enter another one.'
    },
    'DOES_NOT_EXITS': {
        'code': 404,
        'message': 'The {obj} does exits in system.'
    },
    'INVALID_PAGE': {
        'code': 404,
        'message': 'Sorry, no results on that page.'
    },
    'EMAIL_FAILED': {
        'code': 405,
        'message': 'Cannot send email.'
    },
    'INVALID_DATA': {
        'code': 406,
        'message': 'Data is not valid.'
    },
    'UNKNOWNERROR': {
        'code': 407,
        'message': 'Unknown error.'
    },
    'INVALID_OPERATOR': {
        'code': 408,
        'message': 'Client performed a invalid operation'
    }
}

export const SUCCESS_CODE = {
    'OK': {
        'code': 200,
        'message': 'OK'
    },
    'CREATED': {
        'code': 201,
        'message': 'Created'
    },
    'NO_CONTENT': {
        'code': 204,
        'message': 'No content'
    },
}