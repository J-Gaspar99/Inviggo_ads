package com.example.inviggo_ads.model.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class AdDetailsDTO {
    // Ad information
    private UUID id;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private String category;
    private String city;
    private LocalDateTime createdAt;
    
    // User information
    private String username;
    private String phoneNumber;
    private LocalDateTime userRegistrationDate;


    public UUID getId(){
        return this.id;
    };
    public void setId(UUID id){
        this.id=id;
    };
    
    public String getName(){
        return this.name;
    };
    public void setName(String name){
        this.name=name;
    };
    
    public String getDescription(){
        return this.description;
    }
    public void setDescription(String description){
        this.description=description;
    }

    public void setImageUrl(String url){
        this.imageUrl=url;
    };
    public String getimageUrl(){
        return this.imageUrl;
    };
    
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getUserRegistrationDate() {
        return userRegistrationDate;
    }

    public void setUserRegistrationDate(LocalDateTime userRegistrationDate) {
        this.userRegistrationDate = userRegistrationDate;
    }

} 