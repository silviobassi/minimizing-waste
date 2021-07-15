package com.dcconnect.minimizingwaste.domain.exception;

public class SuppliesNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public SuppliesNotFoundException(String message) {
        super(message);
    }

    public SuppliesNotFoundException(Long recursoId) {
        this(String.format("Não existe um cadastro de recursos com código %d", recursoId));
    }
}
