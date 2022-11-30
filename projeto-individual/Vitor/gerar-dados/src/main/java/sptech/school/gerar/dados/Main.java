/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.school.gerar.dados;

import java.util.*;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author aluno
 */
public class Main {

    private final BasicDataSource dataSource = new BasicDataSource();
    private final BasicDataSource dataSourceLocal = new BasicDataSource();
    private final List<Maquina> maquinas;
    private final List<Componente> componentes;
    private final List<ComponenteHasMetrica> compHasMetrica;

    private final List<Leitura> leituras;

    private final List<Metrica> metricas;
        
    public Main() {
            dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            dataSource.setUrl("jdbc:sqlserver://svr-pardalis.database.windows.net:1433;databaseName=pardalis");
            dataSource.setUsername("pardalis");
            dataSource.setPassword("#urubu100");

            maquinas = jdbcTemplate.query("SELECT * FROM [dbo].[Maquina]", new MaquinaRowMapper());
            componentes = jdbcTemplate.query("SELECT * FROM [dbo].[Componente]", new ComponenteRowMapper());
            compHasMetrica = jdbcTemplate.query("SELECT * FROM [dbo].[Componente_has_Metrica]", new ComponenteHasMetricaRowMapper());
            metricas = jdbcTemplate.query("SELECT * FROM [dbo].[Metrica]", new MetricaRowMapper());
            leituras = jdbcTemplate.query("SELECT TOP 1 * FROM [dbo].[Leitura] ORDER BY idLeitura DESC", new LeituraRowMapper());

            dataSourceLocal.setDriverClassName("com.mysql.cj.jdbc.Driver");
            dataSourceLocal.setUrl("jdbc:mysql://127.0.0.1:3306/bancoLocal");
            dataSourceLocal.setUsername("aluno");
            dataSourceLocal.setPassword("sptech");
        
    }
    
    JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    JdbcTemplate jdbcTemplateLocal = new JdbcTemplate(dataSourceLocal);
    public void criarMaquinas() {
        System.out.println("Criando Maquinas...");
        while (maquinas.size() < 8) {
            String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder hex = new StringBuilder();
            for (int x = 0; x < 12; x++) {
                hex.append(chars.charAt((int) Math.floor(Math.random() * 36)));
            }
            Maquina maquina = new Maquina(maquinas.size()+1,"Maquina Projeto"+maquinas.size(),"Linux", hex.toString());
            maquinas.add(maquina);
            jdbcTemplate.update(String.format(
                    "INSERT INTO [dbo].[Maquina] "
                    + "(nomeMaquina, sistemaOperacional, onCloud, dataCriacao, hashMaquina, fkEmpresa) VALUES" +
                            " ('%s', '%s', 1, null, '%s', 1)"
                    ,maquina.getNomeMaquina(), maquina.getSistemaOperacional(), hex)
            );
            System.out.println("Maquina inserida no Banco");
        }  
    }
    
    public void criarComponentes() {

        System.out.println("Criando Componentes...");

        List<String> comps = new ArrayList<>();

        comps.add("cpu");
        comps.add("ram");
        comps.add("disco");

        for (Maquina maq : maquinas) {
            int cont = 0;
            for (Componente comp : componentes) {
                if (comp.getFkMaquina().equals(maq.getId())) {
                    cont++;
                }
            }
            while (cont < 3) {
                Componente componente = new Componente(componentes.size()+1, comps.get(cont), null, maq.getId());
                componentes.add(componente);
                jdbcTemplate.update(String.format("INSERT INTO [dbo].[Componente] " +
                        "(nomeComponente, isComponenteValido, descricao, fkMaquina, fkEmpresa) VALUES " +
                        "('%s', 1, null, %d, 1)", comps.get(cont), maq.getId()));
                cont++;
                System.out.println("Componente Inserido");
            }
        }
    }

    public void criarComponenteHasMetrica() {

        System.out.println("Criando Componentes relacionados a metricas...");

            for (Componente componente : componentes) {
                int cont = 0;
                for (ComponenteHasMetrica compHasMet : compHasMetrica) {
                    if (compHasMet.getFkComponente().equals(componente.getId())) {
                        cont++;
                    }
                }
                while (cont < 11) {
                        ComponenteHasMetrica compHM = new ComponenteHasMetrica(componente.getId(), metricas.get(cont).getId(),
                                componente.getFkMaquina(), 1);
                        compHasMetrica.add(compHM);
                        jdbcTemplate.update(String.format("INSERT INTO [dbo].[Componente_has_Metrica] " +
                                "(fkComponente, fkMetrica, fkMaquina, fkEmpresa) VALUES " +
                                "(%d, %d, %d , 1)", componente.getId(), metricas.get(cont).getId(), componente.getFkMaquina()));
                        cont++;
                    System.out.println("Componente_has_Metrica Inserido");
                    }
                }
            }

            public void gerarDados() {

                String data = leituras.get(0).getDataColeta();
                List<Integer> dataFormatada = formatarData(data);

                int anoS = dataFormatada.get(0);
                int mesS = dataFormatada.get(1);
                int diaS = dataFormatada.get(2);
                int horaS = dataFormatada.get(3);
                int minutoS = dataFormatada.get(4);
                int segundoS = dataFormatada.get(5);

                Random gerador = new Random(1234);

                while (true) {
                    for (ComponenteHasMetrica compHasMet : compHasMetrica) {
                        double valor = 0;
                        if (compHasMet.getFkMetrica() == 1) {
                            if (horaS >= 12 && horaS < 17) {
                                valor = gerador.nextDouble() * (95-70) + 70;
                            } else {
                                valor = gerador.nextDouble() * (75-50) + 50;
                            }
                        } else if (compHasMet.getFkMetrica() == 3) {
                            if (horaS >= 12 && horaS < 17) {
                                valor = gerador.nextDouble() * (4500-3500) + 3500;
                            } else {
                                valor = gerador.nextDouble() * (3750-1000) + 1000;
                            }
                        } else if (compHasMet.getFkMetrica() == 4) {
                            if (horaS >= 12 && horaS < 17) {
                                valor = gerador.nextDouble() * (98-80) + 80;
                            } else {
                                valor = gerador.nextDouble() * (85-60) + 60;
                            }
                        } else if (compHasMet.getFkMetrica() == 7) {
                            if (horaS >= 12 && horaS < 17) {
                                valor = gerador.nextDouble() * (16-12) + 12;
                            } else {
                                valor = gerador.nextDouble() * (12-6) + 6;
                            }
                        } else if (compHasMet.getFkMetrica() == 9) {
                            if (horaS >= 12 && horaS < 17) {
                                valor = gerador.nextDouble() * (400-270) + 270;
                            } else {
                                valor = gerador.nextDouble() * (500-350) + 350;
                            }
                        } else if (compHasMet.getFkMetrica() == 10) {
                            if (horaS >= 12 && horaS < 17) {
                                valor = gerador.nextDouble() * (250-170) + 170;
                            } else {
                                valor = gerador.nextDouble() * (180-120) + 120;
                            }
                        } else if (compHasMet.getFkMetrica() == 11) {
                            if (horaS >= 12 && horaS < 17) {
                                valor = gerador.nextDouble() * (3800-2800) + 2800;
                            } else {
                                valor = gerador.nextDouble() * (3000-2000) + 2000;
                            }
                        }
                        if (valor != 0) {
                            String dateTime = String.format("%d-%d-%d %d:%d:%d",anoS,mesS,diaS,horaS,minutoS,segundoS);
                            jdbcTemplateLocal.update(String.format(Locale.US,"INSERT INTO Leitura " +
                                    "(fkComponente, fkMetrica, fkMaquina, fkEmpresa, dataColeta, valorLeitura) VALUES" +
                                    "(%d, %d, %d, %d, '%s', %.1f)",
                                    compHasMet.getFkComponente(), compHasMet.getFkMetrica(),
                                    compHasMet.getFkMaquina(), compHasMet.getFkEmpresa(),
                                    dateTime, valor));
                            System.out.println("dado inserido no banco");

                            List<Leitura> dataAtual = jdbcTemplateLocal.query("SELECT * FROM Leitura ORDER BY idLeitura DESC LIMIT 1", new LeituraRowMapper());
                            List<Leitura> dataInicial = jdbcTemplateLocal.query("SELECT * FROM Leitura LIMIT 1", new LeituraRowMapper());

                            String dataIn = dataInicial.get(0).getDataColeta();
                            String dataAt = dataAtual.get(0).getDataColeta();

                            List<Integer> dataFormatIn = formatarData(dataIn);
                            List<Integer> dataFormat = formatarData(dataAt);

                            Integer diaAtual = dataFormat.get(2);
                            Integer mesAtual = dataFormat.get(1);

                            Integer diaInicial = dataFormatIn.get(2);
                            Integer mesInicial = dataFormatIn.get(1);

                            if (diaAtual.equals(diaInicial) && mesAtual.equals(diaInicial+1)) {
                                gerarSummary(dataInicial.get(0).getIdLeitura(), dataAtual.get(0).getIdLeitura());
                            }
                        }
                    }
                    segundoS++;
                    if (segundoS == 60) {
                        segundoS = 0;
                        minutoS++;
                    } else if (minutoS == 60) {
                        minutoS = 0;
                        horaS++;
                    } else if (horaS == 24) {
                        horaS = 0;
                        diaS++;
                    } else if (diaS == 32) {
                        diaS = 1;
                        mesS++;
                    } else if (mesS == 13) {
                        mesS = 1;
                        anoS++;
                    }
                }
            }

            public List formatarData(String data) {

                char[] ano = new char[4];
                char[] mes = new char[2];
                char[] dia = new char[2];
                char[] hora = new char[2];
                char[] minuto = new char[2];
                char[] segundo = new char[2];

                data.getChars(0,4,ano,0);
                data.getChars(5,7,mes,0);
                data.getChars(8,10,dia,0);
                data.getChars(11,13,hora,0);
                data.getChars(14,16,minuto,0);
                data.getChars(17,19,segundo,0);

                int anoS = Integer.parseInt(new String(ano));
                int mesS = Integer.parseInt(new String(mes));
                int diaS = Integer.parseInt(new String(dia));
                int horaS = Integer.parseInt(new String(hora));
                int minutoS = Integer.parseInt(new String(minuto));
                int segundoS = Integer.parseInt(new String(segundo));

                List<Integer> dataFormat = new ArrayList();

                dataFormat.add(anoS);
                dataFormat.add(mesS);
                dataFormat.add(diaS);
                dataFormat.add(horaS);
                dataFormat.add(minutoS);
                dataFormat.add(segundoS);

                return dataFormat;
            }

            public void gerarSummary(Integer idInicial, Integer idFinal) {

            }
    }
