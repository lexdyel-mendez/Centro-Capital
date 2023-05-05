import unittest
import unittest
import requests
import statistics
import time

# class MyTestCase(unittest.TestCase):
#     def test_something(self):
#         self.assertEqual(True, False)  # add assertion here
#


class TestHerokuPage(unittest.TestCase):
    def test_request_time(self):
        url = 'https://example.herokuapp.com/'
        elapsed_times = []
        num_requests = 10

        for i in range(num_requests):
            start_time = time.time()
            response = requests.get(url)
            end_time = time.time()
            elapsed_times.append(end_time - start_time)

        avg_time = statistics.mean(elapsed_times)
        max_time = 5.0 # set maximum acceptable request time

        self.assertLess(avg_time, max_time, f"Average request time ({avg_time}s) exceeded the maximum acceptable time ({max_time}s).")


if __name__ == '__main__':
    unittest.main()
