# Chosen Client

## Develop

1. Fork project
2. Install dependencies with `yarn`
3. Start server with `yarn start`

### Before making a pull request

1. Check that there are no linting errors with `yarn run lint`

## Environments

| Name          | Branches Frontend        | Branches Backend        | Server Frontend            | Server Backend             | Database |
| ------------- | ------------------------ | ----------------------- | -------------------------- | -------------------------- | -------- |
| Develop Local | Feature, Hotfix          | Feature, Hotfix         | localhost:4000             | localhost:3000             | local    |
| Test          | Develop                  | Develop                 | test.podcasterinnen.org    | apitest.podcasterinnen.org | test     |
| Prod          | Master                   | Master                  | podcasterinnen.org         | api.podcasterinnen.org     | prod     |
