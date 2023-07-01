import moment from "moment-timezone";

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
export function convertDateTimeMillis(dateTime: string) {
  const date = moment.tz(parseInt(dateTime), "Asia/Jakarta");
  const formattedDate = date.format("DD/MM/YYYY HH:mm:ss");
  return formattedDate;
}

export const unixToInput = (unix: string) => {
  // Membuat objek Date dari UNIX timestamp (dalam milidetik)
  const date = new Date(parseInt(unix));
  // Ubah ke timezone Jakarta
  date.setHours(date.getHours() + 7);
  // Mendapatkan tanggal dan waktu dalam format "YYYY-MM-DDTHH:mm"
  return date.toISOString().slice(0, 16);
};

export const dateTimeToUnix = (datetime: string) => {
  const date = new Date(datetime);
  return date.getTime().toString();
};

function formatTime(time: number) {
  return time < 10 ? "0" + time : time; // Menambahkan 0 di depan jika waktu kurang dari 10
}

// TIMEDIFFEERENCE BETWEEN TWICE UNIX TIME SHOW IN hh:mm:ss
export const timeDifference = (start: number, end: number) => {
  // let difference = Math.abs(end - start) / 1000; // Menghitung selisih dalam detik

  // let hours = Math.floor(difference / 3600);
  // let minutes = Math.floor((difference % 3600) / 60);
  // let seconds = Math.floor(difference % 60);

  // return (
  //   formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds)
  // );

  const timeDiff = Math.abs(end - start);

  // Convert milliseconds to hours, minutes, seconds, and milliseconds
  let milliseconds = timeDiff % 1000;
  let seconds = Math.floor((timeDiff / 1000) % 60);
  let minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  let hours = Math.floor(timeDiff / (1000 * 60 * 60));

  // Format the time components as two digits with leading zeros if necessary
  milliseconds = milliseconds.toString().padStart(3, "0");
  seconds = seconds.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  hours = hours.toString().padStart(2, "0");

  // Construct the formatted time difference string
  const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedTime;
};

export const unixToDDMMYYYY = (unix: string) => {
  var momentDate = moment.unix(parseInt(unix) / 1000);

  // Set the desired time zone ("Asia/Jakarta" in this case)
  var timeZone = "Asia/Jakarta";
  moment.tz(timeZone);

  // Format the date as DD/MMM/YYYY
  return momentDate.format("DD/MMM/YYYY");
};
