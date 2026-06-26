@echo off
set PORT=8080
set JWT_SECRET=my_very_long_secret_key_with_at_least_32_characters_for_hmac_sha
set BREVO_USERNAME=dummy_brevo_username
set BREVO_PASSWORD=dummy_brevo_password
set FROM_MAIL=dummy@example.com
set FRONTEND_URL=http://localhost:5173
set BACKEND_URL=http://localhost:8080/api/v1.0

echo Starting Moneymanager Backend...
call mvnw.cmd spring-boot:run
pause
