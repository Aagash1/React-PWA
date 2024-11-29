export default function swDev(){
    if ('serviceWorker' in navigator) {
        let swUrl = `${process.env.PUBLIC_URL}/sw.js`; 
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Development Service Worker registered with scope: ', registration.scope);
          })
          .catch((error) => {
            console.error('Development Service Worker registration failed: ', error);
          });
      } else {
        console.log('Service Workers are not supported in this browser.');
      }
}