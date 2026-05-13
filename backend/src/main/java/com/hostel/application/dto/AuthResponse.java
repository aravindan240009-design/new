package com.hostel.application.dto;

public record AuthResponse(String token, String username, String role) {
}
