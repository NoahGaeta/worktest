"""
Program that calculates steering angle relative to piston length
Author: Noah Gaeta
"""

import math
from sys import argv

A = 5
B = math.sqrt(113)  # found manually using distance formula
INIT_THETA = math.atan(7 / 8)  # initial theta value at '0'


def main():
    x = float(argv[1])
    c = x + 5
    numerator = A**2 + B**2  - c**2 # (a^2 + b^2 - c^2)
    denominator = 2 * A * B  # 2ab
    theta = math.acos((numerator / denominator))  # find theta using law of cosines
    theta = INIT_THETA - theta  # subtract relative theta from initial theta
    print("Steering angle is: %f radians" % theta)
    return 0

if __name__ == '__main__':
    main()