export const downloadSQL = (data: string, filename?: string) => {
  const blob = new Blob([data], {
    type: "application/sql;charset=utf-8,",
  });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", objUrl);
  link.setAttribute("download", replaceExtensionWithSql(filename));
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function replaceExtensionWithSql(fileName?: string): string {
  if (!fileName) {
    return `schema-${Date.now()}.sql`;
  }

  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) {
    return fileName + ".sql";
  }

  const baseName = fileName.substring(0, dotIndex);
  const extension = fileName.substring(dotIndex + 1);

  if (extension.toLowerCase() === "sql") {
    return fileName;
  }

  return baseName + ".sql";
}
