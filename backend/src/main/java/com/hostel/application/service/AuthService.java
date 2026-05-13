package com.hostel.application.service;

import com.hostel.application.dto.AuthRequest;
import com.hostel.application.dto.AuthResponse;
import com.hostel.application.repository.AdminUserRepository;
import com.hostel.application.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final AdminUserRepository repository;
    private final JwtService jwtService;

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        UserDetails details = userDetailsService.loadUserByUsername(request.username());
        String role = repository.findByUsername(request.username()).map(admin -> admin.getRole()).orElse("ADMIN");
        return new AuthResponse(jwtService.generateToken(details), details.getUsername(), role);
    }
}
