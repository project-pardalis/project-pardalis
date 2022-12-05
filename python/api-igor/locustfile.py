from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def index_page(self):
        self.client.get(url="/verVideo")

    @task
    def slow_page(self):
        self.client.get(url="/comentando")

