import type { PostTasksExecution } from '@nx/devkit';

export const postTasksExecution: PostTasksExecution = async (
  _options,
  context
) => {
  console.log(context.taskResults);
  for (const [project, result] of Object.entries(context.taskResults)) {
    const start = new Date(result.startTime).toISOString();
    const end = new Date(result.endTime).toISOString();
    console.log({
      project,
      status: result.status,
      terminalOutput: result.terminalOutput,
      start,
      end,
      durationMs: result.endTime - result.startTime,
      startTime: result.startTime,
      endTime: result.endTime,
    });
  }
};
