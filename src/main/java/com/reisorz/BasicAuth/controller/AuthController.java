package com.reisorz.BasicAuth.controller;

import com.reisorz.BasicAuth.persistence.entity.UserEntity;
import com.reisorz.BasicAuth.persistence.service.RoleEntityService;
import com.reisorz.BasicAuth.persistence.service.UserDetailsServiceImpl;
import com.reisorz.BasicAuth.persistence.service.UserEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login-pass")
    public boolean passMatch(@RequestBody UserEntity user) {
        UserEntity userDB = userEntityService.findUserEntityByUsername(user.getUsername()).orElse(null);

        if(passwordEncoder.matches(user.getPassword(),userDB.getPassword())){
            return true;
        }else {
            return false;
        }
    }


    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody UserEntity user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntityService.saveUser(user);
        System.out.println("User registered: " + user);
        return user;
    }

    @GetMapping("/get-users-list")
    public List<UserEntity> getUsers (){
        return userEntityService.listUsers();
    }

    @GetMapping("get-user-by-username/{username}")
    public UserEntity findUserByUsername(@PathVariable String username) {
        return userEntityService.findUserEntityByUsername(username).orElse(null);
    }

    @GetMapping("get-user-by-id/{userId}")
    public UserEntity getUserById(@PathVariable Long userId) {
        return userEntityService.searchUserById(userId).orElse(null);
    }

    @PutMapping("edit-user")
    public ResponseEntity<UserEntity> editUser (@RequestBody UserEntity user) {
        userEntityService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("delete-user/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser (@PathVariable Long id) {
        UserEntity user = userEntityService.searchUserById(id).orElse(null);
        if (user != null) {
            userEntityService.deleteUser(id);
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.FALSE);
            return ResponseEntity.ok(response);
        }

    }

}
