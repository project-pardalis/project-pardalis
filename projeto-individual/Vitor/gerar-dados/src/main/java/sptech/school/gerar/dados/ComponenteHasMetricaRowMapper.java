package sptech.school.gerar.dados;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ComponenteHasMetricaRowMapper implements RowMapper<ComponenteHasMetrica> {

    @Override
    public ComponenteHasMetrica mapRow(ResultSet rs, int numRow) throws SQLException {
        ComponenteHasMetrica compHasMetrica = new ComponenteHasMetrica(rs.getInt("fkComponente"),
                rs.getInt("fkMetrica"), rs.getInt("fkMaquina"),rs.getInt("fkEmpresa"));
        return compHasMetrica;
    }

}
