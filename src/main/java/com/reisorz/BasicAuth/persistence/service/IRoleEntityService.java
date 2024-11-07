package com.reisorz.BasicAuth.persistence.service;


import com.reisorz.BasicAuth.persistence.entity.RoleEntity;

import java.util.List;

public interface IRoleEntityService {

    public RoleEntity searchRoleById(Long roleId);

    public List<RoleEntity> listRoles();
}
