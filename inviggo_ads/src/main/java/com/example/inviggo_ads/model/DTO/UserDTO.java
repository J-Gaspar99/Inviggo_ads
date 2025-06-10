package com.example.inviggo_ads.model.DTO;

import java.time.LocalDateTime;
import java.util.UUID;

import com.example.inviggo_ads.model.User;



public class UserDTO {
    private UUID id;
    private String username;
    private String password;
    private String phoneNumber;
    private LocalDateTime registrationDate;
    
    public UserDTO(){}
    
    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.phoneNumber = user.getPhoneNumber();
        this.registrationDate = user.getRegistrationDate();
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }
}
