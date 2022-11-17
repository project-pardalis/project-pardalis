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
public class ComponenteRowMapper implements RowMapper<Componente> {
    
    @Override
    public Componente mapRow(ResultSet rs, int rowNum) throws SQLException {
        Componente componente = new Componente(rs.getString("nomeComponente"), 
                rs.getArray("descricao").toString(),rs.getInt("fkMaquina"));
        return componente;
    }
    
}
