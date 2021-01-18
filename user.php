<?php
session_name('COOKIE1');
session_start();
if ((!isset($_SESSION['login'])) || (!$_SESSION['login'])) {
	header("HTTP/1.0 403 Forbidden");
	exit;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
	<script src="js.cookie.min.js"></script>
	<script src="sessionbox.js"></script>
</head>

<body>
	<script>
		var sessionbox = new SessionBox({
			'COOKIE1': true,
			'COOKIE2': false
		});
	</script>

	<?php
	echo "PHP Session id : " . session_id();
	?>
	<div id="cookie2">
	</div>
	<script>
		document.getElementById('cookie2').innerHTML = Cookies.get('COOKIE2');
	</script>

	<button id="cookie2Create">Create Cookie2</button>
	<script>
		document.getElementById("cookie2Create").onclick = function() {
			Cookies.set('COOKIE2', '_' + Math.random().toString(36).substr(2, 9));
			sessionbox.save('COOKIE2');
			document.getElementById('cookie2').innerHTML = Cookies.get('COOKIE2');
		};
	</script>

	<button id="logout">Logout</button>
	<script>
		document.getElementById("logout").onclick = function() {
			sessionbox.close();
		};
	</script>
</body>

</html>