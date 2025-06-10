package com.example.inviggo_ads.model.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.Category;

public class AdResponseDTO {
    private UUID id;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private String category;
    private String city;
    private LocalDateTime createdAt;
    private String username;

    public AdResponseDTO(Ad ad) {
        this.id = ad.getId();
        this.name = ad.getName();
        this.description = ad.getDescription();
        this.imageUrl = ad.getImageUrl();
        this.price = ad.getPrice();
        this.category = ad.getCategory().name();
        this.city = ad.getCity();
        this.createdAt = ad.getCreatedAt();
        this.username = ad.getUser().getUsername();
    }

    // Getters and setters - svi počinju sa malim slovom
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
} 