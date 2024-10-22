package com.revisao_carro.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public record AgendamentoRequestDTO(
        @NotNull(message = "Data inválida")  // validação de campo.
        LocalDate data,
        @NotNull(message = "Hora inválida")  // validação de campo.
        LocalTime hora,
        @NotBlank
        @Size(min = 10, message = "o campo serviço deve ter pelo menos 10 caracteres")  // validação de campo.
        String servico,
        @NotBlank
        @Size(min = 3, message = "o campo modelo deve ter pelo menos 3 caracteres")  // validação de campo.
        String modeloCarro,
        Boolean realizado) {


    // Formatação da Hora.
    public String horaFormatted() {
        return hora == null ? null : hora.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    // Formatação da Data.
    public String dataFormatted() {
        return data == null ? null : data.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
}
