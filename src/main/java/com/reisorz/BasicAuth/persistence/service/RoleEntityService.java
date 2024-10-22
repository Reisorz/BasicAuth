package com.reisorz.BasicAuth.persistence.service;

import com.reisorz.BasicAuth.persistence.entity.RoleEntity;
import com.reisorz.BasicAuth.persistence.repository.RoleEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleEntityService implements IRoleEntityService{

    @Autowired
    private RoleEntityRepository roleEntityRepository;

    @Override
    public RoleEntity searchRoleById(Long roleId) {
        return roleEntityRepository.findById(roleId).orElse(null);
    }
}
