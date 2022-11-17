/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

import java.sql.Date;

/**
 *
 * @author aluno
 */
public class Leitura {
    
        private Integer fkComponente;
        private Integer fkMetrica;
        private Integer fkMaquina;
        private Integer fkEmpresa;
        private Date dataColeta;
        private Double valorLeitura;

    public Leitura(Integer fkComponente, Integer fkMetrica, Integer fkMaquina, Date dataColeta, Double valorLeitura) {
        this.fkComponente = fkComponente;
        this.fkMetrica = fkMetrica;
        this.fkMaquina = fkMaquina;
        this.fkEmpresa = 1;
        this.dataColeta = dataColeta;
        this.valorLeitura = valorLeitura;
    }

    public Integer getFkComponente() {
        return fkComponente;
    }

    public Integer getFkMetrica() {
        return fkMetrica;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public Date getDataColeta() {
        return dataColeta;
    }

    public Double getValorLeitura() {
        return valorLeitura;
    }
        
        
    
}
