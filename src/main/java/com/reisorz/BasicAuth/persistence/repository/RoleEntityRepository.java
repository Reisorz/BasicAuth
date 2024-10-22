package com.reisorz.BasicAuth.persistence.repository;

import com.reisorz.BasicAuth.persistence.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.management.relation.Role;

@Repository
public interface RoleEntityRepository extends JpaRepository<RoleEntity, Long> {
}
