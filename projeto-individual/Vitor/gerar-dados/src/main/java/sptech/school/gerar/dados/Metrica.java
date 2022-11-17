/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

/**
 *
 * @author aluno
 */
public class Metrica {
    
    private String nomeMetrica;
    private String unidadeMedida;
    private Boolean isEstatico;

    public String getNomeMetrica() {
        return nomeMetrica;
    }

    public void setNomeMetrica(String nomeMetrica) {
        this.nomeMetrica = nomeMetrica;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Boolean getIsEstatico() {
        return isEstatico;
    }

    public void setIsEstatico(Boolean isEstatico) {
        this.isEstatico = isEstatico;
    }
    
}
