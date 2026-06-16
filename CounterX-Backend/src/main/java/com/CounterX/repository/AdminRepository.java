package com.CounterX.repository;

import com.CounterX.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Find Admin By Username
    Optional<Admin> findByUsername(String username);

    // Find Admin By Email
    Optional<Admin> findByEmail(String email);

    // Check Email Exists
    boolean existsByEmail(String email);
}