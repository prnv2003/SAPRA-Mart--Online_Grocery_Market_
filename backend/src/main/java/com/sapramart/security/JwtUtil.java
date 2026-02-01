// package com.sapramart.security;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;

// import java.security.Key;
// import java.util.Date;

// public class JwtUtil {

//     // 🔐 Secret key used to sign the JWT
//     private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

//     // ⏱ Token validity (1 hour)
//     private static final long EXPIRATION_TIME = 1000 * 60 * 60;

//     // ================= GENERATE TOKEN =================
//     public static String generateToken(String email) {

//         return Jwts.builder()
//                 .setSubject(email)                 // user identifier
//                 .setIssuedAt(new Date())           // token creation time
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                 .signWith(SECRET_KEY)
//                 .compact();
//     }

//     // ================= VALIDATE TOKEN =================
//     public static boolean validateToken(String token) {
//         try {
//             Jwts.parserBuilder()
//                     .setSigningKey(SECRET_KEY)
//                     .build()
//                     .parseClaimsJws(token);
//             return true;
//         } catch (Exception e) {
//             return false;
//         }
//     }

//     // ================= EXTRACT EMAIL =================
//     public static String extractEmail(String token) {
//         Claims claims = Jwts.parserBuilder()
//                 .setSigningKey(SECRET_KEY)
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();

//         return claims.getSubject();
//     }
// }
