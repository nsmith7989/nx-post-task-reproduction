import type { PostTasksExecution } from '@nx/devkit';

export const postTasksExecution: PostTasksExecution = async (
  _options,
  context
) => {
  console.log(context.taskResults);
  for (const [project, result] of Object.entries(context.taskResults)) {
    console.log({
      project,
      status: result.status,
      startTime: result.task.startTime,
      endTime: result.task.endTime,
    });
  }
};
