package com.dcconnect.minimizingwaste.domain.exception;

public class PropertyNotFoundException extends EntityNotFoundException{

	private static final long serialVersionUID = 1L;

	public PropertyNotFoundException(String message) {
		super(message);
	}
	
	public PropertyNotFoundException(Long propertyId) {
		this(String.format("Não existe um cadastro de propriedade com código %d", propertyId));
	}
	
}
