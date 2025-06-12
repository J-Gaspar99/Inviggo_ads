package com.example.inviggo_ads.service;

import java.util.UUID;

import com.example.inviggo_ads.model.Ad;
import com.example.inviggo_ads.model.DTO.AdAddDTO;
import com.example.inviggo_ads.model.DTO.AdDetailsDTO;
import com.example.inviggo_ads.model.DTO.EditAdDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdService {
    public Boolean saveAd(AdAddDTO ad);

	public void deleteAd(UUID id);

    public void deleteAdTotal(UUID id);

    public AdDetailsDTO getAdDetails(UUID id);

    public Ad getAdById(String id);

    public Ad updateAd(EditAdDTO ad) throws Exception;

    Ad updateAd(String id, EditAdDTO editAdDTO);

    void deleteAd(String id);

    Page<Ad> getAllAds(Pageable pageable);
    Page<Ad> getAdsWithFilters(String category, String name, Double minPrice, 
                              Double maxPrice, String city, Pageable pageable);
}