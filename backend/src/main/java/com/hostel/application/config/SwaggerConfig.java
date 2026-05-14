package com.hostel.application.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    OpenAPI openAPI() {
        return new OpenAPI().info(new Info()
                .title("Hostel Joining Application Management API")
                .version("1.0.0")
                .description("APIs for saving unique hostel student details and staff record management"));
    }
}
