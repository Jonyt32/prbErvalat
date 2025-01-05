package com.example.client_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Habilita CORS para todas las rutas y métodos de tu API
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer
                // No usar extensiones como .json, .xml, etc.
                .favorPathExtension(false)
                // No usar parámetros como ?format=json
                .favorParameter(false)
                // Permitir que Aceept-Header haga la negociación, pero si no está, usar JSON
                .ignoreAcceptHeader(false)
                // Si no hay preferencia, usar application/json
                .defaultContentType(MediaType.APPLICATION_JSON);
    }
}
