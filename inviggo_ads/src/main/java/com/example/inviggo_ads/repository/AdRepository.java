package com.example.inviggo_ads.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.inviggo_ads.model.Ad;

@Repository
public interface AdRepository extends JpaRepository<Ad, UUID> {
}