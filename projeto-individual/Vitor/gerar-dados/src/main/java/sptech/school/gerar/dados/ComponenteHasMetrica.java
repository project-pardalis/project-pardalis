package sptech.school.gerar.dados;

public class ComponenteHasMetrica {

    private Integer fkComponente;
    private Integer fkMetrica;
    private Integer fkMaquina;
    private Integer fkEmpresa;

    public ComponenteHasMetrica(Integer fkComponente, Integer fkMetrica, Integer fkMaquina, Integer fkEmpresa) {
        this.fkComponente = fkComponente;
        this.fkMetrica = fkMetrica;
        this.fkMaquina = fkMaquina;
        this.fkEmpresa = fkEmpresa;
    }

    public Integer getFkComponente() {
        return fkComponente;
    }

    public void setFkComponente(Integer fkComponente) {
        this.fkComponente = fkComponente;
    }

    public Integer getFkMetrica() {
        return fkMetrica;
    }

    public void setFkMetrica(Integer fkMetrica) {
        this.fkMetrica = fkMetrica;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }

    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    @Override
    public String toString() {
        return "ComponenteHasMetrica{" +
                "fkComponente=" + fkComponente +
                ", fkMetrica=" + fkMetrica +
                ", fkMaquina=" + fkMaquina +
                ", fkEmpresa=" + fkEmpresa +
                '}';
    }
}
