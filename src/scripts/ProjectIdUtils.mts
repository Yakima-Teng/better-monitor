import { getStore } from "#scripts/StoreUtils";

/**
 * 获取项目标识（projectId 或 token）
 * @returns number | string 返回 projectId（数字）或 token（字符串）
 */
export function getProjectId(): number | string {
  const { projectId } = getStore();
  return projectId;
}
