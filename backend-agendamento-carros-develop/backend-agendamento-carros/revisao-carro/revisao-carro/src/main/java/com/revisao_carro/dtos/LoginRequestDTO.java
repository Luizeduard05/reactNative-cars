package com.revisao_carro.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record LoginRequestDTO(
        @NotBlank(message = "Email é obrigatório") // validação de campo.
        @Email(message = "Email inválido") // validação de campo.
        String email,
        @NotEmpty(message = "A senha não pode estar vazia.") // validação de campo.
        @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres") // validação de campo.
        String senha) {

}