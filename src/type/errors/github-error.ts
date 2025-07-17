import { APIError } from './api-error';

enum GitHubErrorCode {
  BAD_CREDENTIALS = 'GITHUB_BAD_CREDENTIALS',
  NOT_FOUND = 'GITHUB_NOT_FOUND',
  RESOURCE_FORBIDDEN = 'GITHUB_RESOURCE_FORBIDDEN',
  VALIDATION_FAILED = 'GITHUB_VALIDATION_FAILED',
  UNKNOWN_ERROR = 'GITHUB_UNKNOWN_ERROR',
  ERR_BAD_REQUEST = 'GITHUB_ERROR_BAD_REQUEST',
}

export type GitHubErrorResponse = {
  message: string;
  documentation_url: string;
  errors?: {
    message?: string;
    resource?: string;
    field?: string;
    code?: string;
  }[];
};

export const mapGitHubError = (
  status: number,
  response: GitHubErrorResponse
): APIError => {
  const { message } = response;

  switch (status) {
    case 401:
      return new APIError({
        code: GitHubErrorCode.BAD_CREDENTIALS,
        message: '인증 정보가 잘못되었습니다.',
        statusCode: 401,
      });

    case 403:
      return new APIError({
        code: GitHubErrorCode.RESOURCE_FORBIDDEN,
        message: '앱 권한으로 접근할 수 없는 리소스입니다.',
        statusCode: 403,
      });

    case 404:
      return new APIError({
        code: GitHubErrorCode.NOT_FOUND,
        message: '요청한 리소스를 찾을 수 없습니다.',
        statusCode: 404,
      });

    default:
      return new APIError({
        code: GitHubErrorCode.UNKNOWN_ERROR,
        message: message || '알 수 없는 GitHub 오류',
        statusCode: status,
      });
  }
};

