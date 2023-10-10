export const downloadCSV = (data: string) => {
  const blob = new Blob([data], {
    type: "text/csv;charset=utf-8,",
  });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", objUrl);
  link.setAttribute("download", `holders-${Date.now()}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
