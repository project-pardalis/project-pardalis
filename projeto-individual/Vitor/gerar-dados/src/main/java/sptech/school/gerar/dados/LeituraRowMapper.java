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
public class LeituraRowMapper implements RowMapper<Leitura>{
    
    @Override
    public Leitura mapRow(ResultSet rs, int rowNum) throws SQLException {
        Leitura leitura = new Leitura(rs.getInt("idLeitura"), rs.getInt("fkComponente"), rs.getInt("fkMetrica"),
                rs.getInt("fkMaquina"), rs.getString("dataColeta"), rs.getDouble("valorLeitura"));
        return leitura;
    }
    
}
