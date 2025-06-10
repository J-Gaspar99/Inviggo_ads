package com.example.inviggo_ads.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.DTO.AdAddDTO;
import com.example.inviggo_ads.model.DTO.AdResponseDTO;
import com.example.inviggo_ads.model.User;
import com.example.inviggo_ads.repository.AdRepository;
import com.example.inviggo_ads.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/ads")
public class AdController {
    private final AdRepository adRepository;
    private final UserRepository userRepository;

    public AdController(AdRepository adRepository, UserRepository userRepository) {
        this.adRepository = adRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Page<Ad> getAds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return adRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ad> getAdById(@PathVariable UUID id) {
        return adRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> createAd(@RequestBody AdAddDTO adDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not authenticated");
            }

            String username = authentication.getName();
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Validate ad data
            if (adDTO.getName() == null || adDTO.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Ad name is required");
            }
            if (adDTO.getDescription() == null || adDTO.getDescription().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Description is required");
            }
            if (adDTO.getPrice() == null) {
                return ResponseEntity.badRequest().body("Price is required");
            }
            if (adDTO.getCategory() == null) {
                return ResponseEntity.badRequest().body("Category is required");
            }
            if (adDTO.getCity() == null || adDTO.getCity().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("City is required");
            }

            // Create ad
            Ad ad = adDTO.toModel();
            ad.setUser(user);
            ad.setCreatedAt(LocalDateTime.now());
            ad.setDeleted(false);

            // Save the ad
            Ad savedAd = adRepository.save(ad);
            
            // Create response DTO
            AdResponseDTO responseDTO = new AdResponseDTO(savedAd);
            
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating ad: " + e.getMessage());
        }
    }
}
