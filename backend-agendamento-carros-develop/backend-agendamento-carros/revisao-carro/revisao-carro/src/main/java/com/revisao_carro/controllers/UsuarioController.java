package com.revisao_carro.controllers;


import com.revisao_carro.dtos.CadastroRequestDTO;
import com.revisao_carro.entities.Usuario;
import com.revisao_carro.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    // Cadastra um novo usuário e retorna o usuário criado com status 201 (CREATED).
    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody @Valid CadastroRequestDTO body) {
        Usuario usuario = usuarioService.cadastrarUsuario(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }
}
