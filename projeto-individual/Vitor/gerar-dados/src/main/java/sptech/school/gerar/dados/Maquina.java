/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

/**
 *
 * @author aluno
 */
public class Maquina {
    
    private String nomeMaquina;
    private String sistemaOperacional;
    private String dataCriacao;
    private String hashMaquina;
    private Integer fkEmpresa;

    public Maquina(String nomeMaquina, String sistemaOperacional, String hashMaquina) {
        this.nomeMaquina = nomeMaquina;
        this.sistemaOperacional = sistemaOperacional;
        this.hashMaquina = hashMaquina;
        this.dataCriacao = "2022-01-01";
        this.fkEmpresa = 1;
    }

    public String getNomeMaquina() {
        return nomeMaquina;
    }

    public String getSistemaOperacional() {
        return sistemaOperacional;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public String getHashMaquina() {
        return hashMaquina;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }
    
    
    
}
