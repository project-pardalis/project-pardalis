package com.mycompany.looca.api.pardalis;

public class Componente {

    private String nome;
    private Integer isValido;
    private String descricao;
    private Integer fkMaquina;
    private Integer fkEmpresa;
    public Componente(String nome, String descricao, Integer fkMaquina) {
        this.nome = nome;
        this.isValido = 1;
        this.descricao = descricao;
        this.fkMaquina = fkMaquina;
        this.fkEmpresa = 1;
    }

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

}
