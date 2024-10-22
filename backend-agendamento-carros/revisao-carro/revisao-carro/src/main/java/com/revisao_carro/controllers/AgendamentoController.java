package com.revisao_carro.controllers;

import com.revisao_carro.dtos.AgendamentoEditRequestDTO;
import com.revisao_carro.dtos.AgendamentoRequestDTO;
import com.revisao_carro.entities.Agendamento;
import com.revisao_carro.infra.security.TokenService;
import com.revisao_carro.services.AgendamentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;
    @Autowired
    private TokenService tokenService;

    // Cria um novo agendamento com base no token de autenticação e nos dados fornecidos.
    @PostMapping(value = "/agendamentos", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Agendamento> criarAgendamento(@RequestHeader("Authorization") String authHeader, @RequestBody @Valid AgendamentoRequestDTO dto) {
        String token = authHeader.replace("Bearer ", ""); // Extrai o token do cabeçalho.
        String email = tokenService.getUsernameFromToken(token); // Obtém o email a partir do token.
        Agendamento agendamento = agendamentoService.cadastrarAgendamento(email, dto);
        return ResponseEntity.ok(agendamento);
    }

    // Lista os agendamentos do usuário com base no e-mail extraído do token de autenticação.
    @GetMapping("/agendamentos")
    public ResponseEntity<List<Agendamento>> listarAgendamentosPorEmail(
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", ""); // Extrai o token do cabeçalho.
        String email = tokenService.getUsernameFromToken(token); // Obtém o email a partir do token.
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosPorEmail(email);
        return ResponseEntity.ok(agendamentos);
    }

    // Edita um agendamento existente pelo ID e retorna uma mensagem de sucesso ou erro.
    @PutMapping(value = "/agendamentos/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> editarAgendamento(@PathVariable Integer id, @RequestBody @Valid AgendamentoEditRequestDTO dto) {
        try {
            agendamentoService.editarAgendamento(id, dto);
            return ResponseEntity.ok("Agendamento editado com sucesso!");
        } catch (RuntimeException ex) {
            if (ex.getMessage().equals("Agendamento não encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado");
            } else if (ex.getMessage().equals("Não é possível editar este agendamento, pois já foi realizado")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Não é possível editar este agendamento");
            } else {
                throw ex;
            }
        }
    }

    // Deleta um agendamento pelo ID e retorna uma mensagem de sucesso ou erro.
    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<String> deletarAgendamento(@PathVariable Integer id) {
        try {
            agendamentoService.deletarAgendamento(id);
            return ResponseEntity.ok("Agendamento deletado com sucesso!");
        } catch (RuntimeException ex) {
            if (ex.getMessage().equals("Agendamento não encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado");
            } else if (ex.getMessage().equals("Não é possível excluir este agendamento")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
            } else {
                throw ex;
            }
        }
    }

    // Marca um agendamento como realizado e retorna uma mensagem de sucesso ou erro.
    @PutMapping("concluirAgendamento/{id}")
    public ResponseEntity<String> concluirAgendamento(@PathVariable Integer id) {
        try {
            Agendamento agendamentoConcluido = agendamentoService.marcarComoRealizado(id);
            return ResponseEntity.ok("Agendamento concluído com sucesso!");
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Agendamento não encontrado.")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado.");
            } else if (e.getMessage().equals("Agendamento já foi concluído.")) {
                return ResponseEntity.badRequest().body("Agendamento já foi concluído.");
            } else {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }


}