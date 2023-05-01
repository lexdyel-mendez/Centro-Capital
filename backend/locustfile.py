from locust import HttpUser, task, between


class MyUser(HttpUser):
    wait_time = between(2, 5)  # Users will wait between 2-5 seconds between tasks
    host = "https://centro-capital.herokuapp.com"

    @task
    def load_homepage(self):
        self.client.get("/")

    @task
    def load_about_page(self):
        self.client.get("/about")

    @task
    def load_allUnemploymentYearly(self):
        self.client.get("/centro-capital/allUnemploymentYearly")

    @task
    def load_welcome_page(self):
        self.client.get("/centro-capital")

    @task
    def load_insights_page(self):
        self.client.get("/insights")

    @task
    def load_compare_page(self):
        self.client.get("/compare")
