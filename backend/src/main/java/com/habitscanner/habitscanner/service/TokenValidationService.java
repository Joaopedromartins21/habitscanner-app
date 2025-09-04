package com.habitscanner.habitscanner.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

@Service
public class TokenValidationService {
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public boolean isValidGoogleToken(String token) {
        try {
            String url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token;
            String response = restTemplate.getForObject(url, String.class);
            
            if (response != null) {
                JsonNode jsonNode = objectMapper.readTree(response);
                return jsonNode.has("user_id") && !jsonNode.has("error");
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getUserIdFromToken(String token) {
        try {
            String url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token;
            String response = restTemplate.getForObject(url, String.class);
            
            if (response != null) {
                JsonNode jsonNode = objectMapper.readTree(response);
                if (jsonNode.has("user_id")) {
                    return jsonNode.get("user_id").asText();
                }
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
    
    public JsonNode getUserInfoFromToken(String token) {
        try {
            String url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token;
            String response = restTemplate.getForObject(url, String.class);
            
            if (response != null) {
                return objectMapper.readTree(response);
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
}

