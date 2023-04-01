// Removes query params which are undefined
export const fixQuery = (query: Record<string, unknown>) => {
  Object.keys(query).forEach((param) => {
    if (
      query[param] === undefined ||
      query[param] === null ||
      query[param] === ""
    ) {
      delete query[param];
    }
  });
  return query;
};

/**
 * This function calculates progress percentage and returns as string
 * @param total_count Total Count
 * @param completed_count Completed Count
 * @returns String of percentage after calculation
 */
export const progressPercentageCalculation = (
  total_count: number,
  completed_count: number
): string =>
  (
    total_count &&
    completed_count &&
    (completed_count / total_count) * 100
  ).toFixed(2) || "0";
