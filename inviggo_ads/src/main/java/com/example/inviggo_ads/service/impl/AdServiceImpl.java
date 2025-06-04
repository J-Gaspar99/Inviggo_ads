package com.example.inviggo_ads.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.User;
import com.example.inviggo_ads.model.DTO.AdAddDTO;
import com.example.inviggo_ads.model.DTO.EditAdDTO;
import com.example.inviggo_ads.repository.AdRepository;
import com.example.inviggo_ads.repository.UserRepository;
import com.example.inviggo_ads.service.AdService;

@Service
public class AdServiceImpl implements AdService {
      
    private AdRepository adRepository;
    private UserRepository userRepository;
    
    @Autowired
    public AdServiceImpl(AdRepository adRepository, UserRepository userRepository) {
            
            this.adRepository = adRepository;
            this.userRepository = userRepository;
        }
    
        public Boolean saveAd(AdAddDTO ad) {
    
            Ad newAd = ad.toModel();
    
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User owner = userRepository.findByUsername(username).orElse(null);
            if (owner != null) {
                newAd.setUser(owner);
                owner.addAd(newAd);
            } 
    
            this.adRepository.save(newAd);
            return true;
        }
        
    public Boolean updateAd(EditAdDTO ad) throws Exception {
        Ad oldAd = this.adRepository.findById(ad.getId()).orElse(null);
        if (oldAd == null) {
            return false;
        }
        oldAd.setName(ad.getName());
        oldAd.setDescription(ad.getDescription());
        oldAd.setImageUrl(ad.getImageUrl());
        oldAd.setPrice(ad.getPrice());
        oldAd.setCategory(ad.getCategory());
        oldAd.setUser(ad.getUser());
        oldAd.setCity(ad.getCity());

        this.adRepository.save(oldAd);
        return true;
    }
    
    public void deleteAd(Long id) {
            //System.out.println(this.cottageRepository.getById(id));
        Ad ad = this.adRepository.findById(id).get();
        ad.setIsDeleted(true);
        this.adRepository.save(ad);
    }

    @Override
    public Boolean updateAd(AdAddDTO ad) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateAd'");
    } 

}