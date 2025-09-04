package com.habitscanner.habitscanner.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.habitscanner.habitscanner.service.TokenValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private TokenValidationService tokenValidationService;

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token is required"));
        }
        
        if (!tokenValidationService.isValidGoogleToken(token)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
        
        JsonNode userInfo = tokenValidationService.getUserInfoFromToken(token);
        if (userInfo == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Could not retrieve user info"));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("user", Map.of(
            "id", userInfo.has("user_id") ? userInfo.get("user_id").asText() : "",
            "email", userInfo.has("email") ? userInfo.get("email").asText() : "",
            "name", userInfo.has("email") ? userInfo.get("email").asText() : ""
        ));
        
        return ResponseEntity.ok(response);
    }
}

