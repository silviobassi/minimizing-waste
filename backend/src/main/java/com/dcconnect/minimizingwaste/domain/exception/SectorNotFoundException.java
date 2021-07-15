package com.dcconnect.minimizingwaste.domain.exception;

public class SectorNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public SectorNotFoundException(String message) {
        super(message);
    }

    public SectorNotFoundException(Long sectorid) {
        this(String.format("Não existe um cadastro de setor com código %d", sectorid));
    }
}
