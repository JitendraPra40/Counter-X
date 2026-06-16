package com.CounterX.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Username
    @NotBlank(message = "Username is required")
    @Column(unique = true, nullable = false)
    private String username;

    // Email
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email Format")
    @Column(unique = true, nullable = false)
    private String email;

    // Password
    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d).{6,}$",
            message = "Password must contain letters, numbers and be at least 6 characters"
    )
    @Column(nullable = false)
    private String password;

    public Admin() {
    }

    // ===========================
    // Getters and Setters
    // ===========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    // Later you can encrypt using BCrypt
    public void setPassword(String password) {
        this.password = password;
    }
}