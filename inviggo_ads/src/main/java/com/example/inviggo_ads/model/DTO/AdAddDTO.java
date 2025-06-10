package com.example.inviggo_ads.model.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.Category;

public class AdAddDTO {

    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Category category;
    private String city;

    // Getters and Setters
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
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
        return ad;
    }
}
