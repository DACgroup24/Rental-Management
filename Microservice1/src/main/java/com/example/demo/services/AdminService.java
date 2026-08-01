package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;

@Service
public class AdminService {

    @Autowired
    private UserRepo repo;

    // Pending landlords
    public List<User> getPendingLandlords() {
        return repo.findByRoleRidAndStatus(3, false);
    }

    // Approve landlord
    public User approveLandlord(int uid) {

        User user = repo.findById(uid).orElse(null);

        if (user != null) {
            user.setStatus(true);
            return repo.save(user);
        }

        return null;
    }

    // Reject landlord
    public void rejectLandlord(int uid) {
        repo.deleteById(uid);
    }

}