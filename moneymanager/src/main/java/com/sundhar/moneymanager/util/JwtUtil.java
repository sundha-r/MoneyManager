package com.sundhar.moneymanager.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtUtil {

        // Secret key
        @Value("${jwt.secret}")
        private String secretKey;

        // Token expiration time (1 day)
        private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

        // Generate signing key
        private Key getSignKey() {
            return Keys.hmacShaKeyFor(secretKey.getBytes());
        }

        // Generate token
        public String generateToken(String email) {

            Map<String, Object> claims = new HashMap<>();

            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(
                            new Date(System.currentTimeMillis()
                                    + EXPIRATION_TIME)
                    )
                    .signWith(getSignKey(), SignatureAlgorithm.HS256)
                    .compact();
        }

        // Extract email from token
        public String extractUsername(String token) {

            return extractClaims(token).getSubject();
        }

        // Extract expiration date
        public Date extractExpiration(String token) {

            return extractClaims(token).getExpiration();
        }

        // Extract all claims
        public Claims extractClaims(String token) {

            return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }

        // Check token validity
        public boolean validateToken(String token, String email) {

            final String username = extractUsername(token);
            return username.equals(email) && !isTokenExpired(token);
        }

        // Check token expiration
        private boolean isTokenExpired(String token) {

            return extractExpiration(token)
                    .before(new Date());
        }

}
