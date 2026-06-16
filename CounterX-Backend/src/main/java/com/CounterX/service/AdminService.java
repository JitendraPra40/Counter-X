package com.CounterX.service;

import com.CounterX.dto.AdminDTO;
import com.CounterX.dto.LoginDTO;
import com.CounterX.entity.Admin;

import java.util.List;

public interface AdminService {

    // Register Admin
    Admin registerAdmin(AdminDTO dto);

    // Login Admin
    String login(LoginDTO dto);

    // Get Admin By ID
    Admin getAdmin(Long id);

    // Get All Admins
    List<Admin> getAllAdmins();

    // Update Admin
    Admin updateAdmin(
            Long id,
            AdminDTO dto);

    // Delete Admin
    void deleteAdmin(Long id);
}