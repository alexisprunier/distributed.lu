export function getApiURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
		|| window.location.hostname === "") {
		return "http://localhost:5000/";
	}
	return "https://api.distributed.lu/";
}

export function getCookieOptions() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
		|| window.location.hostname === "") {
		return { domain: "localhost", path: "/" };
	}
	return { secure: true, domain: ".distributed.lu", path: "/" };
}

export function isInternetExplorer() {
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ");

	return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);
}
