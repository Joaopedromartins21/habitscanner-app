package com.habitscanner.habitscanner.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.habitscanner.habitscanner.service.TokenValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private TokenValidationService tokenValidationService;

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Authorization header missing or invalid"));
        }
        
        String token = authHeader.substring(7); // Remove "Bearer " prefix
        
        if (!tokenValidationService.isValidGoogleToken(token)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
        
        JsonNode userInfo = tokenValidationService.getUserInfoFromToken(token);
        if (userInfo == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Could not retrieve user info"));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", userInfo.has("user_id") ? userInfo.get("user_id").asText() : "");
        response.put("email", userInfo.has("email") ? userInfo.get("email").asText() : "");
        response.put("name", userInfo.has("email") ? userInfo.get("email").asText() : "");
        response.put("picture", ""); // Google tokeninfo doesn't provide picture
        
        return ResponseEntity.ok(response);
    }
}

