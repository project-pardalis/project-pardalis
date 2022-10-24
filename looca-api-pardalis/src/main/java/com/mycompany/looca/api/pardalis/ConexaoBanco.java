/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.looca.api.pardalis;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author aluno
 */


public class ConexaoBanco {
   
        private JdbcTemplate conexaoBanco;
        
        public ConexaoBanco(){
        
        BasicDataSource datasource = new BasicDataSource();
        
        datasource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        
        datasource.setUrl("jdbc:mysql://127.0.0.1:3306/PARDALIS");
        
        datasource.setUsername("aluno");
        
        datasource.setPassword("sptech");
        
        
        conexaoBanco = new JdbcTemplate(datasource);
        
        }
    
        
        
        
    public JdbcTemplate getConnection() {
        return  conexaoBanco;
    }
    
}
