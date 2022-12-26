package com.dcconnect.minimizingwaste.domain.exception;

public class PermissionNotFoundException extends EntityNotFoundException{


    private static final long serialVersionUID = 1L;

    public PermissionNotFoundException(String message) {
        super(message);
    }

    public PermissionNotFoundException(Long permissionId) {
        this(String.format("Não existe um cadastro de permissão com código %d", permissionId));
    }
}