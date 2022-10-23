/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */
package com.mycompany.looca.api.pardalis;

import com.github.britooo.looca.api.core.Looca;
import static java.lang.System.exit;

import java.util.Scanner;

import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author rafaelraposo
 */
public class App {

    static JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public static void main(String[] args) throws InterruptedException {

        Config conf = new Config();
        Scanner in = new Scanner(System.in);
        Database db = new Database();
        Looca looca = new Looca();
        Hash isHash = new Hash();
        Integer choose;
        conf.configuration();
        while (true) {
            System.out.println("1 - Cadastrar Máquina \n 2 - Ver dados  \n  0 - Encerrar ");
            choose = in.nextInt();
            switch (choose) {
                case 1:

                    System.out.println("Insira uma hash code para sua máquina ");
                    Integer hashUser = in.nextInt();

                    if (isHash.hashExists(hashUser)) {
                        System.out.println("Sua máquina já está cadastrada!!");
                    } else {
                        db.insertMaquina(looca.getSistema().getSistemaOperacional(), looca.getSistema().getFabricante(), hashUser, 1, true);
                        db.insertMetricaComponente(1, 1, 1, 1, 1, 1);
                        db.insertComponente(1, 1);
                        System.out.println("Máquina cadastrada! ");
                    }
                    break;
                case 2:
                    Integer i =0 ; 
                    while (i < 20) {

                        System.out.println(looca.getSistema() + "\n");
                        System.out.println(looca.getProcessador() + "\n");
                        System.out.println(looca.getTemperatura() + "\n");
                        System.out.println(looca.getMemoria());
                        i++; 
                        Thread.sleep(5000);

                    }
                    break;

                case 0:
                    System.out.println("Encerrando... ");
                    exit(0); 
            }
        }
    }
}
