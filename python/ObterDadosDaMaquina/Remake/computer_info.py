import os
import platform
import psutil as ps
import socket

# Transforma bytes em GB
def transform_to_gb(value: int, n_decimal=2):
    return round(value / pow(1024, 3), n_decimal)

# Transforma bytes em MB
def transform_to_mb(value: int, n_decimal=2):
    return round(value / pow(1024, 2), n_decimal)

# Retorna o tipo da CPU
def get_cpu_type_linux():
    data = [
        {
            'type': 'Núcleo(s) por soquete',
            'value': None
        },
        {
            'type': 'Nome do modelo',
            'value': None
        },
        {
            'type': 'Arquitetura',
            'value': None
        },
        {
            'type': 'Thread(s) per núcleo',
            'value': None
        }
    ]
    cpu_data = (os.popen("lscpu").read()).split("\n")

    for i in range(len(cpu_data)):
        cpu_data[i] = (cpu_data[i].strip()).split(':')

    necessary_data = {
        'portuguese': ['Núcleo(s) por soquete', 'Nome do modelo', 'Arquitetura', 'Thread(s) per núcleo'],
        'english': ['Core(s) per socket', 'Model name', 'Architecture', 'Thread(s) per core']
    }

    for j in necessary_data:
        for k in range(len(necessary_data[j])):
            try:
                for l in range(len(cpu_data)):
                    if cpu_data[l][0] == necessary_data[j][k]:
                        data[k]['value'] = cpu_data[l][1].strip()
            except:
                print("Não foi encontrado as especificações do computador.")

    return data

def get_cpu_type_windows():
    data = [
        {
            'type': 'Núcleo(s) por soquete',
            'value': None
        },
        {
            'type': 'Nome do modelo',
            'value': None
        },
        {
            'type': 'Arquitetura',
            'value': None
        },
        {
            'type': 'Thread(s) per núcleo',
            'value': None
        }
    ]
    commands = [
        {
            'numberofcores': None,
        }, {
            'name': None,
        },
        {
            'architecture': None,
        },
        {
            'numberoflogicalprocessors': None,
        }
    ]

    for i in range(len(commands)):
        key = list(commands[i].keys())[0]
        result = (os.popen("wmic cpu get " + key).read()).split("\n")
        result = filter_result(result)
        data[i]['value'] = result
    return data
    
def filter_result(result: list):
    new_result = []
    for i in range(len(result)):
        if result[i] != "":
            new_result.append(result[i].strip())
    return new_result[1]

# Retorna as informações da CPU
def get_cpu_info():
    if platform.system() == "Linux":
        cpu_type = get_cpu_type_linux()
        temperature = ps.sensors_temperatures()['coretemp'][0].current
    elif platform.system() == "Windows":
        cpu_type = get_cpu_type_windows()
        temperature = -500
    
    return {
        'cpu_type': cpu_type,
        'cpu_Temperature': temperature,
        'cpu_Frequencia_Atual': ps.cpu_freq().current,
        'cpu_Frequencia_Minima': ps.cpu_freq().min,
        'cpu_Frequencia_Maxima': ps.cpu_freq().max,
        'cpu_Utilizacao': ps.cpu_percent()
    }

# Retorna Informações da Memória RAM
def get_memory_info():
    memory = ps.virtual_memory()
    return {
        'ram_Total': transform_to_gb(memory.total),
        'ram_Disponivel': transform_to_gb(memory.available),
        'ram_Usada': transform_to_gb(memory.used)
    }

# Retorna as informações do disco
def get_disk_info():
    disk = ps.disk_usage('/')

    return {
        'disco_Total': transform_to_gb(disk.total),
        'disco_Usado': transform_to_gb(disk.used),
        'free_disk': transform_to_gb(disk.free),
        'disco_read_time': ps.disk_io_counters().read_time >> 15,
        'disco_write_time': ps.disk_io_counters().write_time >> 15
    }

# Retorna as informações da rede
def get_network_info():
    network = ps.net_io_counters()

    return {
        'mb_sent': transform_to_mb(network.bytes_sent),
        'mb_received': transform_to_mb(network.bytes_recv),
        'host_name': socket.gethostname(),
        'internet_ip': socket.gethostbyname(socket.gethostname())
    }

# Retorna as informações do sistema
def get_system_info():
    return {
        'system': platform.system(),
        'release': platform.release(),
        'version': platform.version()
    }

# Função principal que retorna todos os dados
def get_all_info():
    return {
        'cpu': get_cpu_info(),
        'ram': get_memory_info(),
        'disco': get_disk_info(),
        'network': get_network_info(),
        'system': get_system_info()
    }
