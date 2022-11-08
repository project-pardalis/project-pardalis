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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author aluno
 */
public class ConexaoSqlServer {
    
    private String serverName;
    private String database;
    private String username;
    private String password;

    DateTimeFormatter dataModel = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    
    public ConexaoSqlServer(String serverName, String database, String username, String password) {
        this.serverName = serverName;
        this.database = database;
        this.username = username;
        this.password = password;
    }

    String connectionUrl = "jdbc:sqlserver://"+serverName+".database.windows.net:1433;"
            + "database="+database+";"
            + "user="+database+"@"+serverName+";"
            + "password="+password+";"
            + "encrypt=true;"
            + "trustServerCertificate=false;";
    
    public String execute(String query) {
        
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

    public String getHash(String nome) {
        return execute(String.format("SELECT hashMaquina FROM [dbo].[Maquina] WHERE nomeMaquina = '%s'",nome));
    }

    public void insertMaquina(String so, Integer hash, Integer fkEmpresa) {

        String dataColeta = dataModel.format(now);
        execute(String.format("INSERT INTO [dbo].[Maquina] (nomeMaquina, sistemaOperacional, oncloud, dataCriacao, hashMaquina, fkEmpresa)" +
                "VALUES (%s, %s, %b, %s, %s, %d)", so+"-"+hash,so,1,dataColeta,hash,1));

    }

    public void insertComponente(Componente processador, Componente disco, Componente memoria) {

        List<Componente> componentes = new ArrayList();

        componentes.add(processador);
        componentes.add(disco);
        componentes.add(memoria);

        for (int x = 0; x < componentes.size(); x++) {
            execute(String.format("INSERT INTO [dbo].[Componente] (nomeComponente, isComponenteValido, descricao, [fkMaquina], fkEmpresa)" +
                    " VALUES (%s, %d, %s, %d, 1)", componentes.get(x).getNome(), 1,componentes.get(x).getDescricao(), componentes.get(x).getFkMaquina()));
        }

    }

    public void insertComponenteMetrica() {

        ResultSet resultSet = null;
        String sqlIns = "SELECT * FROM [dbo].[Componente_Has_Metrica]";

        try (Connection connection = DriverManager.getConnection(connectionUrl);
             Statement statement = connection.createStatement();) {
            resultSet = statement.executeQuery(sqlIns);


        }
        catch(SQLException e) {
            e.printStackTrace();
        }

    }
    
}
