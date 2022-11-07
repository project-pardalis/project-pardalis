package school.sptech.conexao.banco;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ConexaoSqlServer {
    
    public static void main(String[] args) {
        
        String connectionUrl = 
                "jdbc:sqlserver://svr-pardalis.database.windows.net:1433;"
                        + "database=pardalis;"
                        + "user=pardalis@svr-pardalis;"
                        + "password=#urubu100;"
                        + "encrypt=true;"
                        + "trustServerCertificate=false;";
        
        ResultSet resultSet = null;
        String text = "";
        Integer cont = 1;
        
        try (Connection connection = DriverManager.getConnection(connectionUrl);
                Statement statement = connection.createStatement();) {
            
            String selectSql = "INSERT INTO [dbo].[Empresa] (nomeEmpresa, cnpjEmpresa) VALUES ('teste','12345678901234')";
            
            if (selectSql.indexOf("SELECT") != -1 && selectSql.indexOf("INSERT") == -1) {
            resultSet = statement.executeQuery(selectSql);
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
                statement.execute(selectSql);
                System.out.println("Instrução Executada");
            }
            
            System.out.println(text);
            
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }
        
    }
    
}
