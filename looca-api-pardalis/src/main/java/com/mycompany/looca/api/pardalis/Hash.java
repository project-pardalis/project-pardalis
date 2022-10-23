/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.looca.api.pardalis;

/**
 *
 * @author rafaelraposo
 */
import static com.mycompany.looca.api.pardalis.App.jdbcTemplate;
import java.util.List;
import java.util.Map;


public class Hash {

    public Boolean hashExists(Integer hash) {
      
        String query = "SELECT * FROM Maquina WHERE hashMaquina=?;"; 
        List<Map<String, Object>> data = selectHash(query, hash); 
        
  
        
        return !data.isEmpty();
        
    }
    
    public List<Map<String, Object>> selectHash(String query, Integer hash){ 
       return jdbcTemplate.queryForList(query, hash) ; 
    }
}
