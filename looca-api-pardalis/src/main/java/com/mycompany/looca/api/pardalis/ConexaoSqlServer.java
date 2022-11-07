/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.looca.api.pardalis;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author aluno
 */
public class ConexaoSqlServer {
    
    private String serverName;
    private String database;
    private String username;
    private String password;
    
    public ConexaoSqlServer(String serverName, String database, String username, String password) {
        this.serverName = serverName;
        this.database = database;
        this.username = username;
        this.password = password;
    }
    
    public String execute(String query) {
        
        String connectionUrl = "jdbc:sqlserver://"+serverName+".database.windows.net:1433;"
                        + "database="+database+";"
                        + "user="+database+"@"+serverName+";"
                        + "password="+password+";"
                        + "encrypt=true;"
                        + "trustServerCertificate=false;";
        
        ResultSet resultSet = null;
        String text = "";
        Integer cont = 0;
        
        try (Connection connection = DriverManager.getConnection(connectionUrl);
                Statement statement = connection.createStatement();) {
            
            String sqlIns = query;
            
            if (query.indexOf("SELECT") != -1 && query.indexOf("INSERT") == -1) {
                resultSet = statement.executeQuery(sqlIns);
                resultSet.next();
                for (int x = 0; x < 20; x++) {
                    try {
                        text += resultSet.getString(x)+" ";
                    }
                    catch(Exception e) {
                        break;
                    }
                }
            } else {
                statement.execute(sqlIns);
                System.out.println("Instrucao Executada");
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return text;
    }
    
}
