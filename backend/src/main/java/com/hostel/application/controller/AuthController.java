package com.hostel.application.controller;

import com.hostel.application.dto.ApiResponse;
import com.hostel.application.dto.AuthRequest;
import com.hostel.application.dto.AuthResponse;
import com.hostel.application.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ApiResponse.ok("Login successful", authService.login(request));
    }
}
