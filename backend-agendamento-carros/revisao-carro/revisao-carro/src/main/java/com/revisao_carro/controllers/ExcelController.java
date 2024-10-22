package com.revisao_carro.controllers;

import com.revisao_carro.infra.security.TokenService;
import com.revisao_carro.services.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;


@RestController
@RequestMapping("/api")
public class ExcelController {
    @Autowired
    private ExcelService excelService;

    @Autowired
    private TokenService tokenService;

    // Função para fazer download de um arquivo Excel com os agendamentos do usuário.
    @GetMapping("/downloadAgendamentos")
    public ResponseEntity<InputStreamResource> exportToExcel(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = tokenService.getUsernameFromToken(token);

        // Gera o arquivo Excel com os agendamentos do usuário através do email
        ByteArrayInputStream byteArrayInputStream = excelService.loadByEmail(email);

        // Verifica se o arquivo foi gerado. Se não, retorna um status 404.
        if (byteArrayInputStream == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Configura os cabeçalhos da resposta para definir o arquivo como um anexo para download.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=agendamentos_usuario.xlsx");

        // Cria um recurso de input stream com o arquivo gerado.
        InputStreamResource resource = new InputStreamResource(byteArrayInputStream);

        // Retorna a resposta com o arquivo Excel, os cabeçalhos e o tipo de conteúdo adequado para download.
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

}