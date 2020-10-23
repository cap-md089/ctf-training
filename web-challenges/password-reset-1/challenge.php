<!DOCTYPE html>
<html>

	<head>
		<title>Website template</title>

		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />

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
				// Successful signin
				if ($_POST['age'] == (date('Y') - 1998)) {
			?>
				<div class="alert alert-success">
					Success! It turns out leaving your birthday in your username isn't the best idea. Flag: <code>BPb4s8qu63iH</code>
				</div>
			<?php
				// Default
				} else if (isset($_POST['username']) || isset($_POST['age'])) {
			?>
				<div class="alert alert-danger">
					Invalid form entry
				</div>
			<?php
				}
			?>

			<div class="row">
				<form action="/challenge.php" method="POST">
					<div class="form-group">
						<label for="username">Username</label>
						<input type="text" class="form-control" id="username" name="username" value="admin98" disabled />
					</div>
					<div class="form-group">
						<label for="age">What Is Your Age?</label>
						<input type="number" class="form-control" id="age" name="age" />
					</div>
					<button type="submit" class="btn btn-primary">Sign in</button>
				</form>
			</div>
		</div>
	</body>

</html>
