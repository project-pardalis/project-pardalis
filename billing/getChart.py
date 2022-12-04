import matplotlib.pyplot as plt
import numpy as np


VAL_TRIMESTRE = 7.8
T2_SYSTEM = 0.023
HOURS = 0


def getValDayT2():
    global T2_SYSTEM, HOURS

    return T2_SYSTEM * HOURS


def getValMonthT2():
    return getValDayT2()*30


def plotChartCustYear():
    ycust = [round(i*getValMonthT2(), 2) for i in range(12)]
    xlab = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    plt.plot(xlab, ycust)
    plt.title("Custo x Mês")
    plt.savefig('chart-month-cust.pdf')

    return ycust


def plotChartCustSem():
    print(getValDayT2())
    ycust = [round(i*getValDayT2()*7, 2) for i in range(7)]

    xlab = ["Domingo", "Segunda", "Terça",
            "Quarta", "Quinta", "Sexta", "Sábado"]

    plt.plot(xlab, ycust)
    plt.title("Custo x Semana")

    plt.savefig('chart-sem-cust.pdf')
    return ycust


def main():
    global T2_SYSTEM, HOURS
    print("Insira o valor da sua T2")
    T2_SYSTEM = input()

    print("Insira quantas horas ela fica ligada por DIA")
    HOURS = input()

    T2_SYSTEM = float(T2_SYSTEM)
    HOURS = int(HOURS)
    plotChartCustSem()


main()
