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
    atual_freq = round(ps.cpu_freq().current * 100 / ps.cpu_freq().max, 2)
    min_freq =  ps.cpu_freq().min
    max_freq = ps.cpu_freq().max
    arch = platform.machine()
    atual_porcentage = ps.cpu_percent()

    return {
        'cpu_type': cpu_type,
        'temperature': temperature,
        'atual_freq': atual_freq,
        'min_freq': min_freq,
        'max_freq': max_freq,
        'arch': arch,
        'atual_percent': atual_porcentage
    }

def get_memory_info():
    memory = ps.virtual_memory()
    total_memory = transform_to_gb(memory.total)
    available_memory = transform_to_gb(memory.available)
    used_memory = transform_to_gb(memory.used)

    return {
        'total_memory': total_memory,
        'available_memory': available_memory,
        'used_memory': used_memory
    }

def get_disk_info():
    disk = ps.disk_usage('/')
    total_disk = transform_to_gb(disk.total)
    used_disk = transform_to_gb(disk.used)
    free_disk = transform_to_gb(disk.free)
    read_time = ps.disk_io_counters().read_time >> 15
    write_time = ps.disk_io_counters().write_time >> 15

    return {
        'total_disk': total_disk,
        'used_disk': used_disk,
        'free_disk': free_disk,
        'read_time': read_time,
        'write_time': write_time
    }

def get_network_info():
    network = ps.net_io_counters()
    sent = transform_to_mb(network.bytes_sent)
    received = transform_to_mb(network.bytes_recv)
    host_name = socket.gethostname()
    internet_ip = socket.gethostbyname(socket.gethostname())

    return {
        'sent': sent,
        'received': received,
        'host_name': host_name,
        'internet_ip': internet_ip
    }