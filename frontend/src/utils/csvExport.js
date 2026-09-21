/**
 * Utility to export tabular data as downloadable CSV files
 */
export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) {
    console.warn('exportToCSV: No rows provided for export');
    return false;
  }

  const keys = Object.keys(rows[0]);
  const separator = ',';

  // Format header
  const header = keys.map(escapeCSVValue).join(separator);

  // Format data rows
  const body = rows.map((row) => {
    return keys
      .map((key) => {
        const val = row[key];
        return escapeCSVValue(val);
      })
      .join(separator);
  });

  const csvContent = [header, ...body].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Native browser download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

function escapeCSVValue(val) {
  if (val === null || val === undefined) return '""';
  let str = String(val);
  // If the value contains commas, quotes, or newlines, quote it and escape existing quotes
  if (/[",\n\r]/.test(str)) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
