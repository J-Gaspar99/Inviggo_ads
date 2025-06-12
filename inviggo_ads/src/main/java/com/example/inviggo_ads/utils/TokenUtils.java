package com.example.inviggo_ads.utils;

import java.util.Date;
import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.inviggo_ads.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;

@Component
public class TokenUtils {

	private static final Logger LOGGER = LoggerFactory.getLogger(TokenUtils.class);
	private static final String SECRET = "inviggo_ads_secret_key_for_jwt_token_generation_and_validation_this_is_a_very_long_secret_key_to_ensure_security";
	private static final long EXPIRES_IN = 3600000L; // 1 sat u milisekundama
	
	// Dodajemo nedostajuće konstante
	private static final String APP_NAME = "InviggoAds";
	private static final String AUDIENCE_WEB = "web";
	private static final String AUTH_HEADER = "Authorization";
	private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512;

	private Key signingKey;

	@PostConstruct
	public void init() {
		this.signingKey = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
	}

	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(generateExpirationDate())
                .signWith(signingKey, SignatureAlgorithm.HS512)
				.compact();
	}

	private Date generateExpirationDate() {
		return new Date(new Date().getTime() + EXPIRES_IN);
	}

	public String getToken(HttpServletRequest request) {
		String authHeader = getAuthHeaderFromHeader(request);
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			return authHeader.substring(7);
		}
		return null;
	}

	public String getUsernameFromToken(String token) {
		String username;
		try {
			final Claims claims = this.getAllClaimsFromToken(token);
			username = claims.getSubject();
		} catch (ExpiredJwtException ex) {
			throw ex;
		} catch (Exception e) {
			username = null;
		}
		return username;
	}

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException ex) {
            throw ex;
        } catch (Exception e) {
            LOGGER.error("Error parsing token: " + e.getMessage(), e);
            claims = null;
        }
        return claims;
    }

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return (username != null && username.equals(userDetails.getUsername()));
	}

	public String getAuthHeaderFromHeader(HttpServletRequest request) {
		return request.getHeader("Authorization");
	}

    public long getExpiredIn() {  
        return EXPIRES_IN;
    }

}