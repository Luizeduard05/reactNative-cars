package com.revisao_carro.services;

import com.revisao_carro.entities.Agendamento;
import com.revisao_carro.entities.Usuario;
import com.revisao_carro.repositories.AgendamentoRepository;
import com.revisao_carro.repositories.UsuarioRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {
    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Carrega agendamentos do usuário com base no e-mail, gera um arquivo Excel e retorna como ByteArrayInputStream.
    public ByteArrayInputStream loadByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Sort sort = Sort.by("data").descending();
        List<Agendamento> agendamentos = agendamentoRepository.findByUsuarioId(usuario.getId(), sort);
        if (agendamentos.isEmpty()) {
            return null;
        }
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Agendamentos");
            Row headerRow = sheet.createRow(0);
            String[] headers = { "Data", "Hora", "Serviço", "Modelo do Carro", "Usuário" };
            for (int i = 0; i < headers.length; i++) {
                headerRow.createCell(i).setCellValue(headers[i]);
            }
            int rowNum = 1;
            for (Agendamento agendamento : agendamentos) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(agendamento.getData().toString());
                row.createCell(1).setCellValue(agendamento.getHora().toString());
                row.createCell(2).setCellValue(agendamento.getServico());
                row.createCell(3).setCellValue(agendamento.getModeloCarro());
                row.createCell(4).setCellValue(agendamento.getUsuario() != null ? agendamento.getUsuario().getNome() : "N/A");
            }
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }





}
