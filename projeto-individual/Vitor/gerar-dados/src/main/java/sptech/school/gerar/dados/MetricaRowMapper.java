/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

/**
 *
 * @author aluno
 */
public class MetricaRowMapper implements RowMapper<Metrica> {
    
        @Override
        public Metrica mapRow(ResultSet rs, int rowNum) throws SQLException {
            Metrica metrica = new Metrica();
            metrica.setIdMetrica(rs.getInt("idMetrica"));
            metrica.setNomeMetrica(rs.getString("nomeMetrica"));
            metrica.setUnidadeMedida(rs.getString("unidadeDeMedida"));
            metrica.setIsEstatico(rs.getBoolean("isEstatico"));
            return metrica;
        }
    
}
