package com.dcconnect.minimizingwaste.domain.exception;

public class UserPhotoNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public UserPhotoNotFoundException(String message) {
        super(message);
    }

    public UserPhotoNotFoundException(Long userId) {
        this(String.format("Não existe um cadastro de foto com código %d", userId));
    }
}
