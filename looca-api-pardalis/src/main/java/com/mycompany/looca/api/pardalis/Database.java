/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.looca.api.pardalis;

import static com.mycompany.looca.api.pardalis.App.jdbcTemplate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.checkerframework.checker.units.qual.Length;

/**
 *
 * @author rafaelraposo
 */
public class Database {

    DateTimeFormatter dataModel = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();

    public void insertMaquina(String sistemaOperacional, String fabricante, Integer hash, Integer fkEmpresa, Boolean exists) {
        if(exists) { 
        String dataColeta = dataModel.format(now);
        jdbcTemplate.update("INSERT INTO Maquina VALUES (null, ? , ? , 0, ?, ?, ? )",
                sistemaOperacional, fabricante, dataColeta, hash, fkEmpresa);    
        }
        else { 
            System.out.println("Maquina já existe ");
        }
        
        
    }
    
    public void insertComponente(Integer fkMaquina, Integer fkEmpresa) {

        // sem sistema anti-repetição 
        List<String> components = new ArrayList();
        components.add("cpu");
        components.add("ram");
        components.add("disco");

        for (String i : components) {
            System.out.println("Componente " + i + " sendo criado");
            jdbcTemplate.update("INSERT INTO Componente VALUES (null, ? , ?, null, ?, ?);",
                    i, 1, fkMaquina, fkEmpresa);
        }
    }

    public void insertMetricaComponente(Integer fkComponente, Integer fkMetrica, Integer fkMaquina, Integer fkEmpresa, Integer valorLeitura, Integer type) {

        String dataColeta = dataModel.format(now);
        String query = "INSERT INTO Leitura VALUES (null, ?, ? , ?, ?, ?, ?);";
        // faltou o outro insert 

        jdbcTemplate.update(query, fkComponente, fkMetrica, fkMaquina, fkEmpresa, dataColeta, valorLeitura);

    }

}
