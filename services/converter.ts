export function convertDateTime(dateTime: number) {
  const date = new Date(dateTime * 1000);

  // Mengonfigurasi opsi zona waktu Jakarta

  // Mengonversi tanggal menjadi format yang diinginkan
  const formattedDate = date.toLocaleString("en-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDate;
}
