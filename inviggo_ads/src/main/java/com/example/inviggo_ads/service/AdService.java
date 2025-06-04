package com.example.inviggo_ads.service;

import com.example.inviggo_ads.model.DTO.AdAddDTO;

public interface AdService {
    public Boolean saveAd(AdAddDTO ad);

	public void deleteAd(Long id);

    public Boolean updateAd(AdAddDTO ad); 
}
