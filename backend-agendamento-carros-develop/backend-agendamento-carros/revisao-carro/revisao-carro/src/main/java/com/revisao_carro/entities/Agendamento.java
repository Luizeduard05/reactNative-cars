package com.revisao_carro.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "agendamentos")
@Setter
@Getter
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento")
    private Integer id;

    @Column(name = "data_agendamento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate data;

    @Column(name = "hora_agendamento")
    private String hora;

    @Column(name = "servico_agendamento")
    private String servico;

    @Column(name = "modelo_carro")
    private String modeloCarro;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column
    private Boolean realizado;

    public void setHoraFromLocalTime(LocalTime localTime) {
        this.hora = localTime == null ? null : localTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
