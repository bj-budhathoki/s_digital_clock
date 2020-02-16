import App from './App.svelte'
if ('serviceWorker' in navigator) {
	console.log('inside worker and ready to go')
	navigator.serviceWorker.register('/sw.js').catch(console.error)

}
const app = new App({
	target: document.body,
});

export default app;