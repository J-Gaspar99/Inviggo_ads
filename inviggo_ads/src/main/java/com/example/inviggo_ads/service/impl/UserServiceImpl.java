package com.example.inviggo_ads.service.impl;

import org.springframework.stereotype.Service;

import com.example.inviggo_ads.model.User;
import com.example.inviggo_ads.repository.UserRepository;


@Service
public class UserServiceImpl {

    private UserRepository userRepository;

    public User findByUsername(String username) {
        try {
            return this.userRepository.findByUsername(username).get();
        } catch (Exception e) {
           
        }
        return null;  
        
    }
    
}
