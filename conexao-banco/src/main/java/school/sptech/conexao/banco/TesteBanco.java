/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package school.sptech.conexao.banco;

import java.sql.Connection;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartFrame;
import org.jfree.chart.JFreeChart;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.data.jdbc.JDBCPieDataset;

/**
 *
 * @author aluno
 */
public class TesteBanco {
    
    public static void main(String[] args) {
         ConexaoBanco conexao = new ConexaoBanco();
         JdbcTemplate con = conexao.getConnection();
         
         
         StringBuilder criarTexto = new StringBuilder();
         
        criarTexto.append("INSERT INTO aluno VALUES(2, 'teste de banco', 'CCO')");
        
        
        
        con.execute(criarTexto.toString());

       
        //Create the chart
    JFreeChart chart = ChartFactory.createPieChart(
      "Bug Stat Pie Chart", pieDataset, true, true, true);

    //Render the frame
    ChartFrame chartFrame = new ChartFrame("JDPC Pie Chart", chart);
    chartFrame.setVisible(true);
    chartFrame.setSize(420, 300);
    }
}
