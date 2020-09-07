"""
Program that calculates steering angle relative to piston length
Author: Noah Gaeta
"""

import math
from sys import argv

def main():
    x_dist = float(argv[1])
    theta = math.acos(3 / (5 + x_dist))
    print("Steering angle is: ", theta)
    return 0

if __name__ == '__main__':
    main()