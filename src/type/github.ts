import type { Endpoints } from '@octokit/types';
import type { components } from '@octokit/openapi-types';

export type IssueType =
  Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']['data'];

export type ListLabelsType =
  Endpoints['GET /repos/{owner}/{repo}/labels']['response']['data'];

export type UserType = Endpoints['GET /users/{username}']['response']['data'];

export type AddLabelsToIssueType =
  components['requestBodies']['label-array']['content']['application/json'];
