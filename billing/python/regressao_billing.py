

import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from scipy import stats
import seaborn as sns

fig, ax = plt.subplots()
sns.set(rc={'figure.figsize': (14, 7)})
df = pd.read_csv('python/costs.csv')

x = [i+1 for i in range(len(df['costs'].tolist()))]

y = df['costs'].tolist()
date = df['date'].tolist()

xlab = ['2022-09-01', '2022-09-09', '2022-10-09',
        '2022-11-01', '2022-11-20', '2022-12-04']



slope, intercept, r, p, std_err = stats.linregress(x, y)


def myfunc(x):
    return slope * x + intercept


mymodel = list(map(myfunc, x))


plt.plot(x, mymodel)
ax.set_xticklabels(xlab)
plt.xlabel('Datas')
plt.ylabel("Valores")
plt.title("FORECAST AWS: MODELO REGRESSÃO LINEAR")
plt.savefig('REG_LINEAR_CUSTS.pdf')
plt.show()
