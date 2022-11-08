package com.mycompany.looca.api.pardalis;

import com.github.britooo.looca.api.core.Looca;
import org.checkerframework.checker.units.qual.A;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class teste {

    public static void main(String[] args) {

        String connectionUrl =
                "jdbc:sqlserver://svr-pardalis.database.windows.net:1433;"
                        + "database=pardalis;"
                        + "user=pardalis@svr-pardalis;"
                        + "password=#urubu100;"
                        + "encrypt=true;"
                        + "trustServerCertificate=false;";

        Looca looca = new Looca();

        ResultSet resultSet = null;
        String sqlIns = "SELECT * FROM [dbo].[Componente_Has_Metrica]";

        try (Connection connection = DriverManager.getConnection(connectionUrl);
             Statement statement = connection.createStatement();) {
            resultSet = statement.executeQuery(sqlIns);
            System.out.println(resultSet.last());

        }
        catch(SQLException e) {
            e.printStackTrace();
        }

    }

}
