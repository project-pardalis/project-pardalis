import pandas as pd
import numpy as np
from scalecast.Forecaster import Forecaster
from pmdarima import auto_arima
import matplotlib.pyplot as plt
import seaborn as sns
# definindo chart
sns.set(rc={'figure.figsize': (14, 7)})

# lendo csv
df = pd.read_csv('python/costs.csv')

# construtor do forecaster
f = Forecaster(y=df['costs'], current_dates=df['date'])

# gerando 30 dias  +  modo de estimativa (arima) + testes
f.generate_future_dates(30)
f.set_estimator('arima')
stat, pval, _, _, _, _ = f.adf_test(full_res=True)


# gerando a ordem que deve ser feito + sasionalidade + definindo LINHA LARANJA do chart (+ precisao na def. menor range )
f.manual_forecast(order=(1, 1, 1), seasonal_order=(
    2, 1, 1, 12), call_me='arima2')

# sumario com dados da regressao

print(f.regr.summary())


# plotando forecast arima & salvando pdf
f.plot(ci=True, models='arima2')
plt.savefig('ARIMA_CUSTS.pdf')
plt.title(' FORECAST AWS: MODELO ARIMA', size=14)
plt.show()
