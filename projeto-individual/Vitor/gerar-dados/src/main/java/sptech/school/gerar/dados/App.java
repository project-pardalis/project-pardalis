/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

import java.util.List;

/**
 *
 * @author aluno
 */
public class App {
    
    public static void main(String[] args) {
        
        Main main  = new Main();

        main.gerarDados();

//        List<Maquina> maquinas = main.jdbcTemplate.query("SELECT * FROM [dbo].[Maquina]", new MaquinaRowMapper());
//        List<Componente> componentes = main.jdbcTemplate.query("SELECT * FROM [dbo].[Componente]", new ComponenteRowMapper());
//        List<ComponenteHasMetrica> compHasMetricas = main.jdbcTemplate.query("SELECT * FROM [dbo].[Componente_has_Metrica]", new ComponenteHasMetricaRowMapper());
//
//        System.out.println(compHasMetricas);
//        System.out.println(componentes);
    }
    
}
