package com.example.inviggo_ads.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.provider.HibernateUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.User;
import com.example.inviggo_ads.model.DTO.AdAddDTO;
import com.example.inviggo_ads.model.DTO.EditAdDTO;
import com.example.inviggo_ads.model.DTO.AdDetailsDTO;
import com.example.inviggo_ads.repository.AdRepository;
import com.example.inviggo_ads.repository.UserRepository;
import com.example.inviggo_ads.service.AdService;

@Service
public class AdServiceImpl implements AdService {
      
    private final AdRepository adRepository;
    private UserRepository userRepository;
    
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
        
    public Ad updateAd(EditAdDTO ad) throws Exception {
        Ad oldAd = this.adRepository.findById(ad.getId()).orElse(null);
        if (oldAd == null) {
            return null;
        }
        oldAd.setName(ad.getName());
        oldAd.setDescription(ad.getDescription());
        oldAd.setImageUrl(ad.getImageUrl());
        oldAd.setPrice(ad.getPrice());
        oldAd.setCategory(ad.getCategory());
        oldAd.setUser(ad.getUser());
        oldAd.setCity(ad.getCity());

        this.adRepository.save(oldAd);
        return oldAd;
    }
    
    public void deleteAd(UUID id) {
            //System.out.println(this.cottageRepository.getById(id));
        Ad ad = this.adRepository.findById(id).get();
        ad.setIsDeleted(true);
        this.adRepository.save(ad);
    }

    public void deleteAdTotal(UUID id){
        this.adRepository.deleteById(id);
    }

    @Override
    public AdDetailsDTO getAdDetails(UUID id) {
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

        return detailsDTO;
    }


    @Override
    @Transactional(readOnly = true)
    public Ad getAdById(String id) {
        return adRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Ad not found with id: " + id));
    }

    @Override
    @Transactional
    public Ad updateAd(String id, EditAdDTO editAdDTO) {
        Ad ad = getAdById(id);
        
        // Inicijalizujemo User entitet
        org.hibernate.Hibernate.initialize(ad.getUser());

        ad.setName(editAdDTO.getName());
        ad.setDescription(editAdDTO.getDescription());
        ad.setImageUrl(editAdDTO.getImageUrl());
        ad.setPrice(editAdDTO.getPrice());
        ad.setCategory(editAdDTO.getCategory());
        ad.setCity(editAdDTO.getCity());

        return adRepository.save(ad);
    }

    @Override
    @Transactional
    public void deleteAd(String id) {
        Ad ad = getAdById(id);
        ad.setDeleted(true);
        //adRepository.save(ad);
        adRepository.delete(ad);

    }

    @Override
    @Transactional(readOnly = true)
    public Page<Ad> getAllAds(Pageable pageable) {
        return adRepository.findAllActive(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Ad> getAdsWithFilters(String category, String name, Double minPrice, 
                                     Double maxPrice, String city, Pageable pageable) {
        return adRepository.findAllActiveWithFilters(category, name, minPrice, maxPrice, city, pageable);
    }

}