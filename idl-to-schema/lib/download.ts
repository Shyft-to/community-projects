export const downloadSQL = (data: string) => {
  const blob = new Blob([data], {
    type: "application/sql;charset=utf-8,",
  });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", objUrl);
  link.setAttribute("download", `schema-${Date.now()}.sql`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
