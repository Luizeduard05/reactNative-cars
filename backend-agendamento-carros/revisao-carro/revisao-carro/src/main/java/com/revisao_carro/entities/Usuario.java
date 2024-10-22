package com.revisao_carro.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;


import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "usuarios")
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="nome_usuario")
    private String nome;

    @Column(name="telefone_usuario")
    private String telefone;

    @Column(name="email_usuario")
    private String email;

    @Column(name="senha_usuario")
    private String senha;

    @JsonManagedReference
    @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Agendamento> agendamentos;

}
