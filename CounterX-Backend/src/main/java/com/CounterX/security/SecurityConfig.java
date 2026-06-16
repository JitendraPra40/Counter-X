package com.CounterX.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // Login & Register
                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/register"
                        ).permitAll()

                        // ================= MENU =================

                        // Customer Access
                        .requestMatchers(HttpMethod.GET, "/api/menu/**")
                        .permitAll()

                        // Admin Only
                        .requestMatchers(HttpMethod.POST, "/api/menu/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/menu/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/menu/**")
                        .hasRole("ADMIN")

                        // ================= ADMIN DASHBOARD =================

                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        // ================= DASHBOARD =================

                        .requestMatchers("/api/dashboard/**")
                        .hasRole("ADMIN")

                        // ================= SALES =================

                        .requestMatchers("/api/sales/**")
                        .hasRole("ADMIN")

                        // ================= KITCHEN =================

                        .requestMatchers("/api/kitchen/**")
                        .hasRole("ADMIN")

                        // ================= ORDER ITEMS =================

                        .requestMatchers(HttpMethod.GET, "/order-items/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/order-items/**")
                        .hasRole("ADMIN")

                        // ================= BILLS =================

                        .requestMatchers(HttpMethod.GET, "/api/bills")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/bills/token/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/bills/{billId}")
                        .hasRole("ADMIN")

                        // ================= PAYMENTS =================

                        .requestMatchers(HttpMethod.GET, "/api/payments")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/payments/**")
                        .hasRole("ADMIN")

                        // ================= CART =================

                        .requestMatchers("/cart/**")
                        .authenticated()

                        .requestMatchers("/cart-items/**")
                        .authenticated()

                        // ================= ORDERS =================

                        .requestMatchers("/api/orders/**")
                        .authenticated()

                        // Everything Else
                        .anyRequest().authenticated()

                )

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
}