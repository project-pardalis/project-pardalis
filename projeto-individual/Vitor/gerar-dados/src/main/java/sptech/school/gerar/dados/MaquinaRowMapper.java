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
public class MaquinaRowMapper implements RowMapper<Maquina> {
    
    @Override
    public Maquina mapRow(ResultSet rs, int rowNum) throws SQLException {
        Maquina maquina = new Maquina(rs.getString("nomeMaquina"),
                rs.getString("sistemaOperacional"),rs.getString("hashMaquina"));
        return maquina;
    }
    
}
