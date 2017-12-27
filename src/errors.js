import status from 'statuses';

const error = (statusCode = 500, message, details = {}) => {
  return {
    statusCode,
    message: message || status[statusCode],
    details
  };
};

export const UNSUPPORTED_MEDIA_TYPE = (expectedMediaType, actualMediaType) => error(415, undefined, {
  expected: expectedMediaType,
  actual: actualMediaType
});

export const BAD_REQUEST = (details) => error(400, undefined, details);