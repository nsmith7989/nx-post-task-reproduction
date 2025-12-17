# PostTaskReprouction

This shows a minimal example of how to reproduce the issue with `postTasksExecution` on CI.

## Error

When running DTE with `postTasksExecution` configured, the hook will fail to execute with the following printed:

```
 NX   Error completing post run task hook

Could not find summary task for task with id <project>:<target>
```

[CI failure](https://github.com/nsmith7989/nx-post-task-reproduction/actions/runs/20313499930/job/58350809808)

### Config

package.json of a project

```json
  "nx": {
    "targets": {
      "sub-1": {
        "cache": true,
        "command": "sleep 10 && echo app-a sub-1 && exit 1"
      },
      "sub-2": {
        "cache": true,
        "command": "sleep 10 && echo app-a sub-2"
      },
      "foo": {
        "executor": "nx:noop",
        "cache": true,
        "dependsOn": [
          "sub-*"
        ]
      }
    }
  }
```

Note: it is critical that one of the dependsOn for the target fails (`exit 1` in this example).

Plugin:

```ts
import type { PostTasksExecution } from '@nx/devkit';

export const postTasksExecution: PostTasksExecution = async (_options, context) => {
  console.log(context.taskResults);
};
```

CI:

```yml
- name: Foo
  run: npx nx affected -t foo --configuration=ci
```
