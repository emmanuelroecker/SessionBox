/**
 * SessionBox
 *
 * Javascript
 *
 * @author    Emmanuel ROECKER
 * @license   MIT
 *
 * Created : 18/01/2021
 * File : sessionbox.js
 *
 */

var SessionBox = (function () {
	function SessionBox(cookies) {
		if ((cookies === null) || (typeof cookies !== 'object')) {
			console.error("Parameters must be an object (Example : {'cookie1':true,'cookie2':false})");
			return;
		}

		var hidden, visibilityChange;
		if (typeof document.hidden !== "undefined") {
			hidden = "hidden";
			visibilityChange = "visibilitychange";
		} else if (typeof document.msHidden !== "undefined") {
			hidden = "msHidden";
			visibilityChange = "msvisibilitychange";
		} else if (typeof document.webkitHidden !== "undefined") {
			hidden = "webkitHidden";
			visibilityChange = "webkitvisibilitychange";
		}

		if (typeof document.addEventListener === "undefined" ||
			typeof document.hidden === "undefined" ||
			typeof sessionStorage === "undefined") {
			console.error("Requires a browser that supports Session Storage and Page Visibility API.");
			return;
		}

		if (Cookies === null) {
			console.error('Javacript Cookie library dependancy (https://github.com/js-cookie/js-cookie)');
			return;
		}

		this.prefix = "sessionbox-";
		this.cookies = cookies;

		if (sessionStorage.getItem(this.prefix + 'closed')) { // a tab cannot be reused if logout
			this.restore();
			document.location.reload();
		}

		for (var cookiename in cookies) {
			if (cookies[cookiename])
				this.save(cookiename);
		}

		var _this = this;
		window.onbeforeunload = function () { // for cookies deleted or expired
			_this.restore();
		};
		document.addEventListener("visibilitychange", function () { // for ajax requests
			if (!document.hidden) {
				_this.restore();
			}
		}, false);
		this.restore(); // deleted unused cookies
	}

	SessionBox.prototype.save = function (cookiename) {
		if (!(cookiename in this.cookies)) {
			console.error(cookiename + " not exist");
			return;
		}
		var sessionid = Cookies.get(cookiename);
		if (sessionid)
			sessionStorage.setItem(this.prefix + cookiename, sessionid);
	};

	SessionBox.prototype.close = function () {
		sessionStorage.setItem(this.prefix + 'closed', 'true');
		for (var cookiename in this.cookies) {
			sessionStorage.removeItem(this.prefix + cookiename);
		};
		this.restore();
	};

	SessionBox.prototype.restore = function () {
		for (var cookiename in this.cookies) {
			var sessionid = sessionStorage.getItem(this.prefix + cookiename);
			if (sessionid) {
				Cookies.set(cookiename, sessionid);
			} else {
				Cookies.remove(cookiename);
			}
		};
	};

	return SessionBox;
})();