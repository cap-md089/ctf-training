<!DOCTYPE html>
<html>

	<head>
		<title>Signin</title>

		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
		<link rel="stylesheet" href="http://localhost/styles.css" crossorigin="anonymous" />

		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>

		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<style>
			body {
				margin-top: 10px;
			}
		</style>
	</head>

	<body>
		<div class="container-xl">
			<?php
				// The following HTMl comment is supposed to show up on the client as part of the challenge
				// Do not fix
			?>
			<!--
				FIX ME:

				Credentials are:
					Username: admin
					Password: admin
			-->
			<?php
				// Successful signin
				if ($_POST['username'] == "admin" && $_POST['password'] == "admin") {
			?>
				<div class="alert alert-success">
					Success! You found the login credentials. Flag: <code>ucHRzTrfgwxL</code>
				</div>
			<?php
				// Default
				} else {
					// Check to see if there was an attempted signin
					if (isset($_POST['username']) || isset($_POST['password'])) {
			?>
				<div class="alert alert-danger">
					Invalid credentials
				</div>
			<?php
					}
				}
			?>

			<div class="row">
				<form action="/challenge.php" method="POST">
					<div class="form-group">
						<label for="username">Username</label>
						<input type="text" class="form-control" id="username" name="username" />
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" class="form-control" id="password" name="password" />
					</div>
					<button type="submit" class="btn btn-primary">Sign in</button>
				</form>
			</div>
		</div>
	</body>

</html>
