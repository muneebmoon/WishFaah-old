package pk.wishfaah.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/v1/**") // Apply to all API paths
                        .allowedOrigins("http://localhost:5173") // Add your exact frontend local URLs here
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                        .allowedHeaders("*") // Allow all request headers
                        .allowCredentials(true) // Crucial if you handle cookies/sessions/auth headers later
                        .maxAge(3600); // Cache the CORS preflight response for 1 hour
            }
        };
    }
}