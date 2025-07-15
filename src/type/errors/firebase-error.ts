import { APIError } from './api-error';

enum FirebaseErrorCode {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  MISSING_PASSWORD = 'auth/missing-password',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
  USER_DISABLED = 'auth/user-disabled',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  INVALID_EMAIL = 'auth/invalid-email',
  WEAK_PASSWORD = 'auth/weak-password',
  UNKNOWN_ERROR = 'auth/unknown',
}

export const mapFirebaseError = (code: string): APIError => {
  switch (code) {
    case FirebaseErrorCode.EMAIL_ALREADY_IN_USE:
      return new APIError({
        code,
        message: '이미 사용 중인 이메일입니다.',
        statusCode: 400,
      });

    case FirebaseErrorCode.MISSING_PASSWORD:
      return new APIError({
        code,
        message: '비밀번호를 입력해주세요.',
        statusCode: 400,
      });

    case FirebaseErrorCode.USER_NOT_FOUND:
      return new APIError({
        code,
        message: '등록되지 않은 사용자입니다.',
        statusCode: 404,
      });

    case FirebaseErrorCode.INVALID_CREDENTIAL:
    case FirebaseErrorCode.WRONG_PASSWORD:
      return new APIError({
        code,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        statusCode: 401,
      });

    case FirebaseErrorCode.USER_DISABLED:
      return new APIError({
        code,
        message: '비활성화된 계정입니다.',
        statusCode: 403,
      });

    case FirebaseErrorCode.TOO_MANY_REQUESTS:
      return new APIError({
        code,
        message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
        statusCode: 429,
      });

    case FirebaseErrorCode.INVALID_EMAIL:
      return new APIError({
        code,
        message: '유효하지 않은 이메일 형식입니다.',
        statusCode: 400,
      });

    case FirebaseErrorCode.WEAK_PASSWORD:
      return new APIError({
        code,
        message: '비밀번호는 최소 6자 이상이어야 합니다.',
        statusCode: 400,
      });

    default:
      return new APIError({
        code,
        message: '알 수 없는 Firebase 인증 오류입니다.',
        statusCode: 500,
      });
  }
};

