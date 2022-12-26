package com.dcconnect.minimizingwaste.domain.exception;

public class AssignmentNotFoundException extends EntityNotFoundException{


	private static final long serialVersionUID = 1L;

	public AssignmentNotFoundException(String message) {
        super(message);
    }

    public AssignmentNotFoundException(Long taskId) {
        this(String.format("Não existe um cadastro de tarefa com código %d", taskId));
    }
}
