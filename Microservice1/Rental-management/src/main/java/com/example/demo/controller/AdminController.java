package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.User;
import com.example.demo.services.AdminService;

@RestController
@RequestMapping("/admin")
//@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/landlords/pending")
    public List<User> getPendingLandlords() {

        return adminService.getPendingLandlords();

    }

    @PutMapping("/approve/{uid}")
    public User approve(@PathVariable int uid) {

        return adminService.approveLandlord(uid);

    }

    @DeleteMapping("/reject/{uid}")
    public void reject(@PathVariable int uid) {

        adminService.rejectLandlord(uid);

    }

}