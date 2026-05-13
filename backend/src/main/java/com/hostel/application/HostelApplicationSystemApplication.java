package com.hostel.application;

import com.hostel.application.entity.AdminUser;
import com.hostel.application.repository.AdminUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@SpringBootApplication
public class HostelApplicationSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(HostelApplicationSystemApplication.class, args);
    }

    @Bean
    CommandLineRunner defaultAdminSeeder(AdminUserRepository repository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (repository.count() == 0) {
                AdminUser admin = AdminUser.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .role("ADMIN")
                        .createdAt(LocalDateTime.now())
                        .build();
                repository.save(admin);
            }
        };
    }
}
