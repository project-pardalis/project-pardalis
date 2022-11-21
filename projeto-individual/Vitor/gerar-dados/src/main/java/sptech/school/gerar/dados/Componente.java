/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

/**
 *
 * @author aluno
 */
public class Componente {

    private Integer idComponente;
    private String nome;
    private Integer isValido;
    private String descricao;
    private Integer fkMaquina;
    private Integer fkEmpresa;
    
    public Componente(Integer id,String nome, String descricao, Integer fkMaquina) {
        this.idComponente = id;
        this.nome = nome;
        this.isValido = 1;
        this.descricao = descricao;
        this.fkMaquina = fkMaquina;
        this.fkEmpresa = 1;
    }

    public Integer getId() { return idComponente; }

    public String getNome() {
        return nome;
    }

    public Integer getIsValido() {
        return isValido;
    }

    public String getDescricao() {
        return descricao;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }
    
    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    @Override
    public String toString() {
        return "Componente{" +
                "idComponente=" + idComponente +
                ", nome='" + nome + '\'' +
                ", isValido=" + isValido +
                ", descricao='" + descricao + '\'' +
                ", fkMaquina=" + fkMaquina +
                ", fkEmpresa=" + fkEmpresa +
                '}';
    }
}
