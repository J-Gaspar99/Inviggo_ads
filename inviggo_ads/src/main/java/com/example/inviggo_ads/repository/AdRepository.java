package com.example.inviggo_ads.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.inviggo_ads.model.Ad;

@Repository
public interface AdRepository extends JpaRepository<Ad, UUID>, JpaSpecificationExecutor<Ad> {

    @Query("SELECT a FROM Ad a WHERE a.deleted = false")
    Page<Ad> findAllActive(Pageable pageable);

    @Query("SELECT a FROM Ad a WHERE a.deleted = false AND " +
           "(:category IS NULL OR a.category = :category) AND " +
           "(:name IS NULL OR LOWER(a.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:minPrice IS NULL OR a.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR a.price <= :maxPrice) AND " +
           "(:city IS NULL OR a.city = :city)")
    Page<Ad> findAllActiveWithFilters(
            @Param("category") String category,
            @Param("name") String name,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("city") String city,
            Pageable pageable);
}