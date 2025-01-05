<?php
// Database connection
$servername = "127.0.0.1"; // Replace with your Hostinger server address
$username = "u207026370_root"; // Replace with your database username
$password = "@Dmin_cvsuniac123"; // Replace with your database password
$database = "u207026370_cvsunaic_cvsud"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Login Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Sanitize inputs
    $username = $conn->real_escape_string($username);

    // Check credentials in the database
    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo "<script>alert('Login successful!');</script>";
            // Add session or redirect here
        } else {
            echo "<script>alert('Invalid password.');</script>";
        }
    } else {
        echo "<script>alert('User does not exist.');</script>";
    }
}

// Register Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Sanitize inputs
    $username = $conn->real_escape_string($username);

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert user into the database
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Registration successful!');</script>";
    } else {
        echo "<script>alert('Error: Could not register user.');</script>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HR Login</title>
    <link rel="icon" type="image/x-icon" href="../styles/img/mini-logo.ico">

    <!-- boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <!-- style -->
    <link rel="stylesheet" href="../hr-login/hr-login.css">
</head>
<body>
    <div class="form-container">
        <div class="col col-1">
            <div class="image-layer">
                <img src="../styles/img/mkiosk-yellowfill-redline.png" class="form-image-main">
            </div>
            <p class="featured-words">Admin Page of <span>Human Resources Department</span></p>
        </div>
        <div class="col col-2">
            <div class="btn-box">
                <button class="btn btn-1" id="login-btn">Sign-in</button>
                <button class="btn btn-2" id="register-btn">Sign-up</button>
            </div>

            <!-- Login Form -->
            <form action="hr-login.php" method="POST" class="login-form">
                <div class="form-title">
                    <span>Sign-in</span>
                </div>
                <div class="form-inputs">
                    <div class="input-box">
                        <input type="text" name="username" class="input-field" placeholder="Username" required>
                        <i class="bx bx-envelope icon"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" name="password" class="input-field" placeholder="Password" required>
                        <i class="bx bx-lock-alt icon"></i>
                    </div>
                    <div class="forgot-pass">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div class="input-box">
                        <button type="submit" name="login" class="input-submit">
                            <span>Login</span>
                            <i class="bx bx-right-arrow-alt"></i>
                        </button>
                        <div class="btn-back">
                            <a href="../user-login.html">Back</a>
                        </div>
                    </div>
                </div>
            </form>

            <!-- Register Form -->
            <form action="hr-login.php" method="POST" class="register-form">
                <div class="form-title">
                    <span>Sign-up</span>
                </div>
                <div class="form-inputs">
                    <div class="input-box">
                        <input type="text" name="username" class="input-field" placeholder="Username" required>
                        <i class="bx bx-envelope icon"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" name="password" class="input-field" placeholder="Password" required>
                        <i class="bx bx-lock-alt icon"></i>
                    </div>
                    <div class="input-box">
                        <button type="submit" name="register" class="input-submit">
                            <span>Register</span>
                            <i class="bx bx-right-arrow-alt"></i>
                        </button>
                        <div class="btn-back">
                            <a href="../user-login.html">Back</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script src="../hr-login/hr-js/feedb-main.js"></script>
</body>
</html>