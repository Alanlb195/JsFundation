import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";


export class GitHubService {
    constructor() { }

    onStar(payload: GithubStarPayload): string {
        const { action, sender, repository } = payload;
        return `User ${sender.login} ${action} star on ${repository.name}`
    }

    onIssue(payload: GithubIssuePayload) {
        const { action, issue } = payload;

        if (action === 'opened') {
            return `An issue was opened with this title: ${issue.title}`
        }

        if (action === 'closed') {
            return `An issue was closed with this title: ${issue.title}`
        }

        if (action === 'reopened') {
            return `An issue was reopened with this title: ${issue.title}`
        }

        if (action === 'deleted') {
            return `An issue was deleted with this title: ${issue.title}`
        }

        return `Unhandled issue for the issue event: ${action}`

    }

}