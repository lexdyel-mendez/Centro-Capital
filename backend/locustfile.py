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
    def load_feedback_page(self):
        self.client.get("/feedback")

    @task
    def load_unemployment_stats(self):
        self.client.get("/centro-capital/unemployment/stats")

    @task
    def load_employment_stats(self):
        self.client.get("/centro-capital/employment/stats")

    @task
    def load_laborforce_stats(self):
        self.client.get("/centro-capital/laborforce/stats")    

    @task
    def load_civpop_stats(self):
        self.client.get("/centro-capital/civpop/stats") 

    @task
    def load_unemploymentTotal_stats(self):
        self.client.get("/centro-capital/unemploymentTotal/stats")

    @task
    def load_unemploymentTotal(self):
        self.client.get("/centro-capital/unemploymentTotalYearly")

    @task
    def load_laborforceYearly(self):
        self.client.get("/centro-capital/laborforceYearly")

    @task
    def load_insights_page(self):
        self.client.get("/insights")

    @task
    def load_compare_page(self):
        self.client.get("/compare")
