package com.example.inviggo_ads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import com.example.inviggo_ads.model.User;
import com.example.inviggo_ads.model.DTO.UserDTO;
import com.example.inviggo_ads.repository.UserRepository;
import com.example.inviggo_ads.utils.TokenUtils;

import jakarta.servlet.http.HttpServletRequest;

import com.example.inviggo_ads.security.auth.SecureToken;
import com.example.inviggo_ads.service.SecureTokenService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SecureTokenService secureTokenService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private TokenUtils tokenUtils;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        LOGGER.debug("Received registration request for username: " + userDTO.getUsername());
        
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            LOGGER.debug("Username already exists: " + userDTO.getUsername());
            return ResponseEntity.badRequest().body("Username already exists");
        }

        try {
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setRegistrationDate(LocalDateTime.now());

            LOGGER.debug("Saving new user: " + user.getUsername());
            User savedUser = userRepository.save(user);
            LOGGER.debug("User saved successfully with ID: " + savedUser.getId());

            // Generate token immediately after registration
            String token = tokenUtils.generateToken(savedUser.getUsername());
            LOGGER.debug("Generated token for new user");

            // Save token
            SecureToken secureToken = new SecureToken();
            secureToken.setToken(token);
            secureToken.setUser(savedUser);
            
            secureToken.setExpireAt(LocalDateTime.now().plusSeconds(tokenUtils.getExpiredIn() / 1000));
            
            secureTokenService.saveSecureToken(secureToken);
            LOGGER.debug("Token saved in database");

            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedUser.getId());
            response.put("username", savedUser.getUsername());
            response.put("phoneNumber", savedUser.getPhoneNumber());
            response.put("registrationDate", savedUser.getRegistrationDate());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOGGER.error("Error during registration: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error during registration: " + e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO loginRequest) {
        return userRepository.findByUsername(loginRequest.getUsername())
            .map(user -> {
                if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                    // Prvo obrišemo stari token ako postoji
                    secureTokenService.removeTokenByToken(tokenUtils.generateToken(user.getUsername()));
                    
                    // Generišemo novi token
                    String token = tokenUtils.generateToken(user.getUsername());
                    
                    // Sačuvamo novi token
                    SecureToken secureToken = new SecureToken();
                    secureToken.setToken(token);
                    secureToken.setUser(user);
                    secureToken.setExpireAt(LocalDateTime.now().plusSeconds(tokenUtils.getExpiredIn() / 1000));
                    
                    secureTokenService.saveSecureToken(secureToken);
                    
                    // Create response object
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", user.getId());
                    response.put("username", user.getUsername());
                    response.put("phoneNumber", user.getPhoneNumber());
                    response.put("registrationDate", user.getRegistrationDate());
                    response.put("token", token);
                    
                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.badRequest().body("Invalid password");
                }
            })
            .orElse(ResponseEntity.badRequest().body("User not found"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") HttpServletRequest authHeader) {
        String token = tokenUtils.getToken(authHeader);
        if (token != null) {
            secureTokenService.removeTokenByToken(token);
        }
        return ResponseEntity.ok().build();
    }
}
