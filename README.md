# Chosen Client

## Environments

| Name          | Branches Frontend        | Branches Backend        | Server Frontend            | Server Backend    | Database |
| ------------- | ------------------------ | ----------------------- | -------------------------- | ----------------- | -------- |
| Develop Local | Feature, Hotfix          | Feature, Hotfix         | localhost:4000             | localhost:3000    | local    |
| Staging       | Develop                  | Develop                 | staging.podcasterinnen.org | ???               | ???      |
| Prod          | Master                   | Master                  | podcasterinnen.org         | chosen-cors-proxy | prod     |

## Heroku Projects

- chosen-cors-proxy-prod (proxy for api.podcasterinnen.org)
- chosen-cors-proxy-staging (proxy for api.staging.podcasterinnen.org)
- api.podcasterinnen.org
- api.staging.podcasterinnen.org
- podcasterinnen.org
- staging.podcasterinnen.org

# Questions
- Which db do I use for different envs?

# Heroku

## Pros
- easy build chain
- easy ssl
- easy config vars
- easy role management
- easy updates for elixir and node
- easy db access

## Cons
- no automatic deployments from dev branches from Github
- many projects -> high costs