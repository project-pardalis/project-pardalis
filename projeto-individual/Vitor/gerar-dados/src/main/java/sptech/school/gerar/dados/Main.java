/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

import java.util.List;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author aluno
 */
public class Main {
    
    private BasicDataSource dataSource = new BasicDataSource();
    private List<Maquina> maquinas;
    private List<Componente> componentes;
        
    public Main() {
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://svr-pardalis.database.windows.net:1433;databaseName=pardalis");
        dataSource.setUsername("pardalis");
        dataSource.setPassword("#urubu100");
        
        maquinas = jdbcTemplate.query("SELECT * FROM [dbo].[Maquina]", new MaquinaRowMapper());
        componentes = jdbcTemplate.query("SELECT * FROM [dbo].[Componente]", new ComponenteRowMapper());
    }
    
    JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    
    public void criarMaquinas() {
        
        while (maquinas.size() < 50) {
            String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            String hex = "";
            for (int x = 0; x < 12; x++) {
                hex += chars.charAt((int) Math.floor(Math.random() * 36));
            }
            Maquina maquina = new Maquina("Maquina Projeto"+maquinas.size(),"Linux", hex);
            maquinas.add(maquina);
            jdbcTemplate.update(String.format("INSERT INTO [dbo].[Maquina] "
                    + "(nomeMaquina, sistemaOperacional, onCloud, dataCriacao, hashMaquina, fkEmpresa) VALUES ('%s', '%s', 1, null, '%s', 1)"
                    ,maquina.getNomeMaquina(), maquina.getSistemaOperacional(), hex));
            System.out.println("Maquina inserida no Banco");
        }  
    }
    
    public void criarComponentes() {
        
        
        
    }
    
}
