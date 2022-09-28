let pm = true;
document.querySelector('button').onclick = () => {
  pm = !pm;
  const showTime = () => {
    const date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = 'AM';
    let time;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    if (pm) {
      h = h - 12;
      session = 'PM';
      document.querySelector('button').innerText = 'PM';
      time = h + ':' + m + ':' + s + ' ' + session;
    } else {
      session = 'AM';
      document.querySelector('button').innerText = 'AM';
      time = h + ':' + m + ':' + s + ' ' + session;
    }

    document.getElementById('MyClockDisplay').innerText = time;
    document.getElementById('MyClockDisplay').textContent = time;
    setInterval(showTime);
  };
  showTime();
};
// const showTime = (a) => {
//   const date = new Date();
//   let h = date.getHours(); // 0 - 23
//   let m = date.getMinutes(); // 0 - 59
//   let s = date.getSeconds(); // 0 - 59
//   let session = 'AM';
//   let time;

//   //   if (h == 0) {
//   //     h = 12;
//   //   }

//   if (a) {
//     console.log(a);
//     h = h - 12;
//     session = 'PM';
//     time = h + ':' + m + ':' + s + ' ' + session;
//   } else {
//     session = 'AM';
//     time = h + ':' + m + ':' + s + ' ' + session;
//   }

//   document.getElementById('MyClockDisplay').innerText = time;
//   //   document.getElementById('MyClockDisplay').textContent = time;
//   setTimeout(showTime, 1000);
// };
// showTime();

//   h = h < 10 ? '0' + h : h;
//   m = m < 10 ? '0' + m : m;
//   s = s < 10 ? '0' + s : s;
