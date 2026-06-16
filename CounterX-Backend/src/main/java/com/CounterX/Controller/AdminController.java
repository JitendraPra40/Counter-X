package com.CounterX.Controller;

import com.CounterX.dto.AdminDTO;
import com.CounterX.dto.LoginDTO;
import com.CounterX.entity.Admin;
import com.CounterX.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService service;

    // Register Admin
    @PostMapping("/register")
    public Admin register(@Valid @RequestBody AdminDTO dto) {
        return service.registerAdmin(dto);
    }

    // Login Admin
    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginDTO dto) {
        return service.login(dto);
    }

    // Get Admin By ID
    @GetMapping("/{id}")
    public Admin getAdmin(@PathVariable Long id) {
        return service.getAdmin(id);
    }

    // Get All Admins
    @GetMapping
    public List<Admin> getAllAdmins() {
        return service.getAllAdmins();
    }

    // Update Admin
    @PutMapping("/{id}")
    public Admin updateAdmin(
            @PathVariable Long id,
            @Valid @RequestBody AdminDTO dto) {

        return service.updateAdmin(id, dto);
    }

    // Delete Admin
    @DeleteMapping("/{id}")
    public String deleteAdmin(@PathVariable Long id) {

        service.deleteAdmin(id);

        return "Admin Deleted Successfully";
    }
}