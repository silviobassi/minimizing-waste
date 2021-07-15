package com.dcconnect.minimizingwaste.domain.exception;

public class SuppliesMovementNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public SuppliesMovementNotFoundException(String message) {
        super(message);
    }

    public SuppliesMovementNotFoundException(Long movimentorecursoId) {
        this(String.format("Não existe um movimento de recurso com código %d", movimentorecursoId));
    }
}
