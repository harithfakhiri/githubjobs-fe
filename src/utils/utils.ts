export const stringifyCreated = (inputDateStr: string) => {
  const inputDate = new Date(inputDateStr);

  const month = inputDate.toLocaleString("default", { month: "long" });
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  return `${month} ${day}, ${year}`;
};
