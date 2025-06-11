package com.example.inviggo_ads.service;

import com.example.inviggo_ads.model.User;

public interface UserService {
    
    public User findByUsername(String username);
}
