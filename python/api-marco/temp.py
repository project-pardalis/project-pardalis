from gpiozero import CPUTemperature

cpu = CPUTemperature()
print(cpu.temperature)

