$env:PORT="8080"
$env:JWT_SECRET="my_very_long_secret_key_with_at_least_32_characters_for_hmac_sha"
$env:BREVO_USERNAME="dummy_brevo_username"
$env:BREVO_PASSWORD="dummy_brevo_password"
$env:FROM_MAIL="dummy@example.com"
$env:FRONTEND_URL="http://localhost:5173"
$env:BACKEND_URL="http://localhost:8080/api/v1.0"

Write-Host "Starting Moneymanager Backend..."
.\mvnw.cmd spring-boot:run
