package com.reisorz.BasicAuth.persistence.service;


import com.reisorz.BasicAuth.persistence.entity.RoleEntity;

public interface IRoleEntityService {

    public RoleEntity searchRoleById(Long roleId);
}
