/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

import java.util.ArrayList;
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
    private List<ComponenteHasMetrica> compHasMetrica;

    private List<Metrica> metricas;
        
    public Main() {
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://svr-pardalis.database.windows.net:1433;databaseName=pardalis");
        dataSource.setUsername("pardalis");
        dataSource.setPassword("#urubu100");
        
        maquinas = jdbcTemplate.query("SELECT * FROM [dbo].[Maquina]", new MaquinaRowMapper());
        componentes = jdbcTemplate.query("SELECT * FROM [dbo].[Componente]", new ComponenteRowMapper());
        compHasMetrica = jdbcTemplate.query("SELECT * FROM [dbo].[Componente_has_Metrica]", new ComponenteHasMetricaRowMapper());
        metricas = jdbcTemplate.query("SELECT * FROM [dbo].[Metrica]", new MetricaRowMapper());
    }
    
    JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    
    public void criarMaquinas() {
        System.out.println("Criando Maquinas...");
        while (maquinas.size() < 8) {
            String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            String hex = "";
            for (int x = 0; x < 12; x++) {
                hex += chars.charAt((int) Math.floor(Math.random() * 36));
            }
            Maquina maquina = new Maquina(maquinas.size()+1,"Maquina Projeto"+maquinas.size(),"Linux", hex);
            maquinas.add(maquina);
            jdbcTemplate.update(String.format(
                    "INSERT INTO [dbo].[Maquina] "
                    + "(nomeMaquina, sistemaOperacional, onCloud, dataCriacao, hashMaquina, fkEmpresa) VALUES" +
                            " ('%s', '%s', 1, null, '%s', 1)"
                    ,maquina.getNomeMaquina(), maquina.getSistemaOperacional(), hex)
            );
            System.out.println("Maquina inserida no Banco");
        }  
    }
    
    public void criarComponentes() {

        System.out.println("Criando Componentes...");

        List<String> comps = new ArrayList();

        comps.add("cpu");
        comps.add("ram");
        comps.add("disco");

        for (Maquina maq : maquinas) {
            int cont = 0;
            for (Componente comp : componentes) {
                if (comp.getFkMaquina().equals(maq.getId())) {
                    cont++;
                }
            }
            while (cont < 3) {
                Componente componente = new Componente(componentes.size()+1, comps.get(cont), null, maq.getId());
                componentes.add(componente);
                jdbcTemplate.update(String.format("INSERT INTO [dbo].[Componente] " +
                        "(nomeComponente, isComponenteValido, descricao, fkMaquina, fkEmpresa) VALUES " +
                        "('%s', 1, null, %d, 1)", comps.get(cont), maq.getId()));
                cont++;
                System.out.println("Componente Inserido");
            }
        }
    }

    public void criarComponenteHasMetrica() {

        System.out.println("Criando Componentes relacionados a metricas...");

        for (Componente componente : componentes) {
            for (Metrica metrica : metricas) {
                if (metrica.getNomeMetrica().contains(componente.getNome())) {
                    ComponenteHasMetrica compHM = new ComponenteHasMetrica(componente.getId(), metrica.getId(),
                            componente.getFkMaquina(), 1);
                    compHasMetrica.add(compHM);
                    jdbcTemplate.update(String.format("INSERT INTO [dbo].[Componente_has_Metrica] " +
                            "(fkComponente, fkMetrica, fkMaquina, fkEmpresa) VALUES " +
                            "(%d, %d, %d , 1)", componente.getId(), metrica.getId(), componente.getFkMaquina()));
                }
            }
        }

        System.out.println(compHasMetrica);

        }
    }
