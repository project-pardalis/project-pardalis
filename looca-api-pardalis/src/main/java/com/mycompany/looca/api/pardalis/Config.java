/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.looca.api.pardalis;

import static com.mycompany.looca.api.pardalis.App.jdbcTemplate;
import org.apache.commons.dbcp2.BasicDataSource;

/**
 *
 * @author rafaelraposo
 */
public class Config {

    public void configuration() {
        BasicDataSource dataSource = new BasicDataSource();
        jdbcTemplate.setDataSource(dataSource);
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/PARDALIS");
        dataSource.setUsername("standart");
        dataSource.setPassword("MIrai123@");
    }

}
