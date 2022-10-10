/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package school.sptech.conexao.banco;

import java.sql.Connection;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author aluno
 */
public class TesteBanco {
    
    public static void main(String[] args) {
         ConexaoBanco conexao = new ConexaoBanco();
         JdbcTemplate con = conexao.getConnection();
         
         
         StringBuilder criarTexto = new StringBuilder();
         
        criarTexto.append("INSERT INTO aluno VALUES(2, 'teste de banco', 'CCO')");
        
        
        
        con.execute(criarTexto.toString());

         
    }
}
