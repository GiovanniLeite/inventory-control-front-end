/* eslint-disable no-unused-expressions */
export const returnDate = () => {
  let date = new Date();
  let hours = date.getHours();
  hours < 10 ? (hours = `0${hours}`) : hours;
  let minutes = date.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;
  date = date.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  return `Gerado: ${hours}:${minutes} do dia ${date}`;
};

// export const formatDate = (date) => {
//   let dateObj = new Date(date);
//   // dateObj = dateObj.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
//   // return dateObj;

//   // returns the day of the month (from 1 to 31)
//   let day = dateObj.getDate();
//   day < 10 ? (day = `0${day}`) : day;
//   // returns the month (from 0 to 11)
//   let month = dateObj.getMonth() + 1;
//   month < 10 ? (month = `0${month}`) : month;
//   // returns the year (four digits)
//   const year = dateObj.getFullYear();

//   //return new Date(`${day}/${month}/${year}`); //`${day}/${month}/${year}`;
//   return `${day}/${month}/${year}`;
// };

// export const formatDateBR = (date) => {
//   let dateObj = new Date(date);
//   dateObj = dateObj.toLocaleDateString('pt-BR', {
//     timeZone: 'America/Sao_Paulo',
//   });
//   return dateObj;
//   // // returns the day of the month (from 1 to 31)
//   // let day = dateObj.getDate();
//   // day < 10 ? (day = `0${day}`) : day;
//   // // returns the month (from 0 to 11)
//   // let month = dateObj.getMonth() + 1;
//   // month < 10 ? (month = `0${month}`) : month;
//   // // returns the year (four digits)
//   // const year = dateObj.getFullYear();

//   // return `${day}/${month}/${year}`;
// };

// export const formatDateBRYear = (date) => {
//   const dateObj = new Date(date);
//   return dateObj.getFullYear();
// };
