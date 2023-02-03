package com.dcconnect.minimizingwaste.api.exceptionhandler;

import lombok.Getter;

@Getter
public enum ProblemType {

	ACCESS_DENIED("/acesso-negado", "Acesso negado"),
	INVALID_DATA("/dados-invalidos", "Dados inválidos"),
	SYSTEM_ERROR("/erro-de-sistema", "Erro De sistema"),
	INVALID_PARAMETER("/parametro-invalido", "Parâmetro Inválido"),
	INCOMPREHENSIBLE_MESSAGE("/mensagem-incompreensivel", "Mensagem Incompreensível"),
	RESOURCE_NOT_FOUND("/recurso-nao-encontrado", "Recurso Não Encontrado"),
	ENTITY_IN_USE("/entidade-em-uso", "Entidade em uso"),
	DUPLICATE_ENTITY("/entidade-duplicada", "Entidade Duplicada"),
	BUSINESS_ERROR("/erro-negocio", "Violação de Regra de Negócio");

	
	private String title;
	private String uri;
	
	ProblemType(String path, String title) {
		this.uri = "https://enfatiza7.com" + path;
		this.title = title;
	}
	
}
