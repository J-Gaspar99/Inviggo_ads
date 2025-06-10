package com.example.inviggo_ads.security.auth;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.inviggo_ads.utils.TokenUtils;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {

	private final TokenUtils tokenUtils;
	private final UserDetailsService userDetailsService;
	protected final Log LOGGER = LogFactory.getLog(getClass());

	public TokenAuthenticationFilter(TokenUtils tokenHelper, UserDetailsService userDetailsService) {
		this.tokenUtils = tokenHelper;
		this.userDetailsService = userDetailsService;
	}

	@Override
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		// Preskočimo proveru tokena za auth endpointove
		if (request.getRequestURI().startsWith("/api/auth/")) {
			chain.doFilter(request, response);
			return;
		}

		LOGGER.debug("Processing request: " + request.getRequestURI());
		LOGGER.debug("Authorization header: " + request.getHeader("Authorization"));
		
		String username;
		String authToken = tokenUtils.getToken(request);
		LOGGER.debug("Extracted token: " + authToken);
		
		try {
			if (authToken != null) {
				username = tokenUtils.getUsernameFromToken(authToken);
				LOGGER.debug("Username from token: " + username);
				
				if (username != null) {
					UserDetails userDetails = userDetailsService.loadUserByUsername(username);
					LOGGER.debug("User details loaded: " + userDetails.getUsername());
					
					if (tokenUtils.validateToken(authToken, userDetails)) {
						LOGGER.debug("Token validated successfully");
						TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);
						authentication.setToken(authToken);
						SecurityContextHolder.getContext().setAuthentication(authentication);
					} else {
						LOGGER.debug("Token validation failed");
					}
				}
			} else {
				LOGGER.debug("No token found in request");
			}
		} catch (Exception ex) {
			LOGGER.error("Error processing token: " + ex.getMessage(), ex);
		}
		
		chain.doFilter(request, response);
	}

}
