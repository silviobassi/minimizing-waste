package com.dcconnect.minimizingwaste.api.exceptionhandler;

import lombok.Getter;

@Getter
public enum ProblemType {

	ACCESS_DENIED("/access-denied", "Acesso negado"),
	INVALID_DATA("/invalid-data", "Dados inválidos"),
	SYSTEM_ERROR("/system-error", "Erro De sistema"),
	INVALID_PARAMETER("/invalid-parameter", "Parâmetro Inválido"),
	INCOMPREHENSIBLE_MESSAGE("/incomprehensible-message", "Mensagem Incompreensível"),
	RESOURCE_NOT_FOUND("/resource-not-found", "Recurso Não Encontrado"),
	ENTITY_IN_USE("/entity-in-use", "Entidade em uso"),
	DUPLICATE_ENTITY("/duplicate-entity", "Entidade Duplicada"),
	BUSINESS_ERROR("/business-error", "Violação de Regra de Negócio");

	
	private String title;
	private String uri;
	
	ProblemType(String path, String title) {
		this.uri = "https://enfatiza7.com" + path;
		this.title = title;
	}
	
}
