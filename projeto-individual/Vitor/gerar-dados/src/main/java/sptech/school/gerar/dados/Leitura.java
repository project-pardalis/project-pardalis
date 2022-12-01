/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

import java.time.LocalDateTime;

/**
 *
 * @author aluno
 */
public class Leitura {

        private Integer idLeitura;
        private Integer fkComponente;
        private Integer fkMetrica;
        private Integer fkMaquina;
        private Integer fkEmpresa;
        private String dataColeta;
        private Double valorLeitura;

    public Leitura(Integer idLeitura, Integer fkComponente, Integer fkMetrica, Integer fkMaquina, String dataColeta, Double valorLeitura) {
        this.idLeitura = idLeitura;
        this.fkComponente = fkComponente;
        this.fkMetrica = fkMetrica;
        this.fkMaquina = fkMaquina;
        this.fkEmpresa = 1;
        this.dataColeta = dataColeta;
        this.valorLeitura = valorLeitura;
    }

    public Integer getIdLeitura() { return idLeitura; }

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

    public String getDataColeta() {
        return dataColeta;
    }

    public Double getValorLeitura() {
        return valorLeitura;
    }

    @Override
    public String toString() {
        return "Leitura{" +
                "idLeitura=" + idLeitura +
                ", fkComponente=" + fkComponente +
                ", fkMetrica=" + fkMetrica +
                ", fkMaquina=" + fkMaquina +
                ", fkEmpresa=" + fkEmpresa +
                ", dataColeta=" + dataColeta +
                ", valorLeitura=" + valorLeitura +
                '}';
    }
}
