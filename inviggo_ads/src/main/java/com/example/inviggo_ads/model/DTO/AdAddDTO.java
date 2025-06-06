package com.example.inviggo_ads.model.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.Category;
import com.example.inviggo_ads.model.User;

public class AdAddDTO {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Category category;
    private User user;
    private String city;
    private LocalDateTime createdAt;
    private boolean isDeleted;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Ad toModel() {
        Ad ad = new Ad();
        ad.setName(this.getName());
        ad.setDescription(this.getDescription());
        ad.setImageUrl(this.getImageUrl());
        ad.setPrice(this.getPrice());
        ad.setCategory(this.getCategory());
        ad.setCity(this.getCity());
        ad.setCreatedAt(LocalDateTime.now());
        ad.setIsDeleted(false);
        ad.setUser(this.getUser());
        return ad;
    }
}
