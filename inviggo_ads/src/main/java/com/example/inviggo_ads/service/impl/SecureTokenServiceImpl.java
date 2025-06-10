package com.example.inviggo_ads.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.inviggo_ads.service.SecureTokenService;
import com.example.inviggo_ads.security.auth.SecureToken;
import com.example.inviggo_ads.repository.SecureTokenRepository;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SecureTokenServiceImpl implements SecureTokenService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecureTokenServiceImpl.class);

    @Autowired
    private SecureTokenRepository secureTokenRepository;

    @Override
    public SecureToken createSecureToken() {
        SecureToken secureToken = new SecureToken();
        secureToken.setToken(UUID.randomUUID().toString());
        return secureToken;
    }

    @Override
    public SecureToken saveSecureToken(SecureToken token) {
        LOGGER.debug("Saving token: " + token.getToken());
        LOGGER.debug("For user: " + token.getUser().getUsername());
        LOGGER.debug("Expires at: " + token.getExpireAt());
        return secureTokenRepository.save(token);
    }

    @Override
    public SecureToken findByToken(String token) {
        LOGGER.debug("Finding token: " + token);
        return secureTokenRepository.findByToken(token);
    }

    @Override
    public void removeToken(final SecureToken token) {
        secureTokenRepository.delete(token);
    }

    @Override
    public void removeTokenByToken(final String token) {
        secureTokenRepository.deleteByToken(token);
    }
}
