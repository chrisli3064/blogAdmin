
#!/bin/python3

import fileinput
from typing import List, Tuple

#
# Complete the two functions below.
#
# add_trade() will accept each row of input as a list.
# run() will be called after adding all rows of input and should return an integer representing the total maximum profit.
#

class Solution:
    
    def __init__(self):
        self.pf= {}
    def add_trade(self, future_trade: List):
        # Write your code here
        print(future_trade)
        stock, date, price = future_trade
        price = float(price)
        datelist = date.split('/')
        date = datelist[2] + datelist[0] + datelist[1]
        if stock in self.pf: # if the stock is in the portfolio
            self.pf[stock].append((date,price))
        else:
            self.pf[stock] = [(date,price)]
        
    def run(self):
        values = list(self.pf.values())
        datePrice = []
        intervals = []
        for value in self.pf.values():
            value.sort(key = lambda x: int(x[0]))
            for i in range(len(value)-1):
                date1,price1 = value[i]
                date2,price2 = value[i+1]
                intervals.append((int(date1),int(date2),price2/price1))   
        intervals.sort(key = lambda x: x[1])
        n = len(intervals)
        dp = [0] * n
        prev_intervals = [[] for _ in range(n)]
        for i in range(n):
            dp[i] = intervals[i][2]
            prev_intervals[i].append(intervals[i])
            
            for j in range(i-1,-1,-1):
                if intervals[j][1] <= intervals[i][0]:
                    new_sum = dp[j] + intervals[i][2]
                    if new_sum > dp[i]:
                        dp[i] = new_sum
                        prev_intervals[i] = prev_intervals[j] + [intervals[i]]
                    break
            if i>0 and dp[i] < dp[i-1]:
                dp[i] = dp[i-1]
                prev_intervals[i] = prev_intervals[i-1]
        cash = 1000
        print(prev_intervals[-1])
        for interval in prev_intervals[-1]:
            cash*=interval[2] if interval[2] > 1 else 1
        return round(cash-1000)
        
    
if __name__ == '__main__':
    solution = Solution()
    for row in fileinput.input():
        future_trade = list(row.strip().replace(" ", "").split(","))
        solution.add_trade(future_trade)
        
    print(solution.run())