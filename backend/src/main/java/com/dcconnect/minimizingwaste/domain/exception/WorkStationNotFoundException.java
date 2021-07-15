package com.dcconnect.minimizingwaste.domain.exception;

public class WorkStationNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public WorkStationNotFoundException(String message) {
        super(message);
    }

    public WorkStationNotFoundException(Long estacaoTrabalhoId) {
        this(String.format("Não existe um cadastro de estação de trabalho com código %d", estacaoTrabalhoId));
    }
}
