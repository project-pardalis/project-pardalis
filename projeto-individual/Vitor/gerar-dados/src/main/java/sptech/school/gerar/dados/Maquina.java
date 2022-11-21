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

    private Integer idMaquina;

    private String nomeMaquina;
    private String sistemaOperacional;
    private String dataCriacao;
    private String hashMaquina;
    private Integer fkEmpresa;

    public Maquina(Integer idMaquina, String nomeMaquina, String sistemaOperacional, String hashMaquina) {
        this.idMaquina = idMaquina;
        this.nomeMaquina = nomeMaquina;
        this.sistemaOperacional = sistemaOperacional;
        this.hashMaquina = hashMaquina;
        this.dataCriacao = "2022-01-01";
        this.fkEmpresa = 1;
    }

    public Integer getId() { return idMaquina; }

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

    @Override
    public String toString() {
        return "Maquina{" +
                "idMaquina=" + idMaquina +
                ", nomeMaquina='" + nomeMaquina + '\'' +
                ", sistemaOperacional='" + sistemaOperacional + '\'' +
                ", dataCriacao='" + dataCriacao + '\'' +
                ", hashMaquina='" + hashMaquina + '\'' +
                ", fkEmpresa=" + fkEmpresa +
                '}';
    }
}
