package com.reisorz.BasicAuth.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "permissions")
public class PermissionEntity {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long permissionId;

    @Column(unique = true, nullable = false, updatable = false)
    private String permissionName;
}
