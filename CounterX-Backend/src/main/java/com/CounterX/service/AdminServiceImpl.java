package com.CounterX.service;

import com.CounterX.dto.AdminDTO;
import com.CounterX.dto.LoginDTO;
import com.CounterX.entity.Admin;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.AdminRepository;
import com.CounterX.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    // Register Admin
    @Override
    public Admin registerAdmin(AdminDTO dto) {

        if (repository.count() >= 2) {
            throw new RuntimeException("Only 2 Admins are allowed");
        }

        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        Admin admin = new Admin();
        admin.setUsername(dto.getUsername());
        admin.setEmail(dto.getEmail());
        admin.setPassword(dto.getPassword());

        return repository.save(admin);
    }

    // Login Admin
    @Override
    public String login(LoginDTO dto) {

        Admin admin = repository.findByUsername(dto.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Username"));

        if (!admin.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return jwtUtil.generateToken(admin.getUsername());
    }

    // Get Admin By ID
    @Override
    public Admin getAdmin(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin Not Found"));
    }

    // Get All Admins
    @Override
    public List<Admin> getAllAdmins() {

        return repository.findAll();
    }

    // Update Admin
    @Override
    public Admin updateAdmin(Long id, AdminDTO dto) {

        Admin admin = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin Not Found"));

        if (!admin.getEmail().equals(dto.getEmail())
                && repository.existsByEmail(dto.getEmail())) {

            throw new RuntimeException("Email already registered");
        }

        admin.setUsername(dto.getUsername());
        admin.setEmail(dto.getEmail());
        admin.setPassword(dto.getPassword());

        return repository.save(admin);
    }

    // Delete Admin
    @Override
    public void deleteAdmin(Long id) {

        Admin admin = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin Not Found"));

        repository.delete(admin);
    }
}