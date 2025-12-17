import type { PostTasksExecution } from '@nx/devkit';

export const postTasksExecution: PostTasksExecution = async (
  _options,
  context
) => {
  console.log(context.taskResults);
};
