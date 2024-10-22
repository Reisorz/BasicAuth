package com.reisorz.BasicAuth.controller;

import com.reisorz.BasicAuth.persistence.entity.RoleEntity;
import com.reisorz.BasicAuth.persistence.entity.UserEntity;
import com.reisorz.BasicAuth.persistence.service.RoleEntityService;
import com.reisorz.BasicAuth.persistence.service.UserDetailsServiceImpl;
import com.reisorz.BasicAuth.persistence.service.UserEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("basic-auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserEntityService userEntityService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private RoleEntityService roleEntityService;


    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody UserEntity user){
        userEntityService.saveUser(user);
        System.out.println("User registered: " + user);
        return user;
    }

    @GetMapping("/get-users-list")
    public List<UserEntity> getUsers (){
        return userEntityService.listUsers();
    }


}
