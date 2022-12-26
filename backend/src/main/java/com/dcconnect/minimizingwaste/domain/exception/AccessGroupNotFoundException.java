package com.dcconnect.minimizingwaste.domain.exception;

public class AccessGroupNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public AccessGroupNotFoundException(String message) {
        super(message);
    }

    public AccessGroupNotFoundException(Long accessGroupId) {
        this(String.format("Não existe um cadastro de grupo de acesso com código %d", accessGroupId));
    }
}
