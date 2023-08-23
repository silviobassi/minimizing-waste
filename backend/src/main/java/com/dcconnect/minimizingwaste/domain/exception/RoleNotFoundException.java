package com.dcconnect.minimizingwaste.domain.exception;

public class RoleNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public RoleNotFoundException(String message) {
        super(message);
    }

    public RoleNotFoundException(Long accessGroupId) {
        this(String.format("Não existe um cadastro de role com código %d", accessGroupId));
    }
}
