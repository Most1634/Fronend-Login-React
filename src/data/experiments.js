export const experiments = [
  {
    "key": "code_quality_walkthrough",
    "definition": {
      "name": "code_quality_walkthrough",
      "introduced_by_url": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/58900",
      "rollout_issue_url": "https://gitlab.com/gitlab-org/gitlab/-/issues/327229",
      "milestone": "13.12",
      "type": "experiment",
      "group": "group::activation",
      "default_enabled": false
    },
    "current_status": {
      "state": "conditional",
      "gates": [
        {
          "key": "boolean",
          "value": false
        },
        {
          "key": "percentage_of_actors",
          "value": 25
        }
      ]
    }
  },
  {
    "key": "ci_runner_templates",
    "definition": {
      "name": "ci_runner_templates",
      "introduced_by_url": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/58357",
      "rollout_issue_url": "https://gitlab.com/gitlab-org/gitlab/-/issues/326725",
      "milestone": "14.0",
      "type": "experiment",
      "group": "group::activation",
      "default_enabled": false
    },
    "current_status": {
      "state": "off",
      "gates": [
        {
          "key": "boolean",
          "value": false
        }
      ]
    }
  }
]; 