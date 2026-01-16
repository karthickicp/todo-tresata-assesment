import dayjs from "dayjs";

export const getFormattedDate = (date?: string, format?: string) => {
  if (!date) return dayjs().format(format || "");
  return dayjs(date).format(format || "");
};
