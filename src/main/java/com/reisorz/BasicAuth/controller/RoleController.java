package com.reisorz.BasicAuth.controller;

import com.reisorz.BasicAuth.persistence.entity.RoleEntity;
import com.reisorz.BasicAuth.persistence.service.RoleEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("basic-auth")
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {

    @Autowired
    private RoleEntityService roleEntityService;

    @GetMapping("/get-role-by-id/{id}")
    public RoleEntity getRoleById(@PathVariable Long id) {
        return roleEntityService.searchRoleById(id);
    }

    @GetMapping("/get-roles")
    public List<RoleEntity> getRoles() {
        return  roleEntityService.listRoles();
    }
}
