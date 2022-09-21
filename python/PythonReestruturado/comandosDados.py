import os, platform, psutil as ps, socket


def transform_to_gb(value, n_decimal=0):
    return round(value / pow(1024, 3), n_decimal)

def transform_to_mb(value, n_decimal=0):
    return round(value / pow(1024, 2), n_decimal)

def get_cpu_type():
    cpu_data = (os.popen("lscpu").read()).split("\n")
    for i in range(len(cpu_data)):
        cpu_data[i] = (cpu_data[i].strip()).split(':')

    necessary_data = {
        'portuguese': ['Núcleo(s) por soquete', 'Nome do modelo', 'Arquitetura', 'Thread(s) per núcleo'],
        'english': ['Core(s) per socket', 'Model name', 'Architecture', 'Thread(s) per core']
    }
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

    for j in necessary_data:
            for k in necessary_data[j]:
                try:
                    index = cpu_data.index(necessary_data[j][k])
                    data[index]['value'] = cpu_data[index][1].strip()
                except:
                    pass
        
    return data

def get_cpu_info():
    cpu_type = get_cpu_type()
    temperature = ps.sensors_temperatures()['coretemp'][0].current

    return {
        'cpu_type': cpu_type,
        'temperature': temperature,
        'atual_freq': ps.cpu_freq().current,
        'min_freq': ps.cpu_freq().min,
        'max_freq': ps.cpu_freq().max,
        'arch': platform.machine(),
        'atual_percent': ps.cpu_percent()
    }

def get_memory_info():
    memory = ps.virtual_memory()

    return {
        'total_memory': transform_to_gb(memory.total),
        'available_memory': transform_to_gb(memory.available),
        'used_memory': transform_to_gb(memory.used)
    }

def get_disk_info():
    disk = ps.disk_usage('/')

    return {
        'total_disk': transform_to_gb(disk.total),
        'used_disk': transform_to_gb(disk.used),
        'free_disk': transform_to_gb(disk.free),
        'read_time': ps.disk_io_counters().read_time >> 15,
        'write_time': ps.disk_io_counters().write_time >> 15
    }

def get_network_info():
    network = ps.net_io_counters()

    return {
        'mb_sent': transform_to_mb(network.bytes_sent),
        'mb_received': transform_to_mb(network.bytes_recv),
        'host_name': socket.gethostname(),
        'internet_ip': socket.gethostbyname(socket.gethostname())
    }

def get_system_info():
    return {
        'system': platform.system(),
        'release': platform.release(),
        'version': platform.version()
    }

def get_all_info():
    return {
        'cpu': get_cpu_info(),
        'memory': get_memory_info(),
        'disk': get_disk_info(),
        'network': get_network_info(),
        'system': get_system_info()
    }