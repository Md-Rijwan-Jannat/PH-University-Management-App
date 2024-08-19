// utils/dateFormat.ts

export const formatUKDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

export const formatUKTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
