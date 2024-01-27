export default function registerSW() {
   const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;
   navigator.serviceWorker.register(swUrl).then((response) => {
      console.log('response', response);
   });
}