package com.example.inviggo_ads.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.Category;
import com.example.inviggo_ads.model.DTO.AdAddDTO;
import com.example.inviggo_ads.model.DTO.AdResponseDTO;
import com.example.inviggo_ads.model.DTO.EditAdDTO;
import com.example.inviggo_ads.model.DTO.AdDetailsDTO;
import com.example.inviggo_ads.model.User;
import com.example.inviggo_ads.repository.AdRepository;
import com.example.inviggo_ads.repository.UserRepository;
import com.example.inviggo_ads.service.AdService;
import com.example.inviggo_ads.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/ads")
public class AdController {
    private final AdRepository adRepository;
    private final UserRepository userRepository;
    private final AdService adService;

    public AdController(AdRepository adRepository, UserRepository userRepository, AdService adService) {
        this.adRepository = adRepository;
        this.userRepository = userRepository;
        this.adService = adService;
    }

    @GetMapping
    public ResponseEntity<Page<AdResponseDTO>> getAds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "false") boolean showMineOnly) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            
            Specification<Ad> spec = Specification.where(null);

            if (StringUtils.hasText(category)) {
                spec = spec.and((root, query, cb) -> cb.equal(root.get("category"), Category.valueOf(category.toUpperCase())));
            }
            if (StringUtils.hasText(name)) {
                spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }
            if (minPrice != null) {
                spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }
            if (maxPrice != null) {
                spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }
            if (StringUtils.hasText(city)) {
                spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("city")), "%" + city.toLowerCase() + "%"));
            }

            if (showMineOnly) {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (authentication != null && authentication.isAuthenticated()) {
                    String username = authentication.getName();
                    User currentUser = userRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    spec = spec.and((root, query, cb) -> cb.equal(root.get("user"), currentUser));
                } else {
                    // If showMineOnly is true but user is not authenticated, return empty page or an error
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            }

            Page<Ad> adsPage = adRepository.findAll(spec, pageable);
            Page<AdResponseDTO> responsePage = adsPage.map(AdResponseDTO::new);
            return ResponseEntity.ok(responsePage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ad> getAdById(@PathVariable UUID id) {
        return adRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<AdDetailsDTO> getAdDetails(@PathVariable UUID id) {
        try {
            Ad ad = adRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Ad not found"));

            AdDetailsDTO detailsDTO = new AdDetailsDTO();
            // Popunjavanje podataka o oglasu
            detailsDTO.setId(ad.getId());
            detailsDTO.setName(ad.getName());
            detailsDTO.setDescription(ad.getDescription());
            detailsDTO.setImageUrl(ad.getImageUrl());
            detailsDTO.setPrice(ad.getPrice());
            detailsDTO.setCategory(ad.getCategory().toString());
            detailsDTO.setCity(ad.getCity());
            detailsDTO.setCreatedAt(ad.getCreatedAt());

            // Popunjavanje podataka o korisniku
            User user = ad.getUser();
            detailsDTO.setUsername(user.getUsername());
            detailsDTO.setPhoneNumber(user.getPhoneNumber());
            detailsDTO.setUserRegistrationDate(user.getRegistrationDate());

            return ResponseEntity.ok(detailsDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateAd(
            @PathVariable String id,
            @RequestBody EditAdDTO editAdDTO,
            Authentication authentication) {
        try {
            Ad existingAd = adService.getAdById(id);
            if (existingAd == null) {
                return ResponseEntity.notFound().build();
            }

            // Proveravamo da li je korisnik vlasnik oglasa
            if (!existingAd.getUser().getUsername().equals(authentication.getName())) {
                return ResponseEntity.status(403).body("You are not authorized to update this ad");
            }

            Ad updatedAd = adService.updateAd(id, editAdDTO);
            
            // Kreiramo response DTO
            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedAd.getId());
            response.put("name", updatedAd.getName());
            response.put("description", updatedAd.getDescription());
            response.put("imageUrl", updatedAd.getImageUrl());
            response.put("price", updatedAd.getPrice());
            response.put("category", updatedAd.getCategory());
            response.put("city", updatedAd.getCity());
            response.put("createdAt", updatedAd.getCreatedAt());
            response.put("username", updatedAd.getUser().getUsername());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Dodajemo stack trace za debugging
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Error updating ad: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteAd(
            @PathVariable String id,
            Authentication authentication) {
        try {
            Ad existingAd = adService.getAdById(id);
            if (existingAd == null) {
                return ResponseEntity.notFound().build();
            }

            if (!existingAd.getUser().getUsername().equals(authentication.getName())) {
                return ResponseEntity.status(403).body("You are not authorized to delete this ad");
            }

            adService.deleteAdTotal(UUID.fromString(id));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Error deleting ad: " + e.getMessage()));
        }
    }
}
