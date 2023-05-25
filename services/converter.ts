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

export const unixToInput = (unix: number) => {
  // Membuat objek Date dari UNIX timestamp (dalam milidetik)
  const date = new Date(unix * 1000);
  // Ubah ke timezone Jakarta
  date.setHours(date.getHours() + 7);
  // Mendapatkan tanggal dan waktu dalam format "YYYY-MM-DDTHH:mm"
  return date.toISOString().slice(0, 16);
};

export const dateTimeToUnix = (datetime: string) => {
  const date = new Date(datetime);

  return Math.floor(date.getTime() / 1000);
};
